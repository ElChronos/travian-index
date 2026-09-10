(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const root = document.documentElement;
  const hero = document.querySelector('.hero-backdrop');
  const header = document.querySelector('.site-header');

  // Custom cursor only for mouse/fine pointers. Never hijack touch controls.
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (finePointer && dot && ring && !reducedMotion) {
    let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;
    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
    };
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, {passive:true});
    requestAnimationFrame(tick);

    document.querySelectorAll('a,button,input,.tribe-row article,.game-frame').forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // Header state and deliberately low-amplitude camera motion.
  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 28);
    if (!reducedMotion && hero) {
      hero.style.setProperty('--hero-y', `${Math.min(window.scrollY * 0.055, 30)}px`);
    }
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // A single section-reveal language rather than animating every line of copy.
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:0.14, rootMargin:'0px 0px -10% 0px'});
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }

  // Subtle physical hover on the game screenshot, not on every component.
  if (!reducedMotion) {
    document.querySelectorAll('.game-frame').forEach((frame) => {
      frame.addEventListener('pointermove', (event) => {
        const rect = frame.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        frame.style.transform = `perspective(1100px) rotateX(${y * -1.8}deg) rotateY(${x * 2.2}deg) translateZ(0)`;
      });
      frame.addEventListener('pointerleave', () => { frame.style.transform = ''; });
    });
  }

  // Navigation reads like a world map: indicate the section currently in view.
  const links = [...document.querySelectorAll('.site-header nav a')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
    sections.forEach((section) => spy.observe(section));
  }
})();
