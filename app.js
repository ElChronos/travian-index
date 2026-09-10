const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer:fine)').matches;
const header = document.querySelector('.topbar');

if (finePointer) document.body.classList.add('has-pointer');

const cursor = document.querySelector('.cursor-core');
const halo = document.querySelector('.cursor-halo');
let mouseX = innerWidth / 2, mouseY = innerHeight / 2, haloX = mouseX, haloY = mouseY;

if (finePointer) {
  addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (cursor) cursor.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
  }, {passive:true});
  const tick = () => {
    haloX += (mouseX - haloX) * 0.14;
    haloY += (mouseY - haloY) * 0.14;
    if (halo) halo.style.transform = `translate3d(${haloX}px,${haloY}px,0)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  document.querySelectorAll('a,button,input,.tribe-card,.system-grid article,.realm-card').forEach((el) => {
    el.addEventListener('pointerenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
  });
}

let ticking = false;
const updateScroll = () => {
  header?.classList.toggle('scrolled', scrollY > 20);
  if (!reduceMotion) {
    const hero = document.querySelector('.hero-image');
    if (hero) hero.style.setProperty('--hero-y', `${Math.min(scrollY * 0.045, 34)}px`);
    const server = document.querySelector('.server-art');
    if (server) server.style.setProperty('--server-y', `${Math.min(Math.max((innerHeight * .5 - server.getBoundingClientRect().top) * -0.018, -24), 24)}px`);
  }
  ticking = false;
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } }, {passive:true});
updateScroll();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => anchor.addEventListener('click', (event) => {
  const id = anchor.getAttribute('href');
  if (!id || id === '#') return;
  const target = document.querySelector(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'});
}));

const revealItems = document.querySelectorAll('[data-reveal]');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {threshold:.12, rootMargin:'0px 0px -7% 0px'});
  revealItems.forEach((el, index) => {
    el.style.setProperty('--delay', `${Math.min(index * 45, 240)}ms`);
    el.classList.add('reveal');
    observer.observe(el);
  });
} else revealItems.forEach((el) => el.classList.add('is-visible'));

const tribeCards = document.querySelectorAll('.tribe-card');
tribeCards.forEach((card) => card.addEventListener('click', () => {
  tribeCards.forEach((item) => item.classList.remove('active'));
  card.classList.add('active');
}));
