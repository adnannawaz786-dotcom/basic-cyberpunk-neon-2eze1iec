import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

const GlowingGrid = ({ className, gridSize = 50, glowColor = 'cyan', animationSpeed = 2000, ...props }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const getGlowColor = (intensity) => {
      switch (glowColor) {
        case 'cyan':
          return `rgba(0, 255, 255, ${intensity})`;
        case 'pink':
          return `rgba(255, 0, 255, ${intensity})`;
        case 'green':
          return `rgba(0, 255, 0, ${intensity})`;
        case 'purple':
          return `rgba(147, 51, 234, ${intensity})`;
        default:
          return `rgba(0, 255, 255, ${intensity})`;
      }
    };

    const drawGrid = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Calculate grid lines
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        const wave = Math.sin(time * 0.001 + i * 0.1) * 0.3 + 0.1;
        const intensity = Math.max(0.1, wave);

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = getGlowColor(intensity);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add glow effect for some lines
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.strokeStyle = getGlowColor(intensity * 0.5);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      // Draw horizontal lines
      for (let i = 0; i <= rows; i++) {
        const y = i * gridSize;
        const wave = Math.sin(time * 0.001 + i * 0.1) * 0.3 + 0.1;
        const intensity = Math.max(0.1, wave);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = getGlowColor(intensity);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add glow effect for some lines
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = getGlowColor(intensity * 0.5);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      // Add intersection points with pulsing effect
      for (let i = 0; i <= cols; i += 3) {
        for (let j = 0; j <= rows; j += 3) {
          const x = i * gridSize;
          const y = j * gridSize;
          const pulse = Math.sin(time * 0.002 + (i + j) * 0.2) * 0.5 + 0.5;
          const radius = 2 + pulse * 2;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = getGlowColor(0.8);
          ctx.fill();

          // Outer glow
          ctx.beginPath();
          ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = getGlowColor(0.2 * pulse);
          ctx.fill();
        }
      }
    };

    const animate = (currentTime) => {
      time = currentTime;
      drawGrid();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [gridSize, glowColor, animationSpeed]);

  return (
    <div 
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{
          filter: 'blur(0.5px)',
          background: 'transparent'
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 70%)`
        }}
      />
    </div>
  );
};

export default GlowingGrid;