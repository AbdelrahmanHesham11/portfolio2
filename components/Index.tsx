'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import styles from './Index.module.css';

export default function Index() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const name = 'ABDO HESHAM';

  const slides = [
    {
      title: 'Full-stack software engineer',
      subtitle: 'Building systems that feel deliberate'
    },
    {
      title: 'Scalable systems architect',
      subtitle: 'From idea to production, used by thousands'
    },
    {
      title: 'Remote-first engineer',
      subtitle: 'Shipping with international teams across time zones'
    },
    {
      title: 'AI & automation builder',
      subtitle: 'Turning workflows into leverage with modern AI'
    },
    {
      title: 'Performance-focused developer',
      subtitle: 'Faster APIs, lower costs, better UX'
    },
    {
      title: 'Engineering mentor & instructor',
      subtitle: 'Teaching engineers how real systems work'
    }
  ];

  // Name animation
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

  // Carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="index" className={styles.index}>
      <div className={styles.container}>

        {/* Section label */}
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

        {/* Name */}
        <h1 ref={nameRef} className={styles.name}>
          {name.split('').map((char, i) => (
            <span
              key={i}
              className="char"
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>


        <div className={styles.statement}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className={styles.title}>
                {slides[activeIndex].title}
              </p>
              <p className={styles.subtitle}>
                {slides[activeIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

 
        <motion.div
          className={styles.scroll}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.6
          }}
        >
          <span className={styles.scrollText}>Scroll to explore</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path
              d="M6 0L6 18M6 18L1 13M6 18L11 13"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
