'use client';

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

export default function Home() {
  return (
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
  );
}
