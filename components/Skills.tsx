'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Skills.module.css';

const skillCategories = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Vite','Tailwind CSS', 'Shadcn UI', 'Framer Motion'],
    tags: ['fullstack', 'web']
  },
  {
    category: 'Backend',
    skills: ['Node.js','NestJS','GraphQL','WebSockets','Serverless Architecture','Express', 'FastAPI', 'Django', 'Python', 'PHP'],
    tags: ['fullstack', 'web', 'data']
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase','Prisma ORM','Neon','SQL Optimization','Database Design'],
    tags: ['fullstack', 'web', 'data']
  },
  {
    category: 'AI, Automation & Data',
    skills: ['ChatGPT API','OpenRouter API','VAPI Voice AI','AI-assisted Development','Apache Airflow','ETL Pipelines','Web Scraping','Node-RED','n8n'],
    tags: ['ai', 'data']
  },
  {
    category: 'Cloud / DevOps',
    skills: ['Docker','CI/CD','CDN Configuration','AWS', 'Kubernetes', 'Google Cloud'],
    tags: ['fullstack', 'web', 'data']
  },
  {
    category: 'Security & Best Practices',
    skills: ['Authentication (JWT, OAuth)','Encryption','Secure Coding','OWASP Standards','Data Privacy'],
    tags: ['fullstack', 'web']
  },
  {
    category: 'Tooling & Platforms',
    skills: ['Figma', 'Sketch', 'Webflow', 'WordPress', 'VS Code'],
    tags: ['web']
  }
];

const presets = [
  { label: 'All', filter: null },
  { label: 'Full-Stack Web', filter: 'fullstack' },
  { label: 'Data Engineering', filter: 'data' },
  { label: 'AI Integration', filter: 'ai' }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredCategories = activeFilter 
    ? skillCategories.filter(cat => cat.tags.includes(activeFilter))
    : skillCategories;

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.mono}>003</span>
            <span className={styles.divider}>/</span>
            <span>SKILLS</span>
          </div>

          <div className={styles.titleRow}>
            <h2 className={styles.title}>Technical capabilities</h2>
            
            <div className={styles.presets}>
              {presets.map((preset, i) => (
                <button
                  key={i}
                  className={`${styles.preset} ${activeFilter === preset.filter ? styles.presetActive : ''}`}
                  onClick={() => setActiveFilter(preset.filter)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter || 'all'}
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {filteredCategories.map((cat, i) => (
              <div
                key={cat.category}
                className={`${styles.category} ${activeCategory === i ? styles.categoryActive : ''}`}
                onMouseEnter={() => setActiveCategory(i)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <h3 className={styles.categoryName}>{cat.category}</h3>
                
                <div className={styles.skillList}>
                  {cat.skills.map((skill, j) => (
                    <span
                      key={skill}
                      className={styles.skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}