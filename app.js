const header=document.querySelector('.site-header');

window.addEventListener('scroll',()=>{
  header?.classList.toggle('scrolled',window.scrollY>24);
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const id=a.getAttribute('href');
  if(id&&id.length>1){
    const el=document.querySelector(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }
}));

const revealTargets=document.querySelectorAll('.statement,.world-panel,.tribes-head,.community,.join,.login');
revealTargets.forEach(el=>el.classList.add('reveal'));

document.querySelectorAll('.tribe-row,.stats').forEach(el=>el.classList.add('stagger'));

document.querySelectorAll('.world-copy,.season-copy,.join-copy').forEach(el=>el.classList.add('reveal'));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.14,rootMargin:'0px 0px -40px'});

document.querySelectorAll('.reveal,.stagger').forEach(el=>revealObserver.observe(el));

const hero=document.querySelector('.hero');
const heroArt=document.querySelector('.hero-art');
window.addEventListener('scroll',()=>{
  if(!hero||!heroArt||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const y=Math.min(window.scrollY,700);
  heroArt.style.transform=`translateY(${y*0.035}px) scale(1.01)`;
},{passive:true});

document.querySelectorAll('input').forEach(input=>{
  input.addEventListener('focus',()=>input.parentElement?.classList.add('focused'));
  input.addEventListener('blur',()=>input.parentElement?.classList.remove('focused'));
});