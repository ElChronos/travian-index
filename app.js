document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id&&id.length>1){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}}}));
const topbar=document.querySelector('.topbar');window.addEventListener('scroll',()=>{topbar.style.boxShadow=window.scrollY>20?'0 12px 35px rgba(0,0,0,.25)':'none'});

/* Crusader Trav custom battlefield art: generated SVG, no stock-photo backgrounds. */
const battlefieldArt=document.createElement('style');
battlefieldArt.textContent=`
.hero-backdrop{background:linear-gradient(90deg,rgba(6,7,8,.97) 0%,rgba(8,8,7,.86) 30%,rgba(8,8,7,.25) 70%,rgba(8,8,7,.55) 100%),linear-gradient(180deg,rgba(0,0,0,.05) 35%,rgba(7,7,6,.9) 100%),url('battlefield.svg') center/cover no-repeat!important;filter:saturate(.9) contrast(1.08)!important}
.hero-backdrop:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 78% 42%,rgba(224,163,70,.2),transparent 25%)}
.cta-bg{background:linear-gradient(rgba(7,6,5,.64),rgba(7,6,5,.94)),url('battlefield.svg') center 60%/cover no-repeat!important;filter:saturate(.72) contrast(1.1)!important}
.speed-art{background:linear-gradient(rgba(9,8,7,.18),rgba(9,8,7,.5)),url('battlefield.svg') center 70%/cover no-repeat!important}
.speed-art>.sun,.speed-art>.mountain,.speed-art>.castle,.speed-art>.road{display:none!important}
`;
document.head.appendChild(battlefieldArt);
