// --- sections: hero, tracks, lyrics, album, shows, bio, footer ---

function Chrome({ bandName, albumTitle }){
  const scrolled = useScrolled(10);
  const [active, setActive] = useState('top');
  const now = useNow();
  useEffect(()=>{
    const ids = ['canciones','letras','disco','grabacion','bio'];
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); });
    },{ rootMargin:'-45% 0px -50% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if(el) io.observe(el); });
    return ()=> io.disconnect();
  },[]);
  return (
    <div className={`chrome ${scrolled?'scrolled':''}`}>
      <a href="#top" className="chrome__mark">
        <span className="m1">{bandName}</span>
        <span className="sep">·</span>
        <span className="m2">{albumTitle}</span>
      </a>
      <nav className="chrome__nav">
        <a href="#canciones" className={active==='canciones'?'active':''}>canciones</a>
        <a href="#letras"    className={active==='letras'   ?'active':''}>letras</a>
        <a href="#disco"     className={active==='disco'    ?'active':''}>el disco</a>
        <a href="#grabacion" className={active==='grabacion'?'active':''}>el taller</a>
        <a href="#bio"       className={active==='bio'      ?'active':''}>bio</a>
      </nav>
      <div className="chrome__meta">
        Madrid · {now}
      </div>
    </div>
  );
}

// === HERO ===
// "Postcard" hero: big name in ink, handwritten subtitle, polaroid collage.
function HeroPostcard({ bandName, albumTitle, author, tagline, onPlay }){
  const parts = bandName.split(/\s+/);
  return (
    <section className="hero" id="top">
      <AmbientVideo kind="heart" tone="red" opacity={.22}/>
      <div className="hero__left" style={{position:'relative', zIndex:2}}>
        <div className="kicker rise">LP · larga duración · autoeditado · Madrid · MMXXVI</div>
        <h1 className="hero__title">
          <span className="rise d1" style={{display:'block'}}>{parts[0]}</span>
          <span className="rise d2" style={{display:'block'}}>
            <em>{parts.slice(1).join(' ') || '—'}</em>
          </span>
          <span className="rise d3" style={{display:'block',fontSize:'.58em',marginTop:'.1em'}}>
            Anatomía <em>de una</em> <span className="hand">asfixia</span>
          </span>
        </h1>
        <div className="hero__sub rise d3" style={{whiteSpace:'pre-line'}}>"{tagline.replace(/,\s*/, ',\n')}"</div>
        <div className="hero__byline rise d3">doce canciones · cincuenta y dos minutos · una sola voz</div>
        <button className="hero__cta rise d3" onClick={onPlay}>
          empezar por el final <Icon.Arrow size={16}/>
        </button>
      </div>
      <div className="hero__polaroids" style={{position:'relative', zIndex:2}}>
        {/* polaroid 1 — portrait (Néstor B&W) */}
        <div className="polaroid" style={{top:0,left:'5%',width:'55%',transform:'rotate(-5deg)'}}>
          <span className="tape" style={{top:-12,left:'40%'}}/>
          <div className="polaroid__img"><Still kind="portrait" tone="sepia"/></div>
          <div className="polaroid__cap">el izquierdo · el que duele</div>
        </div>
        {/* polaroid 2 — rain (video loop) */}
        <div className="polaroid" style={{top:'28%',right:'2%',width:'52%',transform:'rotate(4deg)'}}>
          <span className="tape" style={{top:-10,left:'30%'}}/>
          <div className="polaroid__img"><Still kind="rain" tone="blue" motion={true}/></div>
          <div className="polaroid__cap">llueve otra vez en Madrid</div>
        </div>
        {/* polaroid 3 — gear overhead (color, vintage) */}
        <div className="polaroid" style={{bottom:'3%',left:'18%',width:'46%',transform:'rotate(-2deg)'}}>
          <span className="tape" style={{top:-10,left:'50%'}}/>
          <div className="polaroid__img"><Still kind="gearOverhead" tone="sepia"/></div>
          <div className="polaroid__cap">tocar tu piel</div>
        </div>
        {/* small stamp sticker */}
        <div className="stamp stamp--filled" style={{position:'absolute',top:'10%',right:'8%',transform:'rotate(8deg)'}}>
          LP · 2026
        </div>
      </div>
    </section>
  );
}

