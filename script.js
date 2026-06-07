/* ─── Loader ─── */
  document.body.classList.add('loading');
  const loaderEl=document.getElementById('loader');
  const fillEl=document.getElementById('loaderFill');
  const pctEl=document.getElementById('loaderPct');
  const statusEl=document.getElementById('loaderStatus');
  const stages=[
    {pct:15,label:'Loading assets'},
    {pct:35,label:'Building layout'},
    {pct:58,label:'Rendering fonts'},
    {pct:74,label:'Applying styles'},
    {pct:90,label:'Almost there'},
    {pct:100,label:'Ready'},
  ];
  let stageIdx=0;
  function runLoader(){
    if(stageIdx>=stages.length)return;
    const s=stages[stageIdx++];
    fillEl.style.width=s.pct+'%';
    pctEl.textContent=s.pct+'%';
    statusEl.textContent=s.label;
    if(s.pct<100){
      setTimeout(runLoader,300+Math.random()*220);
    } else {
      setTimeout(()=>{
        loaderEl.classList.add('hidden');
        document.body.classList.remove('loading');
        /* show popup */
        setTimeout(()=>{
          document.getElementById('popup-overlay').classList.add('show');
          document.body.classList.add('popup-open');
        },400);
      },600);
    }
  }
  setTimeout(runLoader,400);

  /* ─── Cursor ─── */
  const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
  function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)}
  animRing();
  document.querySelectorAll('a,button,.project-card,.tech-item,.chip,.contact-link').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
  });

  /* ─── Hamburger ─── */
  const ham=document.getElementById('hamburger'),mob=document.getElementById('mobileMenu');
  ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open')});
  document.querySelectorAll('.menu-close').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('open');mob.classList.remove('open')}));

/* Prevent background scrolling on iOS/mobile when touching the overlay */
document.getElementById('popup-overlay').addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });