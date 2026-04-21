// --- Animated video-loop placeholders (SVG-based, no real video files) ---
// These render as continuous motion loops: moiré fields, drifting orbs, VHS bars,
// scanning lines, etc. Designed to feel like ambient 'visuals' footage.

function LoopSmoke({ hue = 22, seed = 0 }) {
  // drifting radial blobs + grain — reads as fog / smoke
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
      <defs>
        <radialGradient id={`sm1-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`oklch(0.7 0.12 ${hue})`} stopOpacity="0.55"/>
          <stop offset="100%" stopColor={`oklch(0.1 0.01 ${hue})`} stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`sm2-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`oklch(0.5 0.18 ${hue})`} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={`oklch(0.1 0.01 ${hue})`} stopOpacity="0"/>
        </radialGradient>
        <filter id={`smg-${seed}`}>
          <feTurbulence baseFrequency="0.85" numOctaves="2" seed={seed}/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .35 0"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill={`oklch(0.09 0.012 ${hue})`}/>
      <g>
        <circle r="260" fill={`url(#sm1-${seed})`}>
          <animate attributeName="cx" dur="14s" values="120;480;200;120" repeatCount="indefinite"/>
          <animate attributeName="cy" dur="17s" values="220;120;300;220" repeatCount="indefinite"/>
        </circle>
        <circle r="180" fill={`url(#sm2-${seed})`}>
          <animate attributeName="cx" dur="11s" values="500;160;420;500" repeatCount="indefinite"/>
          <animate attributeName="cy" dur="19s" values="100;320;180;100" repeatCount="indefinite"/>
        </circle>
        <circle r="210" fill={`url(#sm1-${seed})`} opacity="0.6">
          <animate attributeName="cx" dur="23s" values="300;100;500;300" repeatCount="indefinite"/>
          <animate attributeName="cy" dur="13s" values="200;380;40;200" repeatCount="indefinite"/>
        </circle>
      </g>
      <rect width="600" height="400" filter={`url(#smg-${seed})`} opacity="0.5"/>
    </svg>
  );
}

