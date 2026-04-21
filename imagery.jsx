// --- imagery: real photos + looping videos (Unsplash + Pexels), toned to the
//     paper/ink palette of the record. Original API (Still/MotionCard) preserved
//     so sections.jsx keeps working without changes.

// ---- shared SVG filter defs — injected once into <body> ----
if(typeof document !== 'undefined' && !document.getElementById('ng-bw-filters')){
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('id','ng-bw-filters');
  svg.setAttribute('width','0'); svg.setAttribute('height','0');
  svg.style.position='absolute'; svg.style.width='0'; svg.style.height='0';
  svg.innerHTML = `
    <filter id="bw-distort" x="-2%" y="-2%" width="104%" height="104%">
      <feColorMatrix type="matrix" values="
        0.33 0.59 0.11 0 0
        0.33 0.59 0.11 0 0
        0.33 0.59 0.11 0 0
        0    0    0    1 0"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.6" intercept="-0.25"/>
        <feFuncG type="linear" slope="1.6" intercept="-0.25"/>
        <feFuncB type="linear" slope="1.6" intercept="-0.25"/>
      </feComponentTransfer>
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.9" numOctaves="2" seed="7" result="noise"/>
      <feDisplacementMap in2="noise" in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="bw-scanlines" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0 1.4" numOctaves="1" seed="3"/>
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .18 0"/>
    </filter>
  `;
  (document.body || document.documentElement).appendChild(svg);
}

function useInView(ref, opts = { threshold: 0.05 }){
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    if(!ref.current) return;
    const io = new IntersectionObserver(([e])=> setVis(e.isIntersecting), opts);
    io.observe(ref.current);
    return ()=> io.disconnect();
  }, [ref]);
  return vis;
}

// Toned real photo (with optional looping video) for the scrapbook/polaroids.
// When MEDIA[kind].bw === true (or bw prop is set), applies high-contrast
// monochrome + turbulence-based displacement distortion via SVG filter.
function Still({ kind = "window", tone, caption, motion = false, poster = true, bw, distort }){
  const m = MEDIA[kind];
  const toneKey = tone || (m && m.tone) || "sepia";
  const t = TONES[toneKey] || TONES.sepia;
  // Resolve the video source. If MEDIA entry has a `vids` array, randomly pick one
  // per component instance (stable for the life of the render).
  const videoSrc = useMemo(() => {
    if(!m) return null;
    if(m.vid) return m.vid;
    if(m.vids && m.vids.length) return m.vids[Math.floor(Math.random() * m.vids.length)];
    return null;
  }, [m]);
  const useVideo = motion && videoSrc;
  // B/W is on if prop says so, OR media says so (unless prop is explicitly false)
  const isBW = bw === true || bw === 'clean' ||
               (bw !== false && m && (m.bw === true || m.bw === 'clean'));
  // Distortion: only when B/W is on AND neither source says "clean".
  const clean = bw === 'clean' || (bw === undefined && m && m.bw === 'clean');
  const isDistorted = isBW && distort !== false && !clean;
  const isVintage = m && m.vintage === true;

  // CSS filter chain.
  // - B/W: grayscale + hi-contrast + small blur (plus SVG displacement if not clean)
  // - VINTAGE: heavier sepia + muted saturation + warmer hue + faded blacks
  // - default: light sepia wash with tone hue-rotate
  const photoFilter = isBW
    ? (clean
        ? "grayscale(1) contrast(1.2) brightness(.95)"
        : "grayscale(1) contrast(1.35) brightness(.92) blur(.35px)")
    : isVintage
      ? "sepia(.55) saturate(.6) hue-rotate(-8deg) contrast(.92) brightness(.96)"
      : `sepia(.35) saturate(.85) hue-rotate(${t.hue - 30}deg) contrast(1.05) brightness(.92)`;

  return (
    <div style={{
      width:"100%", height:"100%", position:"relative", overflow:"hidden",
      background: t.bg, isolation:"isolate",
    }}>
      {m && m.img && !useVideo && (
        <img
          src={m.img}
          alt={caption || kind}
          loading="lazy"
          decoding="async"
          style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover",
            filter: isDistorted ? `url(#bw-distort) ${photoFilter}` : photoFilter,
          }}
        />
      )}
      {useVideo && (
        <>
          {poster && m.img && (
            <img src={m.img} alt="" aria-hidden
                 style={{position:"absolute",inset:0,width:"100%",height:"100%",
                         objectFit:"cover",
                         filter:"sepia(.35) saturate(.8) contrast(1.05) brightness(.9)"}} />
          )}
          <video
            src={videoSrc}
            autoPlay loop muted playsInline preload="auto"
            poster={m.img}
            style={{
              position:"absolute", inset:0, width:"100%", height:"100%",
              objectFit:"cover",
              filter:`sepia(.3) saturate(.85) hue-rotate(${t.hue - 30}deg) contrast(1.05) brightness(.9)`,
            }}
          />
        </>
      )}
      {/* tonal wash */}
      <div aria-hidden style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:`radial-gradient(ellipse at 50% 45%, transparent 40%, ${t.bg} 110%), ${t.mix}`,
        mixBlendMode:"multiply",
      }}/>
      {/* subtle film grain */}
      <div aria-hidden style={{
        position:"absolute", inset:0, pointerEvents:"none", opacity:.28, mixBlendMode:"overlay",
        backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .6 0 0 0 0 .5 0 0 0 0 .4 0 0 0 .4 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      }}/>
      {/* vignette */}
      <div aria-hidden style={{
        position:"absolute", inset:0, pointerEvents:"none",
        boxShadow: isVintage
          ? `inset 0 0 120px 16px rgba(30,10,0,.8), inset 0 0 40px rgba(0,0,0,.4)`
          : `inset 0 0 80px 10px rgba(0,0,0,.55), inset 0 0 30px rgba(0,0,0,.3)`,
      }}/>
      {/* extra vintage cast: warm amber glow + light haze */}
      {isVintage && (
        <div aria-hidden style={{
          position:"absolute", inset:0, pointerEvents:"none", mixBlendMode:"overlay",
          background:"radial-gradient(ellipse at 40% 30%, rgba(230,180,110,.35), transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(120,60,30,.3), transparent 60%)",
        }}/>
      )}
      {caption && (
        <div style={{
          position:"absolute", bottom:8, left:10, right:10,
          fontFamily:"'Special Elite',monospace", fontSize:9, color:"#fde9c6",
          letterSpacing:".12em", textTransform:"uppercase", opacity:.85,
          textShadow:"0 2px 6px rgba(0,0,0,.85)"
        }}>{caption}</div>
      )}
    </div>
  );
}

