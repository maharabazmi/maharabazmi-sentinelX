import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorDark: string;
  colorLight: string;
  glowDark: string;
  glowLight: string;
  baseAlpha: number;
}

export const CyberCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Color pairs for Dark and Light mode
    const colorThemes = [
      {
        dark: '#02baff',
        light: '#0284c7',
        glowDark: 'rgba(2, 186, 255, 0.6)',
        glowLight: 'rgba(2, 132, 199, 0.3)',
      },
      {
        dark: '#0147bf',
        light: '#1d4ed8',
        glowDark: 'rgba(1, 71, 191, 0.5)',
        glowLight: 'rgba(29, 78, 216, 0.3)',
      },
      {
        dark: '#10b981',
        light: '#059669',
        glowDark: 'rgba(16, 185, 129, 0.5)',
        glowLight: 'rgba(5, 150, 105, 0.3)',
      },
      {
        dark: '#38bdf8',
        light: '#0369a1',
        glowDark: 'rgba(56, 189, 248, 0.4)',
        glowLight: 'rgba(3, 105, 161, 0.3)',
      },
    ];

    let particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 18000), 55);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1.2,
          colorDark: theme.dark,
          colorLight: theme.light,
          glowDark: theme.glowDark,
          glowLight: theme.glowLight,
          baseAlpha: Math.random() * 0.4 + 0.35,
        });
      }
    };

    initParticles();

    // Radar beam angle
    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light');

      // 1. Radar Sweep from top-right
      radarAngle += 0.007;
      const radarCenterX = width * 0.72;
      const radarCenterY = height * 0.35;
      const radarRadius = Math.min(width, height) * 0.6;

      ctx.save();
      const radarGrad = ctx.createConicGradient(radarAngle, radarCenterX, radarCenterY);
      if (isLight) {
        radarGrad.addColorStop(0, 'rgba(1, 71, 191, 0.04)');
        radarGrad.addColorStop(0.12, 'rgba(2, 132, 199, 0.02)');
      } else {
        radarGrad.addColorStop(0, 'rgba(2, 186, 255, 0.07)');
        radarGrad.addColorStop(0.12, 'rgba(1, 71, 191, 0.03)');
      }
      radarGrad.addColorStop(0.3, 'transparent');
      radarGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = radarGrad;
      ctx.beginPath();
      ctx.arc(radarCenterX, radarCenterY, radarRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Connect nearby particles
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            const alpha = factor * (isLight ? 0.22 : 0.16);
            ctx.strokeStyle = isLight
              ? `rgba(1, 71, 191, ${alpha})`
              : `rgba(2, 186, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Connect mouse to closest particles
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const factor = 1 - dist / mouse.radius;
            const alpha = factor * (isLight ? 0.45 : 0.35);
            ctx.strokeStyle = isLight
              ? `rgba(1, 71, 191, ${alpha})`
              : `rgba(2, 186, 255, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.stroke();

            particles[i].x += dx * 0.006;
            particles[i].y += dy * 0.006;
          }
        }
      }

      // 4. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.shadowColor = isLight ? p.glowLight : p.glowDark;
        ctx.shadowBlur = isLight ? 4 : 8;
        ctx.fillStyle = isLight ? p.colorLight : p.colorDark;
        ctx.globalAlpha = isLight ? Math.min(p.baseAlpha + 0.2, 0.85) : p.baseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
    />
  );
};
