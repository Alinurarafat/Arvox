import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export function useScrollReveal<T extends HTMLElement>({
  selector = '.sr-reveal',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  staggerDelay = 0,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.srDelay
              ? parseInt(el.dataset.srDelay, 10)
              : 0;

            if (staggerDelay > 0 && el.dataset.srStagger === 'true') {
              const siblings = container.querySelectorAll('[data-sr-stagger="true"]');
              const index = Array.from(siblings).indexOf(el);
              el.style.transitionDelay = `${delay + index * staggerDelay}ms`;
            } else if (delay > 0) {
              el.style.transitionDelay = `${delay}ms`;
            }

            el.classList.add('sr-animate');
            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = container.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, rootMargin, staggerDelay]);

  return ref;
}