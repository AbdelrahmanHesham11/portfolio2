'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Works.module.css';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: 'Finsight AI',
    year: '2025',
    link: 'https://finsight-ai-rho.vercel.app/',
    stack: 'Next.js, OpenRouter AI, Prisma, Clerk',
    description: 'AI-powered personal finance assistant designed to help users track spending, optimize budgets, and receive intelligent savings recommendations based on historical behavior.',
    challenge: 'Balancing response quality while minimizing token usage across frequent, data-driven AI interactions.',
    solution: 'Implemented contextual prompt compression, request batching, and caching strategies to reduce costs without sacrificing accuracy.',
    color: '#2c336b',
    image: '/project1.png'
  },
  {
    title: 'YourAIFriend',
    year: '2025',
    link: 'https://your-ai-friend-two.vercel.app/',
    stack: 'Next.js, VAPI, Prisma, Clerk',
    description: 'Conversational AI platform that enables users to speak with a humanoid assistant in a private, secure environment for emotional expression, reflection, and guided support.',
    challenge: 'Designing natural, human-like conversational flow while maintaining low latency in real-time voice interactions.',
    solution: 'Fine-tuned conversational pacing and response timing while introducing adaptive context windows to maintain dialogue continuity.',
    color: '#f1dbd9',
    image: '/project2.png'
  },
  {
    title: 'Elaf Tendering',
    year: '2024',
    link: 'https://www.elaaaf.com/en',
    stack: 'NextJS, FastAPI, PostgreSQL, Supabase',
    description: 'B2B/B2G tendering platform built for the Omani market, enabling organizations to publish, discover, and manage government and enterprise tenders through a secure, high-availability web interface.',
    challenge: 'Maintaining fast load times during peak traffic periods with large volumes of concurrent users and data-heavy queries.',
    solution: 'Optimized database indexing, introduced API-level caching, and implemented incremental scaling for high-load performance.',
    color: '#95E1D3',
    image: '/project3.png'
  }
];
export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scroll = scrollRef.current;

    const ctx = gsap.context(() => {
      // Logic for calculating horizontal scroll distance
      const getScrollAmount = () => {
        const scrollWidth = scroll.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Scroll enough to see the last item fully, plus a little margin
        return -(scrollWidth - viewportWidth + (viewportWidth * 0.05));
      };

      gsap.to(scroll, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scroll.scrollWidth}`, // Scroll duration based on content width
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate on resize
        }
      });
    }, containerRef);

    return () => ctx.revert();
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* --- UPDATED LINK WRAPPER HERE --- */}
            {/* This matches the new CSS class .projectLinkWrapper */}
            <Link href={project.link} target="_blank" className={styles.projectLinkWrapper}>
              <div className={styles.projectImage} style={{ borderColor: project.color }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.projectImg}
                  sizes="(max-width: 768px) 90vw, 50vw"
                  priority={i === 0}
                />
                <div className={styles.imageOverlay}>
                  <span>VIEW PROJECT ↗</span>
                </div>
              </div>
            </Link>
            {/* ---------------------------------- */}

            <div className={styles.projectMeta}>
              <div className={styles.projectHeader}>
                <Link href={project.link} target="_blank" className={styles.titleLink}>
                  <h3 className={styles.projectTitle}>
                    {project.title} <span className={styles.arrow}>↗</span>
                  </h3>
                </Link>
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
