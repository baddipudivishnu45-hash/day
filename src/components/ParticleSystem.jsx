import React, { useEffect, useRef } from 'react';

export default function ParticleSystem({ type = 'all', count = 15 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];

    // Warm paper dust / rose-gold tones
    const colors = [
      'rgba(197, 155, 151, ', // rose accent
      'rgba(189, 160, 84, ',  // antique gold
      'rgba(44, 40, 37, ',    // ink
    ];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 3 + 1.5;
        this.speedY = -(Math.random() * 0.35 + 0.1);
        this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.15;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.colorIdx = Math.floor(Math.random() * colors.length);
        this.shape = 'circle';
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        this.speedX += (Math.random() - 0.5) * 0.015;
        this.speedX = Math.max(-0.5, Math.min(0.5, this.speedX));

        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[this.colorIdx] + this.opacity + ')';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(count, Math.floor((canvas.width * canvas.height) / 40000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [type, count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
