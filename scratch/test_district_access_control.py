import sys
import os
import unittest
import json

# Add workspace to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app import create_app
from backend.database import get_db, init_db
from backend.models import User, ConsumerComplaint, utcnow_iso

class TestDistrictAccessControl(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.client = cls.app.test_client()
        with cls.app.app_context():
            init_db()
            cls.setup_test_data()

    @classmethod
    def setup_test_data(cls):
        with get_db() as db:
            # Clean up test users and complaints
            db.query(ConsumerComplaint).filter(ConsumerComplaint.id.like("test-comp-%")).delete()
            db.query(User).filter(User.id.like("test-user-%")).delete()
            db.commit()

            # Create test officers
            # 1. Dhaka Intake Officer
            cls.dhaka_intake = User(
                id="test-user-dhk-intake",
                nidNumber="9900000001",
                fullName="Dhaka Intake Officer",
                email="dhk.intake@test.com",
                phone="+8801700000001",
                role="CONSUMER_RIGHTS",
                badgeNumber="TEST-DHK-INT",
                designation="Complaint Intake Officer",
                department="DNCRP Dhaka",
                stationOrThana="Dhaka HQ",
                assignedDistrict="Dhaka",
                passwordHash="test"
            )
            # 2. Dhaka Investigation Officer
            cls.dhaka_investigator = User(
                id="test-user-dhk-inv",
                nidNumber="9900000002",
                fullName="Dhaka Investigation Officer",
                email="dhk.inv@test.com",
                phone="+8801700000002",
                role="CONSUMER_RIGHTS",
                badgeNumber="TEST-DHK-INV",
                designation="Investigation Officer",
                department="DNCRP Dhaka",
                stationOrThana="Dhaka HQ",
                assignedDistrict="Dhaka",
                passwordHash="test"
            )
            # 3. Dhaka Adjudication Officer
            cls.dhaka_adjudicator = User(
                id="test-user-dhk-adj",
                nidNumber="9900000003",
                fullName="Dhaka Adjudication Officer",
                email="dhk.adj@test.com",
                phone="+8801700000003",
                role="CONSUMER_RIGHTS",
                badgeNumber="TEST-DHK-ADJ",
                designation="Adjudication Officer",
                department="DNCRP Dhaka",
                stationOrThana="Dhaka HQ",
                assignedDistrict="Dhaka",
                passwordHash="test"
            )

            # 4. Chattogram Intake Officer
            cls.ctg_intake = User(
                id="test-user-ctg-intake",
                nidNumber="9900000004",
                fullName="Chattogram Intake Officer",
                email="ctg.intake@test.com",
                phone="+8801700000004",
                role="CONSUMER_RIGHTS",
                badgeNumber="TEST-CTG-INT",
                designation="Complaint Intake Officer",
                department="DNCRP Chattogram",
                stationOrThana="Chattogram HQ",
                assignedDistrict="Chattogram",
                passwordHash="test"
            )
            # 5. Chattogram Investigation Officer
            cls.ctg_investigator = User(
                id="test-user-ctg-inv",
                nidNumber="9900000005",
                fullName="Chattogram Investigation Officer",
                email="ctg.inv@test.com",
                phone="+8801700000005",
                role="CONSUMER_RIGHTS",
                badgeNumber="TEST-CTG-INV",
                designation="Investigation Officer",
                department="DNCRP Chattogram",
                stationOrThana="Chattogram HQ",
                assignedDistrict="Chattogram",
                passwordHash="test"
            )

            db.add_all([
                cls.dhaka_intake, cls.dhaka_investigator, cls.dhaka_adjudicator,
                cls.ctg_intake, cls.ctg_investigator
            ])

            # Create test complaints
            # Dhaka complaint
            cls.dhk_comp = ConsumerComplaint(
                id="test-comp-dhk-01",
                trackingNumber="DNCRP-DHK-TEST-01",
                complainantId="test-user-cit",
                complainantName="Test Citizen",
                complainantPhone="+8801700000999",
                shopName="Dhaka Test Shop",
                shopAddress="Gulshan, Dhaka",
                shopDistrict="Dhaka",
                shopThana="Gulshan",
                productName="Test Product Dhaka",
                issueType="PRICE_GOUGING",
                description="Overcharging in Dhaka",
                submittedAt=utcnow_iso(),
                status="SUBMITTED",
                workflowQueue="INTAKE"
            )
            # Chattogram complaint
            cls.ctg_comp = ConsumerComplaint(
                id="test-comp-ctg-01",
                trackingNumber="DNCRP-CTG-TEST-01",
                complainantId="test-user-cit",
                complainantName="Test Citizen",
                complainantPhone="+8801700000999",
                shopName="Chattogram Test Shop",
                shopAddress="Kotwali, Chattogram",
                shopDistrict="Chattogram",
                shopThana="Kotwali",
                productName="Test Product CTG",
                issueType="EXPIRED_GOODS",
                description="Expired goods in Chattogram",
                submittedAt=utcnow_iso(),
                status="SUBMITTED",
                workflowQueue="INTAKE"
            )

            db.add_all([cls.dhk_comp, cls.ctg_comp])
            db.commit()

    def get_token(self, user):
        from backend.middleware.auth import generate_token
        return generate_token(user)

    def test_1_intake_officer_district_view_restriction(self):
        """Intake officers can only view complaints from their own district."""
        token = self.get_token(self.dhaka_intake)
        res = self.client.get(
            "/api/consumer/complaints",
            headers={"Authorization": f"Bearer {token}"}
        )
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        complaints = data.get("complaints", [])

        # Dhaka intake officer MUST see Dhaka complaint and MUST NOT see Chattogram complaint
        tracking_numbers = [c["trackingNumber"] for c in complaints]
        self.assertIn("DNCRP-DHK-TEST-01", tracking_numbers)
        self.assertNotIn("DNCRP-CTG-TEST-01", tracking_numbers)

        # Test Chattogram Intake Officer
        ctg_token = self.get_token(self.ctg_intake)
        res_ctg = self.client.get(
            "/api/consumer/complaints",
            headers={"Authorization": f"Bearer {ctg_token}"}
        )
        self.assertEqual(res_ctg.status_code, 200)
        data_ctg = res_ctg.get_json()
        complaints_ctg = data_ctg.get("complaints", [])
        ctg_tracking_numbers = [c["trackingNumber"] for c in complaints_ctg]
        self.assertIn("DNCRP-CTG-TEST-01", ctg_tracking_numbers)
        self.assertNotIn("DNCRP-DHK-TEST-01", ctg_tracking_numbers)

    def test_2_officer_list_district_filter(self):
        """Officers endpoint returns ONLY officers of the same district."""
        token = self.get_token(self.dhaka_intake)
        res = self.client.get(
            "/api/consumer/officers",
            headers={"Authorization": f"Bearer {token}"}
        )
        self.assertEqual(res.status_code, 200)
        officers = res.get_json().get("officers", [])
        officer_ids = [o["id"] for o in officers]
        
        # Dhaka Intake Officer should see Dhaka Investigation & Adjudication officers
        self.assertIn("test-user-dhk-inv", officer_ids)
        self.assertIn("test-user-dhk-adj", officer_ids)
        # Should NOT see Chattogram officers
        self.assertNotIn("test-user-ctg-inv", officer_ids)
        self.assertNotIn("test-user-ctg-intake", officer_ids)

    def test_3_intake_officer_same_district_handover(self):
        """Intake officers can hand over complaints ONLY to Investigation Officers of the SAME district."""
        token = self.get_token(self.dhaka_intake)
        
        # 1. Attempt to hand over Dhaka complaint to Chattogram Investigation Officer -> MUST FAIL 403
        bad_handover_res = self.client.post(
            "/api/consumer/complaints/test-comp-dhk-01/status",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "status": "UNDER_REVIEW",
                "handoffOfficerId": "test-user-ctg-inv",
                "note": "Cross-district handover attempt"
            }
        )
        self.assertEqual(bad_handover_res.status_code, 403)
        self.assertIn("assigned district", bad_handover_res.get_json().get("error", "").lower())

        # 2. Hand over Dhaka complaint to Dhaka Investigation Officer -> MUST SUCCEED 200
        good_handover_res = self.client.post(
            "/api/consumer/complaints/test-comp-dhk-01/status",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "status": "UNDER_REVIEW",
                "handoffOfficerId": "test-user-dhk-inv",
                "note": "Handing over to Dhaka Investigator"
            }
        )
        self.assertEqual(good_handover_res.status_code, 200)
        self.assertTrue(good_handover_res.get_json().get("success"))

    def test_4_investigation_officer_same_district_handover(self):
        """Investigation Officers can hand over complaints ONLY to Adjudication Officers of the SAME district."""
        inv_token = self.get_token(self.dhaka_investigator)

        # 1. Set complaint status to INVESTIGATION first
        with get_db() as db:
            c = db.query(ConsumerComplaint).filter(ConsumerComplaint.id == "test-comp-dhk-01").first()
            c.status = "INVESTIGATION"
            c.workflowQueue = "INVESTIGATION"
            c.assignedOfficerId = "test-user-dhk-inv"
            db.commit()

        # 2. Attempt handover to a non-existent or cross-district officer -> MUST FAIL 403/400
        bad_handover = self.client.post(
            "/api/consumer/complaints/test-comp-dhk-01/status",
            headers={"Authorization": f"Bearer {inv_token}"},
            json={
                "status": "INVESTIGATION_SUMMARY",
                "inspectorNotes": "Investigation report complete.",
                "handoffOfficerId": "test-user-ctg-inv", # Wrong role & wrong district
            }
        )
        self.assertIn(bad_handover.status_code, (400, 403))

        # 3. Hand over to Dhaka Adjudication Officer -> MUST SUCCEED 200
        good_handover = self.client.post(
            "/api/consumer/complaints/test-comp-dhk-01/status",
            headers={"Authorization": f"Bearer {inv_token}"},
            json={
                "status": "INVESTIGATION_SUMMARY",
                "inspectorNotes": "Investigation report complete.",
                "handoffOfficerId": "test-user-dhk-adj"
            }
        )
        self.assertEqual(good_handover.status_code, 200)
        self.assertTrue(good_handover.get_json().get("success"))

    def test_5_unauthorized_district_access_blocked(self):
        """Officers cannot access or modify complaints outside their authorized district."""
        ctg_token = self.get_token(self.ctg_intake)

        # 1. Chattogram Intake Officer trying to view Dhaka complaint directly -> 403
        get_res = self.client.get(
            "/api/consumer/complaints/test-comp-dhk-01",
            headers={"Authorization": f"Bearer {ctg_token}"}
        )
        self.assertEqual(get_res.status_code, 403)
        self.assertIn("outside your authorized district", get_res.get_json().get("error", "").lower())

        # 2. Chattogram Officer trying to claim Dhaka complaint -> 403
        claim_res = self.client.post(
            "/api/consumer/complaints/test-comp-dhk-01/claim",
            headers={"Authorization": f"Bearer {ctg_token}"}
        )
        self.assertEqual(claim_res.status_code, 403)

        # 3. Chattogram Officer trying to modify Dhaka complaint status -> 403
        status_res = self.client.post(
            "/api/consumer/complaints/test-comp-dhk-01/status",
            headers={"Authorization": f"Bearer {ctg_token}"},
            json={"status": "REJECTED"}
        )
        self.assertEqual(status_res.status_code, 403)

        # 4. Chattogram Officer trying to access case messages for Dhaka complaint -> 403
        msg_res = self.client.get(
            "/api/cases/DNCRP-DHK-TEST-01/messages",
            headers={"Authorization": f"Bearer {ctg_token}"}
        )
        self.assertEqual(msg_res.status_code, 403)

if __name__ == "__main__":
    unittest.main()
