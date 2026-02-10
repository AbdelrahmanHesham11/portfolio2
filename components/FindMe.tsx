'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import styles from './FindMe.module.css';

const contacts = [
  {
    label: 'Email',
    value: 'abdelrahman.heshamfathala@gmail.com',
    href: 'mailto:abdelrahman.heshamfathala@gmail.com',
    display: 'abdelrahman.heshamfathala'
  },
  {
    label: 'GitHub',
    value: 'https://github.com/AbdelrahmanHesham11/',
    href: 'https://github.com/AbdelrahmanHesham11/',
    display: 'AbdelrahmanHesham11'
  },
  {
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/abdelrahman-hesham-71bab2282/',
    href: 'https://www.linkedin.com/in/abdelrahman-hesham-71bab2282/',
    display: 'abdelrahman-hesham'
  },
  {
    label: 'CV',
    value: 'Download PDF',
    href: '/cv.pdf',
    display: 'View My CV',
    isCV: true
  }
];

export default function FindMe() {
  const router = useRouter();

  const handleCVClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/cv');
  };

  return (
    <section id="findme" className={styles.findme}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.mono}>006</span>
            <span className={styles.divider}>/</span>
            <span>FIND ME</span>
          </div>

          <h2 className={styles.title}>Let's connect</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.grid}>
            {contacts.map((contact, i) => (
              <motion.div
                key={i}
                className={styles.item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.itemHeader}>
                  <span className={styles.itemLabel}>{contact.label}</span>
                  <span className={styles.itemIndex}>0{i + 1}</span>
                </div>
                {contact.isCV ? (
                  <button
                    onClick={handleCVClick}
                    className={styles.itemValue}
                  >
                    {contact.display}
                    <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <a
                    href={contact.href}
                    className={styles.itemValue}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.display}
                    <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <div className={styles.decoration}>
            <div className={styles.line}></div>
            <div className={styles.availability}>
              <span className={styles.availabilityDot}></span>
              <span className={styles.availabilityText}>Available for projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}