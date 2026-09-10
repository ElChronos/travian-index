const header = document.querySelector('.site-header');

const motionStyle = document.createElement('style');
motionStyle.textContent = `
body{cursor:none!important}body a,body button,body input{cursor:none!important}
.cursor-dot{position:fixed;left:0;top:0;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#9a7440;z-index:1000;pointer-events:none;mix-blend-mode:multiply;transition:width .2s ease,height .2s ease,background .2s ease,margin .2s ease}
.cursor-ring{position:fixed;left:0;top:0;width:34px;height:34px;margin:-17px 0 0 -17px;border:1px solid rgba(154,116,64,.55);border-radius:50%;z-index:999;pointer-events:none;transition:width .25s ease,height .25s ease,margin .25s ease,border-color .25s ease,background .25s ease}
.cursor-hover .cursor-dot{width:5px;height:5px;margin:-2.5px 0 0 -2.5px}
.cursor-hover .cursor-ring{width:50px;height:50px;margin:-25px 0 0 -25px;border-color:#9a7440;background:rgba(154,116,64,.06)}
.is-visible{animation:crusaderReveal .8s cubic-bezier(.2,.75,.25,1) both;animation-delay:var(--reveal-delay,0ms)}
@keyframes crusaderReveal{from{opacity:0;transform:translate3d(0,28px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
`;document.head.appendChild(motionStyle);

const cursor = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.append(cursor, cursorRing);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let rafId;

window.addEventListener('pointermove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursor.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
});

const animateCursor = () => {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  cursorRing.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
  rafId = requestAnimationFrame(animateCursor);
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
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

revealItems.forEach((el, index) => {
  el.style.setProperty('--reveal-delay', `${Math.min(index * 45, 280)}ms`);
  revealObserver.observe(el);
});

document.querySelectorAll('a,button,input,.tribe-row article,.header-play').forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

window.addEventListener('pointerleave', () => document.body.classList.remove('cursor-hover'));
window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
window.dispatchEvent(new Event('scroll'));
