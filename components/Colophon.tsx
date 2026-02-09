'use client';

import { motion } from 'motion/react';
import styles from './Colophon.module.css';

export default function Colophon() {
  const techStack = [
    'Next.js 15',
    'TypeScript',
    'Motion.dev',
    'GSAP',
    'Canvas API'
  ];

  return (
    <footer id="colophon" className={styles.colophon}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.label}>
              <span className={styles.mono}>006</span>
              <span className={styles.divider}>/</span>
              <span>COLOPHON</span>
            </div>

            <h2 className={styles.title}>Let's build something exceptional</h2>

            <motion.a 
              href="mailto:hello@example.com"
              className={styles.email}
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              hello@example.com
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </motion.a>
          </div>

          <div className={styles.right}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Stack</h3>
              <ul className={styles.list}>
                {techStack.map((tech, i) => (
                  <motion.li
                    key={i}
                    className={styles.listItem}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Typography</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>Clash Display</li>
                <li className={styles.listItem}>Satoshi</li>
                <li className={styles.listItem}>JetBrains Mono</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Designed & developed with precision
          </p>
          <p className={styles.footerText}>
            <span className={styles.mono}>2024</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
