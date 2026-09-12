(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const header = document.querySelector('.topbar');
  const heroImage = document.querySelector('.hero-image');
  const serverArt = document.querySelector('.server-art');
  const cursor = document.querySelector('.cursor-core');
  const halo = document.querySelector('.cursor-halo');
  let raf = 0;
  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let haloX = mouseX;
  let haloY = mouseY;
  let lastScroll = 0;

  if (finePointer && !reduceMotion) {
    document.body.classList.add('has-pointer');
    addEventListener('pointermove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor?.style.setProperty('transform', `translate3d(${mouseX}px,${mouseY}px,0)`);

      const dx = (mouseX / innerWidth - 0.5) * 2;
      const dy = (mouseY / innerHeight - 0.5) * 2;
      heroImage?.style.setProperty('--hero-x', `${dx * -7}px`);
      heroImage?.style.setProperty('--hero-y', `${Math.min(scrollY * .045, 34) + dy * -4}px`);
    }, { passive: true });

    const followCursor = () => {
      haloX += (mouseX - haloX) * 0.14;
      haloY += (mouseY - haloY) * 0.14;
      halo?.style.setProperty('transform', `translate3d(${haloX}px,${haloY}px,0)`);
      raf = requestAnimationFrame(followCursor);
    };
    raf = requestAnimationFrame(followCursor);

    document.querySelectorAll('a,button,input,.tribe-card,.system-grid article,.realm-card,.game-btn').forEach((el) => {
      el.addEventListener('pointerenter', () => document.body.classList.add('cursor-active'));
      el.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
    });
  }

  let ticking = false;
  const updateScroll = () => {
    const current = scrollY;
    const directionDown = current > lastScroll;
    if (header) header.classList.toggle('is-hidden', directionDown && current > 150);
    lastScroll = current;

    if (!reduceMotion) {
      heroImage?.style.setProperty('--hero-y', `${Math.min(current * .045, 34)}px`);
      if (serverArt) {
        const rect = serverArt.getBoundingClientRect();
        const offset = (innerHeight * 0.5 - (rect.top + rect.height * 0.5)) * -0.025;
        serverArt.style.setProperty('--server-y', `${Math.max(-28, Math.min(28, offset))}px`);
      }
    }
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  updateScroll();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((el, index) => {
      el.style.setProperty('--delay', `${Math.min(index * 45, 260)}ms`);
      observer.observe(el);
    });
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  const tribeCards = document.querySelectorAll('.tribe-card');
  tribeCards.forEach((card) => card.addEventListener('click', () => {
    tribeCards.forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
  }));

  addEventListener('pagehide', () => cancelAnimationFrame(raf));
})();