// Alternate hero — big handwritten title, single letter spread
function HeroLetter({ bandName, albumTitle, author, tagline, onPlay }){
  return (
    <section className="hero" id="top" style={{gridTemplateColumns:'1fr',textAlign:'center',padding:'140px 48px 80px',minHeight:'90vh'}}>
      <div>
        <div className="kicker" style={{marginBottom:20}}>Madrid · MMXXVI · primer LP · autoeditado</div>
        <div className="hand" style={{fontFamily:"'Caveat',cursive",fontSize:'clamp(28px,3vw,44px)',color:'var(--ink-dim)',marginBottom:16,transform:'rotate(-1deg)'}}>
          doce cartas a nadie concreto. se envían sin dirección.
        </div>
        <h1 className="hero__title" style={{fontSize:'clamp(80px,14vw,220px)'}}>
          Anatomía <em>de una</em><br/><span className="accent">asfixia.</span>
        </h1>
        <div style={{margin:'40px auto 0',maxWidth:620,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontSize:24,lineHeight:1.5,color:'var(--ink-2)'}}>
          "{tagline}" — doce canciones de {author}. Sobre el aire que había y <em>ya no está</em>.
        </div>
        <button className="hero__cta" onClick={onPlay} style={{marginTop:40}}>
          empezar por el final <Icon.Arrow size={16}/>
        </button>
      </div>
    </section>
  );
}

