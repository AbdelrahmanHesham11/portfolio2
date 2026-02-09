'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Works.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: 'Neural Canvas',
    year: '2024',
    stack: 'Next.js, Three.js, GLSL',
    description: 'Real-time generative art platform enabling artists to create GPU-accelerated visual experiences through intuitive shader programming.',
    challenge: 'Achieving 60fps rendering on mobile devices while maintaining visual fidelity',
    solution: 'Implemented adaptive quality scaling and shader optimization techniques',
    color: '#FF6B6B'
  },
  {
    title: 'Motion Grammar',
    year: '2024',
    stack: 'React, Motion, GSAP',
    description: 'Component library and design system built around physics-based animation primitives, enabling consistent motion language across products.',
    challenge: 'Maintaining performance with complex spring physics at scale',
    solution: 'Custom animation scheduler with batched updates and GPU acceleration',
    color: '#4ECDC4'
  },
  {
    title: 'Temporal Grid',
    year: '2023',
    stack: 'WebGL, Canvas API, TypeScript',
    description: 'Interactive data visualization platform treating time as a navigable dimension, revealing patterns in high-frequency temporal data.',
    challenge: 'Smoothly rendering 10k+ dynamic data points',
    solution: 'WebGL instancing with spatial indexing for viewport culling',
    color: '#95E1D3'
  }
];

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scroll = scrollRef.current;
    const scrollWidth = scroll.scrollWidth;

    gsap.to(scroll, {
      x: -(scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="works" ref={containerRef} className={styles.works}>
      <div className={styles.label}>
        <span className={styles.mono}>002</span>
        <span className={styles.divider}>/</span>
        <span>SELECTED WORKS</span>
      </div>

      <div ref={scrollRef} className={styles.scrollContainer}>
        {projects.map((project, i) => (
          <motion.article 
            key={i} 
            className={styles.project}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.projectImage} style={{ borderColor: project.color }}>
              <div className={styles.imagePlaceholder} style={{ 
                background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)` 
              }}>
                <span className={styles.imageLabel} style={{ color: project.color }}>
                  {project.title}
                </span>
              </div>
            </div>

            <div className={styles.projectMeta}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.projectYear}>{project.year}</span>
              </div>

              <p className={styles.projectDesc}>{project.description}</p>

              <div className={styles.technical}>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>Stack</span>
                  <span className={styles.techValue}>{project.stack}</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>Challenge</span>
                  <span className={styles.techValue}>{project.challenge}</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>Solution</span>
                  <span className={styles.techValue}>{project.solution}</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