function LoopMoire({ hue = 22, seed = 0 }) {
  // two rotating line grids -> moiré interference
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
      <defs>
        <pattern id={`mo-${seed}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke={`oklch(0.7 0.08 ${hue})`} strokeWidth="1"/>
        </pattern>
        <radialGradient id={`movg-${seed}`} cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor={`oklch(0.5 0.2 ${hue})`} stopOpacity=".5"/>
          <stop offset="1" stopColor="black" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill={`oklch(0.08 0.012 ${hue})`}/>
      <g style={{mixBlendMode:'screen',opacity:.5}}>
        <rect x="-200" y="-200" width="1000" height="800" fill={`url(#mo-${seed})`}>
          <animateTransform attributeName="transform" type="rotate" from="0 300 200" to="360 300 200" dur="40s" repeatCount="indefinite"/>
        </rect>
        <rect x="-200" y="-200" width="1000" height="800" fill={`url(#mo-${seed})`}>
          <animateTransform attributeName="transform" type="rotate" from="15 300 200" to="-345 300 200" dur="55s" repeatCount="indefinite"/>
        </rect>
      </g>
      <rect width="600" height="400" fill={`url(#movg-${seed})`}/>
    </svg>
  );
}

function LoopScan({ hue = 22, seed = 0 }) {
  // horizontal scan bar travels, with VHS-style color bleed
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
      <defs>
        <linearGradient id={`scl-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={`oklch(0.9 0.2 ${hue})`} stopOpacity="0"/>
          <stop offset=".5" stopColor={`oklch(0.9 0.2 ${hue})`} stopOpacity=".7"/>
          <stop offset="1" stopColor={`oklch(0.9 0.2 ${hue})`} stopOpacity="0"/>
        </linearGradient>
        <filter id={`scg-${seed}`}>
          <feTurbulence baseFrequency="0.9" numOctaves="2" seed={seed+3}/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .25 0"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill={`oklch(0.1 0.012 ${hue})`}/>
      {/* drifting silhouette */}
      <ellipse cx="300" cy="230" rx="180" ry="60" fill={`oklch(0.22 0.03 ${hue})`}>
        <animate attributeName="rx" dur="8s" values="180;210;170;180" repeatCount="indefinite"/>
        <animate attributeName="ry" dur="9s" values="60;48;66;60" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="300" cy="180" rx="140" ry="100" fill={`oklch(0.28 0.04 ${hue})`} opacity="0.7">
        <animate attributeName="cx" dur="12s" values="270;330;300;270" repeatCount="indefinite"/>
      </ellipse>
      {/* scan bar */}
      <rect width="600" height="36" fill={`url(#scl-${seed})`} style={{mixBlendMode:'screen'}}>
        <animate attributeName="y" dur="4.5s" values="-40;420;-40" repeatCount="indefinite"/>
      </rect>
      {/* scanlines */}
      <g style={{mixBlendMode:'multiply',opacity:.55}}>
        {[...Array(100)].map((_,i)=>(
          <line key={i} x1="0" x2="600" y1={i*4} y2={i*4} stroke="black" strokeWidth="1.2"/>
        ))}
      </g>
      <rect width="600" height="400" filter={`url(#scg-${seed})`} opacity=".55"/>
      {/* vhs code */}
      <text x="16" y="30" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={`oklch(0.9 0.2 ${hue})`} opacity=".8">REC ● 00:{String(seed*7%60).padStart(2,'0')}</text>
      <text x="584" y="30" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="white" opacity=".5">PLAY ▶▶</text>
    </svg>
  );
}

function LoopOrbit({ hue = 22, seed = 0 }) {
  // orbital rings + pulsing star — reads like a synth/astral visualizer
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
      <defs>
        <radialGradient id={`or-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={`oklch(0.95 0.15 ${hue})`} stopOpacity="1"/>
          <stop offset=".5" stopColor={`oklch(0.6 0.2 ${hue})`} stopOpacity=".6"/>
          <stop offset="1" stopColor={`oklch(0.1 0.012 ${hue})`} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill={`oklch(0.07 0.012 ${hue})`}/>
      <g transform="translate(300 200)">
        <circle r="120" fill="none" stroke={`oklch(0.4 0.1 ${hue})`} strokeWidth=".5" opacity=".5">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite"/>
        </circle>
        <ellipse rx="180" ry="50" fill="none" stroke={`oklch(0.5 0.15 ${hue})`} strokeWidth=".5" opacity=".5">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="45s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse rx="220" ry="80" fill="none" stroke={`oklch(0.4 0.1 ${hue})`} strokeWidth=".5" opacity=".4">
          <animateTransform attributeName="transform" type="rotate" values="30;-330" dur="60s" repeatCount="indefinite"/>
        </ellipse>
        <circle r="60" fill={`url(#or-${seed})`}>
          <animate attributeName="r" values="55;70;55" dur="5s" repeatCount="indefinite"/>
        </circle>
        <g>
          <circle cx="120" cy="0" r="3" fill={`oklch(0.9 0.15 ${hue})`}>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>
    </svg>
  );
}

function LoopGlitchBars({ hue = 22, seed = 0 }) {
  // shifting data bars — like an EQ frozen in time
  const bars = 40;
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
      <rect width="600" height="400" fill={`oklch(0.09 0.012 ${hue})`}/>
      {[...Array(bars)].map((_,i)=>{
        const w = 600/bars;
        const h0 = 60 + (Math.sin(i*0.7 + seed)*0.5+0.5) * 180;
        const h1 = 80 + (Math.sin(i*0.3 + seed*2)*0.5+0.5) * 240;
        const h2 = 40 + (Math.cos(i*0.9 + seed)*0.5+0.5) * 200;
        return (
          <rect key={i} x={i*w+1} width={w-2} y={200} height={h0}
            fill={i%7===0 ? `oklch(0.6 0.2 ${hue})` : `oklch(0.4 0.06 ${hue})`}>
            <animate attributeName="height" values={`${h0};${h1};${h2};${h0}`} dur={`${2+i%4*0.5}s`} repeatCount="indefinite"/>
            <animate attributeName="y" values={`${400-h0};${400-h1};${400-h2};${400-h0}`} dur={`${2+i%4*0.5}s`} repeatCount="indefinite"/>
          </rect>
        );
      })}
      <line x1="0" y1="200" x2="600" y2="200" stroke={`oklch(0.8 0.2 ${hue})`} strokeWidth=".5" opacity=".4"/>
    </svg>
  );
}

// router
function VideoLoop({ kind="smoke", hue=22, seed=0, label }) {
  const inner = (()=>{
    switch(kind){
      case 'moire': return <LoopMoire hue={hue} seed={seed}/>;
      case 'scan': return <LoopScan hue={hue} seed={seed}/>;
      case 'orbit': return <LoopOrbit hue={hue} seed={seed}/>;
      case 'bars': return <LoopGlitchBars hue={hue} seed={seed}/>;
      default: return <LoopSmoke hue={hue} seed={seed}/>;
    }
  })();
  return (
    <div style={{position:'relative',width:'100%',height:'100%',overflow:'hidden',background:'var(--bg-deeper)'}}>
      {inner}
      {label && (
        <div style={{
          position:'absolute', top:10, left:10, fontFamily:"'JetBrains Mono',monospace", fontSize:10,
          color:'var(--fg)', opacity:.7, letterSpacing:'.14em', textTransform:'uppercase',
          display:'flex',alignItems:'center',gap:6,
          padding:'4px 8px', background:'rgba(0,0,0,.4)', backdropFilter:'blur(4px)'
        }}>
          <span style={{width:6,height:6,borderRadius:99,background:'var(--accent)',animation:'pulse 1.6s ease-in-out infinite'}}/>
          {label}
        </div>
      )}
      <div style={{
        position:'absolute', bottom:10, right:12, fontFamily:"'JetBrains Mono',monospace", fontSize:9,
        color:'var(--fg-dimmer)', letterSpacing:'.1em', textTransform:'uppercase'
      }}>loop · ∞</div>
    </div>
  );
}

Object.assign(window, { VideoLoop, LoopSmoke, LoopMoire, LoopScan, LoopOrbit, LoopGlitchBars });
