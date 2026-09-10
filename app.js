const header = document.querySelector('.site-header');
const cursor = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.append(cursor, cursorRing);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

window.addEventListener('pointermove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursor.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
});

const animateCursor = () => {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  cursorRing.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
  requestAnimationFrame(animateCursor);
};
animateCursor();

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.08;
    const rect = el.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
    el.style.setProperty('--parallax-y', `${offset}px`);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealItems = document.querySelectorAll('.statement, .world-panel, .tribes-head, .tribe-row article, .season-copy, .season-art, .community, .join-copy, .join form, .login > div, .login form');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
revealItems.forEach((el, index) => {
  el.style.setProperty('--reveal-delay', `${Math.min(index * 45, 280)}ms`);
  revealObserver.observe(el);
});

document.querySelectorAll('a, button, input, .tribe-row article, .header-play').forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

window.dispatchEvent(new Event('scroll'));
