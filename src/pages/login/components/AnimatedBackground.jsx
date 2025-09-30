import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
      
      for (let i = 0; i < particleCount; i++) {
        particles?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 200 // Blue to purple range
        });
      }
      return particles;
    };

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      // Create gradient background
      const gradient = ctx?.createLinearGradient(0, 0, canvas?.width, canvas?.height);
      gradient?.addColorStop(0, 'rgba(59, 130, 246, 0.05)'); // blue-500/5
      gradient?.addColorStop(0.5, 'rgba(147, 51, 234, 0.03)'); // violet-600/3
      gradient?.addColorStop(1, 'rgba(245, 158, 11, 0.02)'); // amber-500/2
      
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
      
      // Animate particles
      particlesRef?.current?.forEach((particle, index) => {
        // Update position
        particle.x += particle?.speedX;
        particle.y += particle?.speedY;
        
        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;
        
        // Draw particle
        ctx?.save();
        ctx.globalAlpha = particle?.opacity;
        ctx.fillStyle = `hsl(${particle?.hue}, 70%, 60%)`;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();
        
        // Draw connections to nearby particles
        particlesRef?.current?.slice(index + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx?.save();
            ctx.globalAlpha = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = `hsl(${(particle?.hue + otherParticle?.hue) / 2}, 70%, 60%)`;
            ctx.lineWidth = 1;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx?.stroke();
            ctx?.restore();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      particlesRef.current = createParticles();
      animate();
    };

    init();
    window.addEventListener('resize', () => {
      resizeCanvas();
      particlesRef.current = createParticles();
    });

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default AnimatedBackground;