// === TRACKLIST ===
function SoundsSection({ ctl }){
  const notesByTrack = {
    "01": "mirar hasta olvidar para qué servían los ojos.",
    "02": "ya nadie miente solo; se miente para dos.",
    "03": "la única canción del disco que pide algo.",
    "04": "crónica, sin síntomas que avisen.",
    "05": "escrita entre el sueño y la cocina.",
    "06": "ensayo general del luto.",
    "07": "cinco minutos porque no había prisa.",
    "08": "un verbo mal conjugado y un nombre propio.",
    "09": "la que no iba a cantarse. se cantó.",
    "10": "una mentira escrita como consuelo.",
    "11": "algo se rompe con ruido aquí.",
    "12": "epílogo. sin moraleja.",
  };
  return (
    <section className="section reveal" id="canciones">
      <Rail num="01" title="Libreto" aside="Tres actos. Doce intentos. El orden no es estricto." />
      {ACTS.map((act, ai) => {
        const tracksOfAct = TRACKS.filter(t => t.act === act.n);
        return (
          <div key={ai} className="act">
            <div className="act__head">
              <div className="act__roman">ACTO {act.n}</div>
              <div className="act__title">
                {act.title === 'Las Leyes de la Fricción' && <>Las Leyes <em>de la</em> <span className="accent">Fricción</span></>}
                {act.title === 'Anatomía de tu Ausencia' && <>Anatomía <em>de tu</em> <span className="accent">Ausencia</span></>}
                {act.title === 'La Mecánica de la Asfixia' && <>La Mecánica <em>de la</em> <span className="accent">Asfixia</span></>}
              </div>
              <div className="act__kicker">{act.kicker}</div>
              <div className="act__note">"{act.note}"</div>
            </div>
            <div className="tracks">
              {tracksOfAct.map((t) => {
                const i = TRACKS.indexOf(t);
                const cur = ctl.trackIdx === i;
                const isPlaying = cur && ctl.playing;
                return (
                  <div key={i} className={`track ${isPlaying?'playing':''}`} onClick={()=> cur ? ctl.toggle() : ctl.play(i)}>
                    <button className="track__btn">{isPlaying ? <Icon.Pause size={9}/> : <Icon.Play size={9}/>}</button>
                    <div className="track__n">{t.n}</div>
                    <div>
                      <div className="track__title">
                        {t.title}
                        <span className="small">· {t.key} · {t.tempo} BPM</span>
                      </div>
                      {notesByTrack[t.n] && <div className="track__note">— {notesByTrack[t.n]}</div>}
                    </div>
                    <div className="track__dur">{t.dur}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ── Al margen · canciones que no entraron al disco ── */}
      {TRACKS.some(t => t.act === 'extra') && (
        <div className="act" style={{marginTop:96}}>
          <div className="act__head" style={{borderTopStyle:'dashed'}}>
            <div className="act__roman" style={{color:'var(--ink-dim)',fontSize:'clamp(28px,3vw,44px)'}}>—</div>
            <div className="act__title" style={{fontSize:'clamp(24px,3vw,40px)'}}>Al <em>margen</em></div>
            <div className="act__kicker">quedaron fuera. no se decidió dónde colocarlas.</div>
            <div className="act__note">"se graba lo que se escribe. se publica lo que sobrevive."</div>
          </div>
          <div className="tracks">
            {TRACKS.map((t,i) => t.act === 'extra' ? (
              <div key={i} className={`track ${ctl.trackIdx===i && ctl.playing?'playing':''}`} onClick={()=> ctl.trackIdx===i ? ctl.toggle() : ctl.play(i)}>
                <button className="track__btn">{ctl.trackIdx===i && ctl.playing ? <Icon.Pause size={9}/> : <Icon.Play size={9}/>}</button>
                <div className="track__n">{t.n}</div>
                <div>
                  <div className="track__title">
                    {t.title}
                    <span className="small">· suelta · {t.tempo} BPM</span>
                  </div>
                  <div className="track__note">— fuera de la anatomía. una canción que no supo esperar.</div>
                </div>
                <div className="track__dur">{t.dur}</div>
              </div>
            ) : null).filter(Boolean)}
          </div>
        </div>
      )}
    </section>
  );
}

// === LYRICS (torn pages) ===
function LyricsSection({ ctl }){
  const [open, setOpen] = useState(0);
  useEffect(()=>{ if(ctl.trackIdx >= 0) setOpen(ctl.trackIdx); },[ctl.trackIdx]);
  const track = TRACKS[open];
  const body = LYRICS[track.title] || "(la letra de esta canción no se ha transcrito aún.\nlo dicho en ella queda, por ahora, donde debe: fuera del papel.)";
  return (
    <section className="section reveal" id="letras">
      <Rail num="02" title="Letras" aside="Lo dicho. Lo que no se atrevió. A mano, para no fiarse del teclado." />
      <div className="lyrics">
        <div className="lyrics__index">
          {TRACKS.map((t,i)=>(
            <button key={i} onClick={()=>setOpen(i)} className={open===i?'on':''}>
              <span className="n">{t.n}</span>
              <span>{t.title}</span>
            </button>
          ))}
        </div>
        <div className="lyrics__page">
          <span className="stamp">{track.key} · {track.tempo} BPM</span>
          <div className="lyrics__meta">[ cuaderno · pista {track.n} · {track.dur} ]</div>
          <h3 className="lyrics__title">{track.title}</h3>
          <div className="lyrics__body">{body}</div>
          <div style={{marginTop:28}}>
            <button onClick={()=>ctl.play(open)} className="album__btn" style={{background:'var(--rust)',color:'var(--paper)'}}>
              <Icon.Play size={10}/> escuchar "{track.title}"
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// === SCRAPBOOK — imagery section ===
function ScrapbookSection(){
  // items with absolute positions so it feels curated
  const items = [
    // polaroids medianas, desordenadas, agrupadas — solape intencional, sin huecos
    { kind:'poly', x:'1%',  y:10,   w:350, r:-5, img:'bwPlane',         tone:'sepia', cap:'la sala, antes de apagar' },
    { kind:'poly', x:'18%', y:120,  w:290, r:4,  img:'curtain',         tone:'dust',  cap:'la casa, aún con cosas' },
    { kind:'poly', x:'35%', y:30,   w:350, r:7,  img:'marshallLesPaul', tone:'sepia', cap:'el único ruido permitido' },
    { kind:'letter', x:'62%', y:80, w:260, r:-3, text:["13 de marzo,", "lo que dijiste no cabía en", "ninguna parte. lo metí en", "una canción. no sabría", "decir en cuál.","— n."] },
    { kind:'poly', x:'82%', y:20,   w:290, r:5,  img:'g13',             tone:'sepia', cap:'la madera, lo demás viene después' },

    { kind:'poly', x:'2%',  y:380, w:390, r:3,  img:'flowers',         tone:'sepia', cap:'lo que se guardó sin querer guardarlo' },
    { kind:'strip', x:'25%', y:460, rows:['rain','flowers','curtain','sea'] },
    { kind:'poly', x:'46%', y:390, w:350, r:-4, img:'guitarLineup',    tone:'sepia', cap:'las que esperan turno' },
    { kind:'ticket', x:'78%', y:460, big:'Mientes',  row:'02 · LP01 · MADRID', row2:'ACTO I · FRICCIÓN' },
    { kind:'poly', x:'80%', y:540, w:290, r:6,  img:'mirrorGibson',    tone:'blue',  cap:'por la rendija del armario' },

    { kind:'poly', x:'2%',  y:820, w:365, r:-2, img:'playAcoustic',    tone:'sepia', cap:'tocar a puerta cerrada' },
    { kind:'poly', x:'22%', y:900, w:310, r:5,  img:'guitarMacro',     tone:'sepia', cap:'la cuerda, justo antes de sonar' },
    { kind:'poly', x:'42%', y:830, w:325, r:-3, img:'pedalboardAcoust', tone:'blue', cap:'lo que hay encima de la alfombra' },
    { kind:'letter', x:'66%', y:890, w:300, r:3, text:["febrero, sótano,", "las manos se equivocan", "mejor de madrugada.", "la 09 · toma única.", "— n."]},

    { kind:'ticket', x:'3%', y:1260, big:'Sin ti me muero', row:'09 · LP01 · MADRID', row2:'ACTO III · ASFIXIA' },
    { kind:'ticket', x:'38%', y:1260, big:'Quererte es una enfermedad', row:'04 · LP01 · MADRID', row2:'ACTO I · FRICCIÓN' },
  ];
  return (
    <section className="section reveal" style={{paddingTop:40,paddingBottom:40}}>
      <Rail num="—" title="Álbum de recortes" aside="Lo que quedó al abrir el cajón. No todo pide ser mirado." />
      <div className="scrapbook">
        {items.map((it,i)=> {
          if(it.kind === 'poly'){
            return (
              <div key={i} className="scrap scrap--poly" style={{left:it.x,top:it.y,width:it.w,transform:`rotate(${it.r}deg)`}}>
                <span className="tape" style={{top:-12,left:'40%'}}/>
                <div className="scrap__img"><Still kind={it.img} tone={it.tone} motion={!!it.motion}/></div>
                <div className="scrap__cap">{it.cap}</div>
              </div>
            );
          }
          if(it.kind === 'letter'){
            return (
              <div key={i} className="scrap scrap--letter" style={{left:it.x,top:it.y,maxWidth:it.w||320,transform:`rotate(${it.r}deg)`}}>
                {it.text.map((ln,j)=>(
                  j===0 ? <span key={j} className="hand-big">{ln}</span> : <div key={j}>{ln}</div>
                ))}
              </div>
            );
          }
          if(it.kind === 'ticket'){
            return (
              <div key={i} className="scrap scrap--ticket" style={{left:it.x,top:it.y,transform:`rotate(${it.r||0}deg)`}}>
                <div>
                  <div>{it.row2 || ''}</div>
                  <div className="big">{it.big}</div>
                  <div>{it.row}</div>
                </div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontSize:32,color:'var(--rust)'}}>♪</div>
              </div>
            );
          }
          if(it.kind === 'strip'){
            return (
              <div key={i} className="scrap scrap--strip" style={{left:it.x,top:it.y,transform:`rotate(${it.r||-2}deg)`}}>
                {it.rows.map((r,j)=>(
                  <div key={j} className="scrap__img"><Still kind={r} tone={j%2?'sepia':'blue'} motion={j===1}/></div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

// === ALBUM feature ===
function AlbumSection({ ctl, albumTitle, author }){
  return (
    <section className="section reveal" id="disco" style={{paddingTop:40}}>
      <Rail num="03" title="El disco" aside="De principio a fin. Sin interrupciones. Sin explicación previa." />
      <div className="album">
        <div className="album__art">
          <Still kind="smoke" tone="sepia" motion={true}/>
          {/* darker scrim to make cover typography readable */}
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 40%, rgba(0,0,0,.55) 100%)',pointerEvents:'none'}}/>

          {/* top corner — catalogue */}
          <div style={{
            position:'absolute', top:22, left:24, right:24,
            display:'flex', justifyContent:'space-between',
            fontFamily:"'Special Elite',monospace", fontSize:10, color:'#e9ddbf',
            letterSpacing:'.28em', textTransform:'uppercase', opacity:.75,
            pointerEvents:'none',
          }}>
            <span>Pulmón Izquierdo</span>
            <span>LP 01 · MMXXVI</span>
          </div>

          {/* centered title block — Fraunces display, very wonky optical size */}
          <div style={{
            position:'absolute', inset:0, display:'grid', placeItems:'center',
            padding:'48px 28px', pointerEvents:'none',
          }}>
            <div style={{textAlign:'center', color:'#f2e6c4'}}>
              {/* Anatomía — huge, wide */}
              <div style={{
                fontFamily:"'Fraunces', 'Cormorant Garamond', serif",
                fontVariationSettings:"'opsz' 144, 'SOFT' 80, 'WONK' 1",
                fontWeight:400,
                fontSize:'clamp(56px, 9vw, 112px)',
                lineHeight:.88,
                letterSpacing:'-.025em',
                textTransform:'uppercase',
                textShadow:'0 2px 24px rgba(0,0,0,.55)',
              }}>Anatomía</div>

              {/* "de una" — filigree italic, centered rule lines */}
              <div style={{
                display:'flex', alignItems:'center', justifyContent:'center',
                gap:14, margin:'14px 0 10px',
                color:'#d9c49a',
              }}>
                <span style={{flex:'0 0 36px', height:1, background:'currentColor', opacity:.45}}/>
                <em style={{
                  fontFamily:"'Fraunces', serif",
                  fontVariationSettings:"'opsz' 48, 'SOFT' 100, 'WONK' 0",
                  fontWeight:300, fontStyle:'italic',
                  fontSize:'clamp(18px, 2vw, 28px)',
                  letterSpacing:'.08em',
                  textTransform:'lowercase',
                }}>de una</em>
                <span style={{flex:'0 0 36px', height:1, background:'currentColor', opacity:.45}}/>
              </div>

              {/* asfixia — italic, slightly lighter, decisive period */}
              <div style={{
                fontFamily:"'Fraunces', serif",
                fontVariationSettings:"'opsz' 144, 'SOFT' 100, 'WONK' 1",
                fontWeight:300, fontStyle:'italic',
                fontSize:'clamp(60px, 10vw, 128px)',
                lineHeight:.88,
                letterSpacing:'-.015em',
                color:'#e9bf82',
                textShadow:'0 2px 28px rgba(0,0,0,.6)',
              }}>
                asfixia<span style={{color:'#c96a3a'}}>.</span>
              </div>
            </div>
          </div>

          {/* bottom — two tiny mono lines + centered ornament */}
          <div style={{
            position:'absolute', left:24, right:24, bottom:20,
            display:'flex', justifyContent:'space-between', alignItems:'center',
            fontFamily:"'Special Elite',monospace", fontSize:10, color:'#d6c89e',
            letterSpacing:'.22em', textTransform:'uppercase', opacity:.8,
            pointerEvents:'none',
          }}>
            <span>doce cortes</span>
            <span style={{
              fontFamily:"'Fraunces',serif", fontSize:14, fontStyle:'italic',
              fontVariationSettings:"'opsz' 24, 'SOFT' 100, 'WONK' 0",
              letterSpacing:0, textTransform:'none', color:'#e9ddbf'
            }}>·</span>
            <span>autoeditado · madrid</span>
          </div>

          <span className="tape" style={{top:-12,left:'46%'}}/>
        </div>
        <div className="album__meta">
          <div className="kicker">primer LP · autoeditado · 2026</div>
          <h2>Anatomía<br/><em>de una</em> <span className="accent">asfixia</span>.</h2>
          <p>Doce canciones sobre el aire. Sobre el aire que había y <em>ya no está</em>. Sobre lo que se tarda en notar su ausencia. Se escribió en silencio; se grabó sin público. Lo firma una sola persona, pero son muchas las que lo hicieron —que a estas alturas <em>ya no están ni son las mismas</em>.</p>
          <button className="album__btn" onClick={()=>ctl.play(0)}>
            <Icon.Play size={10}/> escuchar el disco entero
          </button>
          <div className="album__specs">
            <div><span className="label">Publicación</span>2026 · autoeditado</div>
            <div><span className="label">Duración</span>52:39 · 12 cortes</div>
            <div><span className="label">Formatos</span>LP · CD · digital</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === MAKING OF — home-studio collage ===
function MakingOfSection(){
  return (
    <section className="section reveal" id="grabacion" style={{paddingTop:40, paddingBottom:24}}>
      <Rail num="—" title="El taller" aside="Donde se grabó. Nada que mirar, en realidad." />

      <div style={{
        display:'grid',
        gridTemplateColumns:'1.4fr 1fr 1fr',
        gridTemplateRows:'320px 260px',
        gap:20,
        maxWidth:1200, margin:'0 auto',
      }}>
        {/* big hero photo spanning 2 rows */}
        <div className="scrap scrap--poly" style={{position:'relative', gridRow:'1 / span 2', padding:10, paddingBottom:40, transform:'rotate(-1deg)'}}>
          <span className="tape" style={{top:-12,left:'44%'}}/>
          <div className="scrap__img" style={{aspectRatio:'3/4', height:'calc(100% - 40px)'}}>
            <Still kind="bandmate" tone="sepia" caption="cuarto vacío · vista desde el Roland"/>
          </div>
          <div className="scrap__cap">antes de tocar, después de tocar.</div>
        </div>

        {/* pedals — top right */}
        <div className="scrap scrap--poly" style={{position:'relative', padding:8, paddingBottom:34, transform:'rotate(2deg)'}}>
          <span className="tape" style={{top:-10,left:'40%'}}/>
          <div className="scrap__img" style={{height:'calc(100% - 34px)'}}>
            <Still kind="bwGear" tone="sepia" caption="lo visto desde el lado izquierdo"/>
          </div>
          <div className="scrap__cap">lo visto desde el lado izquierdo</div>
        </div>

        {/* wide studio */}
        <div className="scrap scrap--poly" style={{position:'relative', padding:8, paddingBottom:34, transform:'rotate(-2deg)'}}>
          <span className="tape" style={{top:-10,left:'50%'}}/>
          <div className="scrap__img" style={{height:'calc(100% - 34px)'}}>
            <Still kind="studioWide" tone="dust" caption="cuarto interior, sin ventana"/>
          </div>
          <div className="scrap__cap">la sala. no hay otra.</div>
        </div>

        {/* acoustic — small row */}
        <div className="scrap scrap--poly" style={{position:'relative', padding:8, paddingBottom:34, transform:'rotate(1.5deg)'}}>
          <span className="tape" style={{top:-10,left:'45%'}}/>
          <div className="scrap__img" style={{height:'calc(100% - 34px)'}}>
            <Still kind="acoustic" tone="sepia" caption="acústica · toma 1, sin compresor"/>
          </div>
          <div className="scrap__cap">sin red, sin plan.</div>
        </div>

        {/* keys top */}
        <div className="scrap scrap--poly" style={{position:'relative', padding:8, paddingBottom:34, transform:'rotate(-1.5deg)'}}>
          <span className="tape" style={{top:-10,left:'50%'}}/>
          <div className="scrap__img" style={{height:'calc(100% - 34px)'}}>
            <Still kind="keysTop" tone="sepia" caption="teclas · las manos no son mías"/>
          </div>
          <div className="scrap__cap">lo que queda al cerrar.</div>
        </div>
      </div>

      <div style={{
        maxWidth:720, margin:'32px auto 0', textAlign:'center',
        fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:22, lineHeight:1.5,
        color:'var(--ink-2)'
      }}>
        Grabado aquí. Sin monitores de cabina, sin plan previo. Con mal equipo y con equipazo.
        Con gente y con IA. Algunas en una toma; nadie tuvo ganas de repetirlas.
        La <em>12</em> se fue de las manos.
        <br/>Se quedó así.
      </div>
    </section>
  );
}

// === SHOWS ===
function ShowsSection(){
  return (
    <section className="section reveal" id="salas">
      <Rail num="04" title="En directo" aside="Ciudades, en general. Salas, las que aún queden." />
      <div className="shows">
        {SHOWS.map((s,i)=>(
          <div key={i} className={`ticket ${s.past?'past':''}`}>
            <div className="ticket__date">
              <span className="big">{s.date.split(' ')[1]}</span>
              {s.date.split(' ')[0]} · {s.year}
            </div>
            <div>
              <div className="ticket__venue">{s.venue}</div>
              <div className="ticket__city">{s.city}</div>
            </div>
            <button className="ticket__status">{s.status}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// === BIO (letter) ===
function BioSection({ author, bandName }){
  const tweaks = { bandName };
  return (
    <section className="section reveal" id="bio">
      <Rail num="05" title="Bio" aside="No es una biografía. Es una carta sin destinatario claro." />
      <div className="bio">
        <div>
          <div className="bio__photo">
            <span className="tape"/>
            <Still kind="bioGuitar" tone="sepia"/>
            <div className="bio__photo__label">— sin fecha</div>
          </div>
        </div>
        <div className="bio__letter">
          <div className="date">Madrid, primavera de 2026 — fecha imprecisa</div>
          <p><strong>{tweaks.bandName}</strong> es un proyecto para ordenar el olvido. Un nombre elegido, más que escogido: el izquierdo es el pulmón que se nota cuando algo va mal. No hay banda. Hay un cuarto.</p>
          <p>De este disco se habló poco mientras se hacía. No había con quién. <em>Hacía treinta años. Y ahora, esto.</em> Se pensó mal, se tocó peor, se escribió casi siempre de madrugada, sin urgencia de llegar a ninguna parte —que, al final, resulta ser la urgencia más seria de todas.</p>
          <p><em>Anatomía de una asfixia</em> trata de la ausencia como si fuera un idioma extranjero: con timidez, con errores, con la certeza de no llegar nunca del todo. Habla del aire que había y ya no está. De <em>lo que se tarda en notar</em>. De lo que no se arregla.</p>
          <p>Se grabó por partes. Con amigos. A solas. En una habitación pequeña. Con el equipo que quería fallar. La mayoría de las tomas son las únicas tomas. Hay ruidos de fondo que nadie se atrevió a borrar; hay versos que se perdieron por el camino; hay, también, alguna línea escrita por una máquina —a estas alturas, el silencio acepta cualquier mensajero.</p>
          <p>Gracias por haber venido hasta aquí. No hay nada más detrás de este texto.</p>
        </div>
      </div>
    </section>
  );
}

// === FOOTER (postcard back) ===
function Footer({ bandName, author, albumTitle }){
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <footer className="footer" id="contacto">
      {/* ── sello redondo de tinta, estilo sello de biblioteca ── */}
      <div aria-hidden style={{
        position:'absolute', top:26, right:28,
        width:150, height:150,
        transform:'rotate(-9deg)',
        mixBlendMode:'multiply',
        opacity:.78,
        filter:'contrast(1.15) url(#stamp-ink)',
      }}>
        <svg viewBox="0 0 160 160" width="150" height="150">
          <defs>
            {/* ruido para bordes rotos de la tinta */}
            <filter id="stamp-ink" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8"/>
            </filter>
            {/* trayectorias curvas para el texto */}
            <path id="arc-top"    d="M 22 80 A 58 58 0 0 1 138 80"  fill="none"/>
            <path id="arc-bottom" d="M 24 82 A 56 56 0 0 0 136 82"  fill="none"/>
          </defs>

          <g fill="none" stroke="#6e1e10" strokeWidth="2.6" strokeLinecap="round">
            {/* círculo exterior */}
            <circle cx="80" cy="80" r="68"/>
            {/* círculo interior */}
            <circle cx="80" cy="80" r="56" strokeWidth="1"/>
          </g>

          {/* texto curvo superior */}
          <text fill="#6e1e10" fontFamily="'Special Elite', monospace"
                fontSize="11" letterSpacing="3" fontWeight="700">
            <textPath href="#arc-top" startOffset="50%" textAnchor="middle">
              PULMÓN  ·  IZQUIERDO
            </textPath>
          </text>
          {/* texto curvo inferior (invertido para que no salga al revés) */}
          <text fill="#6e1e10" fontFamily="'Special Elite', monospace"
                fontSize="8" letterSpacing="4" fontWeight="700">
            <textPath href="#arc-bottom" startOffset="50%" textAnchor="middle">
              ★  AUTOEDITADO  ·  MADRID  ★
            </textPath>
          </text>

          {/* centro: línea separadora + año + sello */}
          <g fill="#6e1e10">
            <line x1="40" y1="76" x2="120" y2="76" stroke="#6e1e10" strokeWidth=".8"/>
            <line x1="40" y1="96" x2="120" y2="96" stroke="#6e1e10" strokeWidth=".8"/>
            <text x="80" y="92" textAnchor="middle"
                  fontFamily="'Fraunces', serif" fontStyle="italic" fontSize="15"
                  fontWeight="600">
              MMXXVI
            </text>
          </g>
        </svg>
      </div>
      <div className="footer__grid">
        <div>
          <h3>antes de que<br/><em>salga, o no salga.</em></h3>
          <form className="newsletter" onSubmit={e=>{e.preventDefault(); if(email) setSent(true);}}>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="un correo. el que se lee a solas." required/>
            <button type="submit">{sent ? 'anotado →' : 'anotar →'}</button>
          </form>
          <div style={{marginTop:18,fontFamily:"'Caveat',cursive",fontSize:22,color:'var(--ink-dim)',maxWidth:360,lineHeight:1.3}}>
            De vez en cuando, una canción. Casi nunca, un motivo. Nunca, un newsletter.
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
          <div className="footer__col">
            <h4>escuchar</h4>
            <ul>
              <li><a href="#">Spotify →</a></li>
              <li><a href="#">Apple Music →</a></li>
              <li><a href="#">Bandcamp →</a></li>
              <li><a href="#">YouTube Music →</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>ver</h4>
            <ul>
              <li><a href="#">YouTube →</a></li>
              <li><a href="#">Instagram →</a></li>
              <li><a href="#">TikTok →</a></li>
            </ul>
            <h4 style={{marginTop:22}}>contacto</h4>
            <ul>
              <li><a href="mailto:hola@nestorguerra.com">hola@nestorguerra.com</a></li>
              <li><a href="#">booking (ES / EU)</a></li>
              <li><a href="#">prensa ↓</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__colophon">
          <span>© {author} · <em style={{fontStyle:'italic'}}>{albumTitle}</em> · MMXXVI</span>
          <span>grabado del revés, firmado a mano</span>
          <span>letra y música por Néstor Guerra</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Chrome, HeroPostcard, HeroLetter, SoundsSection, LyricsSection, ScrapbookSection, AlbumSection, MakingOfSection, ShowsSection, BioSection, Footer });
