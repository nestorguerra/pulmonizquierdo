// --- shared React hooks & icons ---
const { useState, useEffect, useRef, useMemo, useCallback } = React;

function useScrolled(threshold = 10){
  const [s, setS] = useState(false);
  useEffect(()=>{
    const onS = ()=> setS(window.scrollY > threshold);
    onS(); window.addEventListener('scroll', onS, {passive:true});
    return ()=> window.removeEventListener('scroll', onS);
  },[threshold]);
  return s;
}

function useReveal(){
  useEffect(()=>{
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=> { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{ threshold: .12 });
    els.forEach(el => io.observe(el));
    return ()=> io.disconnect();
  });
}

function useNow(){
  const [t, setT] = useState('');
  useEffect(()=>{
    const fmt = ()=> new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Madrid'});
    setT(fmt());
    const id = setInterval(()=> setT(fmt()), 15000);
    return ()=> clearInterval(id);
  },[]);
  return t;
}

// ---- icons (hand-ink style) ----
const Icon = {
  Play:   ({size=12}) => <svg width={size} height={size} viewBox="0 0 12 12"><path d="M3 2l7 4-7 4z" fill="currentColor"/></svg>,
  Pause:  ({size=12}) => <svg width={size} height={size} viewBox="0 0 12 12"><rect x="3" y="2" width="2.5" height="8" fill="currentColor"/><rect x="6.5" y="2" width="2.5" height="8" fill="currentColor"/></svg>,
  Prev:   ({size=12}) => <svg width={size} height={size} viewBox="0 0 12 12"><path d="M9 2v8L4 6zM3 2v8" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>,
  Next:   ({size=12}) => <svg width={size} height={size} viewBox="0 0 12 12"><path d="M3 2v8l5-4zM9 2v8" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>,
  Arrow:  ({size=12}) => <svg width={size} height={size} viewBox="0 0 12 12"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>,
};

// Little handwritten underline
function HandUnderline({ color='var(--rust)' }){
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{width:'100%',height:'8px',marginTop:'-2px'}}>
      <path d="M2 6 Q30 2 60 6 T120 7 T198 5" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

// Rail (shared section header)
function Rail({ num, title, aside }){
  return (
    <div className="section__rail">
      <span className="section__num">[ {num} ]</span>
      <h2 className="section__title">{title}</h2>
      <div className="section__aside">{aside}</div>
    </div>
  );
}

// VU-style meter (animated)
function VU({ active=false, bars=14 }){
  const [vals, setVals] = useState(Array(bars).fill(2));
  useEffect(()=>{
    if(!active){ setVals(Array(bars).fill(2)); return; }
    let raf;
    const tick = ()=>{
      setVals(prev => prev.map((_, i) => {
        const pulse = Math.sin(Date.now()/180 + i*.6);
        const noise = Math.random();
        return Math.max(2, Math.abs(pulse*14) + noise*8);
      }));
      raf = requestAnimationFrame(tick);
    };
    tick();
    return ()=> cancelAnimationFrame(raf);
  },[active, bars]);
  return (
    <div className="player__vu" aria-hidden>
      {vals.map((v,i)=><span key={i} style={{height:`${v}px`,opacity:.35 + (i/bars)*.65}}/>)}
    </div>
  );
}

Object.assign(window, { useState, useEffect, useRef, useMemo, useCallback, useScrolled, useReveal, useNow, Icon, HandUnderline, Rail, VU });
