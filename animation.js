'use strict';

gsap.registerPlugin(ScrollTrigger);

// Lenis for page smooth scroll
const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 1
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Horizontal scroll only inside gallery container
const galleryContainer = document.querySelector('.gallery_container');

if (galleryContainer) {
  galleryContainer.addEventListener(
    'wheel',
    (e) => {
      // wheel/trackpad vertical delta -> horizontal scroll
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;

      e.preventDefault();
      e.stopPropagation();
      galleryContainer.scrollLeft += delta;
    },
    { passive: false }
  );
}