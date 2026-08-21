"use client";

import { useEffect } from "react";

/**
 * Stille bevegelse (DESIGNPLAN §2.5): scroll-reveals + tellere.
 * - Basistilstand er alltid fullt synlig (crawler/no-JS-trygt).
 * - Kun transform/opacity animeres; alt respekterer prefers-reduced-motion.
 * - [data-reveal] → fade/rise én gang; [data-reveal-group] staggerer barna 70ms.
 * - [data-count-to="1234"] → teller opp ved inntreden (tabular-nums forhindrer shift).
 */
export function MotionInit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealEls: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => revealEls.push(el));
    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.setProperty("--reveal-delay", `${Math.min(i * 70, 420)}ms`);
        revealEls.push(el);
      });
    });

    for (const el of revealEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) continue; // allerede i viewport — ikke skjul
      el.classList.add("will-reveal");
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.classList.contains("will-reveal")) {
            el.classList.add("is-revealed");
          }
          const countTo = el.getAttribute("data-count-to");
          if (countTo) animateCount(el, Number(countTo));
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );

    revealEls.forEach((el) => io.observe(el));
    document
      .querySelectorAll<HTMLElement>("[data-count-to]")
      .forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}

function animateCount(el: HTMLElement, target: number) {
  if (el.dataset.counted) return;
  el.dataset.counted = "1";
  const duration = 1200;
  const start = performance.now();
  const fmt = (n: number) => Math.round(n).toLocaleString("nb-NO");
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(target * eased);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