// Full-bleed looping video (used behind the hero and the album art).
function AmbientVideo({ kind = "smoke", tone, opacity = .45, cover = true }){
  const m = MEDIA[kind];
  if(!m || !m.vid) return null;
  const toneKey = tone || m.tone || "sepia";
  const t = TONES[toneKey] || TONES.sepia;
  return (
    <div aria-hidden style={{
      position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0,
    }}>
      <video
        src={m.vid}
        autoPlay loop muted playsInline preload="auto"
        poster={m.img}
        style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          objectFit: cover ? "cover" : "contain",
          filter:`sepia(.35) saturate(.8) hue-rotate(${t.hue - 30}deg) contrast(1.05) brightness(.95)`,
          opacity,
        }}
      />
      <div style={{
        position:"absolute", inset:0,
        background:`radial-gradient(ellipse at 50% 50%, transparent 30%, ${t.bg} 120%)`,
        mixBlendMode:"multiply", opacity:.85,
      }}/>
    </div>
  );
}

function MotionCard({ kind = "smoke", tone, caption, label }){
  return (
    <div style={{width:"100%",height:"100%",position:"relative",background:"#000",overflow:"hidden"}}>
      <Still kind={kind} tone={tone} motion={true}/>
      {label && <div style={{
        position:"absolute",top:10,left:10,
        fontFamily:"'Special Elite',monospace",fontSize:9,color:"#fde9c6",
        letterSpacing:".18em",textTransform:"uppercase",
        background:"rgba(0,0,0,.45)",padding:"3px 7px",border:"1px solid rgba(253,233,198,.3)"
      }}>● REC · {label}</div>}
      {caption && <div style={{
        position:"absolute",bottom:12,left:12,right:12,
        fontFamily:"'Caveat',cursive",fontSize:22,color:"#fde9c6",
        textShadow:"0 2px 10px rgba(0,0,0,.9)"
      }}>{caption}</div>}
    </div>
  );
}

Object.assign(window, { Still, AmbientVideo, MotionCard, useInView });
