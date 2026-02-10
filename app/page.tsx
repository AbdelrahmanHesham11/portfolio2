'use client';

import { useState, useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';
import Index from '@/components/Index';
import Works from '@/components/Works';
import Skills from '@/components/Skills';
import Systems from '@/components/Systems';
import Experiments from '@/components/Experiments';
import Colophon from '@/components/Colophon';
import Loader from '@/components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Optional: simulate extra delay if you want it to feel like "loading"
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // max 1.2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {!loading && (
        <main className="cursor-custom">
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <ThemeToggle />
          
          <Index />
          <Works />
          <Skills />
          <Systems />
          <Experiments />
          <Colophon />
        </main>
      )}
    </>
  );
}
