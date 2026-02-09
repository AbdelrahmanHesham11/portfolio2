'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MotionStudies.module.css';

export default function MotionStudies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const text = 'MOTION';
    const fontSize = Math.min(canvas.offsetWidth * 0.25, 200);
    ctx.font = `700 ${fontSize}px 'Clash Display', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let mouseX = canvas.offsetWidth / 2;
    let mouseY = canvas.offsetHeight / 2;
    let currentVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      const now = Date.now();
      const dt = now - lastTime.current;

      if (dt > 0) {
        const dx = newX - lastPos.current.x;
        const dy = newY - lastPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        currentVelocity = distance / dt;
        setVelocity(Math.min(currentVelocity * 100, 100));
      }

      mouseX = newX;
      mouseY = newY;
      lastPos.current = { x: newX, y: newY };
      lastTime.current = now;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;

      // Calculate distortion based on mouse position and velocity
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const distortion = (distance / maxDistance) * currentVelocity * 50;

      ctx.save();
      
      // Apply transforms
      ctx.translate(centerX, centerY);
      ctx.rotate((dx / centerX) * 0.1);
      ctx.scale(1 + distortion * 0.01, 1 - distortion * 0.005);
      
      // Draw text with gradient
      const gradient = ctx.createLinearGradient(-200, -100, 200, 100);
      gradient.addColorStop(0, '#0A0A0A');
      gradient.addColorStop(0.5, '#0A7E8C');
      gradient.addColorStop(1, '#0A0A0A');
      
      ctx.fillStyle = gradient;
      ctx.fillText(text, 0, 0);
      
      // Draw outline
      ctx.strokeStyle = '#0A7E8C';
      ctx.lineWidth = 2;
      ctx.strokeText(text, 0, 0);

      ctx.restore();

      // Decay velocity
      currentVelocity *= 0.95;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.motionStudies}>
      <div className={styles.container}>
        <div className={styles.label}>
          <span className={styles.mono}>004</span>
          <span className={styles.divider}>/</span>
          <span>MOTION STUDIES</span>
        </div>

        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Velocity</span>
              <span className={styles.statValue}>{velocity.toFixed(1)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Interactive</span>
              <span className={styles.statValue}>Live</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>
          Typography responds to cursor velocity and position.<br />
          Real-time distortion with physics-based decay.
        </p>
      </div>
    </section>
  );
}
