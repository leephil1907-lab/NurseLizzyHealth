'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const slides = [
  { category: 'HEALTH & WELLNESS', title: 'Better Health Starts With Better Information.', description: 'Practical, accessible health information designed to help you understand your health and make informed everyday choices.', primary: 'Explore Health Topics', href: '/hub', secondary: 'Read the Blog', secondaryHref: '/blog', image: 'photo-1559757175-0eb30cd8c063', alt: 'Healthcare professional in a bright, modern clinical setting' },
  { category: 'NUTRITION', title: 'Small Changes. Healthier Habits.', description: 'Explore practical nutrition information, healthy eating principles, and simple ways to build sustainable habits.', primary: 'Explore Nutrition', href: '/hub/nutrition', secondary: 'Learn about healthy eating', secondaryHref: '/learn/healthy-eating', image: 'photo-1490645935967-10de6ba17061', alt: 'A colorful selection of fresh, varied foods' },
  { category: 'WOMEN’S HEALTH', title: 'Understand Your Health. Take Charge of Your Wellbeing.', description: 'Educational resources covering everyday women’s health, wellness, prevention, and healthy living.', primary: 'Explore Women’s Health', href: '/hub/womens-health', secondary: 'Understand your cycle', secondaryHref: '/learn/menstrual-cycle', image: 'photo-1518611012118-696072aa579a', alt: 'Woman stretching in a calm, sunlit environment' },
  { category: 'FREE LEARNING TOOLS', title: 'Take a moment to learn, explore, and reflect.', description: 'Try a short knowledge quiz, use a gentle reflection checklist, or look up a health term in the glossary.', primary: 'Explore Free Tools', href: '/tools', secondary: 'Browse the glossary', secondaryHref: '/glossary', image: 'photo-1455390582262-044cdead277a', alt: 'An open notebook ready for thoughtful learning' },
  { category: 'EVERYDAY WELLNESS', title: 'Build Habits That Support Your Wellbeing.', description: 'Discover practical information about sleep, movement, stress management, nutrition, and healthy routines.', primary: 'Explore Wellness', href: '/hub/everyday-health', secondary: 'Start a learning path', secondaryHref: '/start-here', image: 'photo-1505693416388-ac5ce068fe85', alt: 'A softly lit restful bedroom' },
];

const ease = [0.2, 0.7, 0.2, 1] as const;
const rise: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.88, ease } },
  exit: { opacity: 0, y: -5, filter: 'blur(5px)', transition: { duration: 0.2, ease: 'easeOut' } },
};

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const reduce = useReducedMotion();
  const next = useCallback(() => setActive((n) => (n + 1) % slides.length), []);
  const prev = useCallback(() => setActive((n) => (n - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    timer.current = setInterval(next, 6700);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, next, reduce]);

  const slide = slides[active];
  const noMotion = Boolean(reduce);
  const riseMotion: Variants = noMotion
    ? { hidden: { opacity: 1, y: 0, filter: 'blur(0px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' }, exit: { opacity: 1, y: 0, filter: 'blur(0px)' } }
    : rise;

  return <>
    <link rel="preload" as="image" href={`https://images.unsplash.com/${slides[0].image}?auto=format&fit=crop&w=2000&q=85`} />
    <section
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured health and wellness stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}
      onPointerDown={(event) => { pointer.current = { x: event.clientX, y: event.clientY }; }}
      onPointerUp={(event) => {
        if (!pointer.current) return;
        const dx = event.clientX - pointer.current.x;
        const dy = event.clientY - pointer.current.y;
        if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.25) (dx < 0 ? next : prev)();
        pointer.current = null;
      }}
    >
      <AnimatePresence>
        <motion.div
          className="carousel-image"
          key={slide.image}
          initial={{ opacity: 0, x: noMotion ? 0 : 10, scale: noMotion ? 1 : 1.035, filter: noMotion ? 'blur(0px)' : 'blur(12px)' }}
          animate={{ opacity: 1, x: 0, scale: noMotion ? 1 : 1.008, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: noMotion ? 0 : -6, scale: noMotion ? 1 : 1.015, filter: noMotion ? 'blur(0px)' : 'blur(7px)' }}
          transition={{
            opacity: { duration: noMotion ? 0.01 : 0.95, ease: 'easeInOut' },
            x: { duration: noMotion ? 0.01 : 0.9, ease },
            filter: { duration: noMotion ? 0.01 : 1.05, ease },
            scale: { duration: noMotion ? 0.01 : 6.7, ease: 'linear' },
          }}
          aria-hidden="true"
        >
          <img src={`https://images.unsplash.com/${slide.image}?auto=format&fit=crop&w=2000&q=85`} alt="" fetchPriority={active === 0 ? 'high' : 'auto'} loading={active === 0 ? 'eager' : 'lazy'} />
        </motion.div>
      </AnimatePresence>
      <div className="carousel-vignette" />
      <div className="carousel-grain" />
      <div className="wrap carousel-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="carousel-copy"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { delayChildren: noMotion ? 0 : 0.28, staggerChildren: noMotion ? 0 : 0.14 } },
              exit: { opacity: 0, transition: { duration: noMotion ? 0.01 : 0.18 } },
            }}
          >
            <motion.div className="carousel-kicker" variants={riseMotion}>{slide.category}</motion.div>
            <motion.h1 variants={riseMotion}>{slide.title}</motion.h1>
            <motion.p variants={riseMotion}>{slide.description}</motion.p>
            <motion.div className="carousel-ctas" variants={riseMotion}>
              <Link className="btn" href={slide.href}>{slide.primary}<ArrowUpRight size={16} /></Link>
              <Link className="carousel-secondary" href={slide.secondaryHref}>{slide.secondary}<ArrowRight size={15} /></Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="carousel-bottom"
          initial={noMotion ? false : { opacity: 0, y: 8, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: noMotion ? 0.01 : 0.75, delay: noMotion ? 0 : 0.82, ease }}
        >
          <div className="carousel-pagination">
            <button className="carousel-arrow" aria-label="Previous slide" onClick={prev}><ArrowLeft size={18} /></button>
            <span className="slide-count"><b>{String(active + 1).padStart(2, '0')}</b><i>/</i>{String(slides.length).padStart(2, '0')}</span>
            <button className="carousel-arrow" aria-label="Next slide" onClick={next}><ArrowRight size={18} /></button>
          </div>
          <div className="carousel-dots" role="tablist" aria-label="Choose a featured slide">
            {slides.map((item, index) => <button key={item.category} onClick={() => setActive(index)} className={index === active ? 'is-active' : ''} role="tab" aria-selected={index === active} aria-label={`Show slide ${index + 1}: ${item.category}`}><span /></button>)}
          </div>
          <span className="carousel-caption">NURSE LIZZY HEALTH　/　{String(active + 1).padStart(2, '0')}</span>
        </motion.div>
      </div>
    </section>
  </>;
}
