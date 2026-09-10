(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const hero = document.querySelector('.hero-backdrop');
  const reveals = document.querySelectorAll('[data-reveal], .feature-grid, .community-strip, .join form');
  const tiltCards = document.querySelectorAll('.tribe-row article, .feature-grid > div');

  reveals.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(index * 60, 360)}ms`);
  });

  if (!reduce && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:.12, rootMargin:'0px 0px -7% 0px'});
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  if (!reduce) {
    window.addEventListener('pointermove', event => {
      const x = (event.clientX / window.innerWidth - .5) * 2;
      const y = (event.clientY / window.innerHeight - .5) * 2;
      root.style.setProperty('--mouse-x', `${x * 10}px`);
      root.style.setProperty('--mouse-y', `${y * 7}px`);
    }, {passive:true});

    window.addEventListener('scroll', () => {
      if (hero) {
        const value = Math.min(window.scrollY * .08, 38);
        hero.style.setProperty('--hero-y', `${value}px`);
      }
    }, {passive:true});

    tiltCards.forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${py * -3}deg) rotateY(${px * 3}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();
