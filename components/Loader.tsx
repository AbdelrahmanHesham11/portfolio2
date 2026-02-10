'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Loader.module.css';

export default function Loader({ onFinish }: { onFinish?: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 111;
    const duration = 0.80; 
    const intervalTime = (duration * 1000) / end;

    const interval = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(interval);
        if (onFinish) onFinish();
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.loaderOverlay}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className={styles.loaderText}
          initial={{ scale: 0.5 }}
          animate={{ scale: 0.5  }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
