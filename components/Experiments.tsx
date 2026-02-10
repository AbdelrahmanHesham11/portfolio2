'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import styles from './Experiments.module.css';

export default function Experiments() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [velocity, setVelocity] = useState(0);
  const [iterations, setIterations] = useState(0);
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

    const text = 'EXPLORE';
    const fontSize = Math.min(canvas.offsetWidth * 0.2, 180);
    ctx.font = `700 ${fontSize}px 'Clash Display', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let mouseX = canvas.offsetWidth / 2;
    let mouseY = canvas.offsetHeight / 2;
    let currentVelocity = 0;
    let frameCount = 0;

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
      frameCount++;
      setIterations(frameCount);

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;

      // Calculate distortion
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const distortion = (distance / maxDistance) * currentVelocity * 40;

      ctx.save();
      
      ctx.translate(centerX, centerY);
      ctx.rotate((dx / centerX) * 0.08);
      ctx.scale(1 + distortion * 0.008, 1 - distortion * 0.004);
      
      // Gradient based on interaction
      const gradient = ctx.createLinearGradient(-200, -100, 200, 100);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      if (isDark) {
        gradient.addColorStop(0, '#FAFAF8');
        gradient.addColorStop(0.5, '#0A7E8C');
        gradient.addColorStop(1, '#FAFAF8');
      } else {
        gradient.addColorStop(0, '#0A0A0A');
        gradient.addColorStop(0.5, '#0A7E8C');
        gradient.addColorStop(1, '#0A0A0A');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillText(text, 0, 0);
      
      ctx.strokeStyle = '#0A7E8C';
      ctx.lineWidth = 1.5;
      ctx.strokeText(text, 0, 0);

      ctx.restore();

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
    <section id="experiments" className={styles.experiments}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.mono}>005</span>
            <span className={styles.divider}>/</span>
            <span>EXPERIMENTS</span>
          </div>

          <h2 className={styles.title}>Curiosity in motion</h2>
          <p className={styles.description}>
            Experimented with interactive typography and real-time physics to test responsiveness, cursor-based animation, and performance under high frame-rate conditions.
          </p>
        </div>

        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.canvas} />
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Velocity</span>
              <span className={styles.statValue}>{velocity.toFixed(1)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Frames</span>
              <span className={styles.statValue}>{iterations}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Status</span>
              <span className={styles.statValue}>Live</span>
            </div>
          </div>

          <div className={styles.notes}>
            <p className={styles.note}>
              <span className={styles.noteLabel}>Principle:</span> Typography responds to cursor behavior
            </p>
            <p className={styles.note}>
              <span className={styles.noteLabel}>Method:</span> Real-time canvas distortion with physics decay
            </p>
            <p className={styles.note}>
              <span className={styles.noteLabel}>Purpose:</span> Exploring motion as interactive feedback
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

