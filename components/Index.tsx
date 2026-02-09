'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import styles from './Index.module.css';

export default function Index() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!nameRef.current) return;

    const chars = nameRef.current.querySelectorAll('.char');
    
    gsap.fromTo(
      chars,
      { 
        opacity: 0, 
        y: 100,
        rotateX: -90 
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.3
      }
    );
  }, []);

  const name = 'ABDO';
  
  return (
    <section id="index" className={styles.index}>
      <div className={styles.container}>
        <motion.div 
          className={styles.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className={styles.mono}>001</span>
          <span className={styles.divider}>/</span>
          <span>INDEX</span>
        </motion.div>

        <h1 ref={nameRef} className={styles.name}>
          {name.split('').map((char, i) => (
            <span key={i} className="char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <motion.div 
          className={styles.statement}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className={styles.title}>Full-stack software engineer</p>
          <p className={styles.subtitle}>Building systems that feel deliberate</p>
        </motion.div>

        <motion.div 
          className={styles.scroll}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5
          }}
        >
          <span className={styles.scrollText}>Scroll to explore</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path d="M6 0L6 18M6 18L1 13M6 18L11 13" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
