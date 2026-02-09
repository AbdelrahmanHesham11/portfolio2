'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './Skills.module.css';

const skillCategories = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Vite']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'Django', 'Python', 'PHP', 'GraphQL']
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase']
  },
  {
    category: 'Cloud / DevOps',
    skills: ['Docker', 'Kubernetes', 'Google Cloud', 'TensorFlow']
  },
  {
    category: 'Tooling & Platforms',
    skills: ['Figma', 'Sketch', 'Webflow', 'WordPress', 'VS Code']
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.mono}>003</span>
            <span className={styles.divider}>/</span>
            <span>SKILLS</span>
          </div>

          <h2 className={styles.title}>Technical capabilities</h2>
        </div>

        <div className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              className={`${styles.category} ${activeCategory === i ? styles.categoryActive : ''}`}
              onHoverStart={() => setActiveCategory(i)}
              onHoverEnd={() => setActiveCategory(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.categoryName}>{cat.category}</h3>
              
              <div className={styles.skillList}>
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    className={styles.skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 + j * 0.04 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
