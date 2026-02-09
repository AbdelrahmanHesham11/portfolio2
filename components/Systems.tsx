'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import styles from './Systems.module.css';

const capabilities = [
  {
    role: 'External Consultant',
    scope: 'Architecture · Strategy · Implementation',
    focus: ['System design', 'Technical assessment', 'Team enablement']
  },
  {
    role: 'Full-Stack Engineer',
    scope: 'Frontend · Backend · Infrastructure',
    focus: ['End-to-end ownership', 'Production systems', 'Performance optimization']
  },
  {
    role: 'Data Engineer',
    scope: 'Pipelines · Analysis · Visualization',
    focus: ['ETL architecture', 'Data modeling', 'Analytics infrastructure']
  },
  {
    role: 'Instructor',
    scope: 'Technical Education · Mentorship',
    focus: ['Curriculum design', 'Knowledge transfer', 'Team development']
  }
];

export default function Systems() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRole, setActiveRole] = useState<number | null>(null);

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

    // Responsibility network visualization
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      role: number;

      constructor(x: number, y: number, role: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = 3;
        this.role = role;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D, active: boolean) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = active ? '#0A7E8C' : 'rgba(10, 126, 140, 0.4)';
        ctx.fill();
      }
    }

    const nodes: Node[] = [];
    const nodesPerRole = 8;
    
    for (let role = 0; role < capabilities.length; role++) {
      for (let i = 0; i < nodesPerRole; i++) {
        nodes.push(
          new Node(
            Math.random() * canvas.offsetWidth,
            Math.random() * canvas.offsetHeight,
            role
          )
        );
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(canvas.offsetWidth, canvas.offsetHeight);
        const isActive = activeRole === null || node.role === activeRole;
        node.draw(ctx, isActive);
      });

      // Draw connections within roles
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].role !== nodes[j].role) continue;
          if (activeRole !== null && nodes[i].role !== activeRole) continue;

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(10, 126, 140, ${0.3 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [activeRole]);

  return (
    <section id="systems" className={styles.systems}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.mono}>004</span>
            <span className={styles.divider}>/</span>
            <span>CAPABILITIES</span>
          </div>

          <h2 className={styles.title}>Professional scope</h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.roles}>
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className={`${styles.capability} ${activeRole === i ? styles.capabilityActive : ''}`}
                onHoverStart={() => setActiveRole(i)}
                onHoverEnd={() => setActiveRole(null)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className={styles.role}>{cap.role}</h3>
                <p className={styles.scope}>{cap.scope}</p>
                <div className={styles.focus}>
                  {cap.focus.map((item, j) => (
                    <span key={j} className={styles.focusItem}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.visualization}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.canvasLabel}>
              <span className={styles.mono}>Responsibility Network</span>
              <span className={styles.divider}>/</span>
              <span className={styles.count}>
                {activeRole === null ? 'All roles' : capabilities[activeRole].role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
