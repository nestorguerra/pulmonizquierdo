// --- persistent tape-deck player — real <audio> if track has `audio`, else simulated progress ---

function usePlayer(){
  const [trackIdx, setTrackIdx]   = useState(-1);
  const [playing, setPlaying]     = useState(false);
  const [progress, setProgress]   = useState(0);  // seconds
  const [duration, setDuration]   = useState(0);  // seconds (from audio metadata when available)
  const [loadError, setLoadError] = useState(null);

  // one persistent <audio> element
  const audioRef = useRef(null);
  if(typeof Audio !== 'undefined' && !audioRef.current){
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';
    audioRef.current.crossOrigin = 'anonymous';
  }

  const track  = trackIdx >= 0 ? TRACKS[trackIdx] : null;
  const hasReal = !!(track && track.audio);

  // ---- restore persisted state ----
  useEffect(()=>{
    const s = localStorage.getItem('ng_player');
    if(s){
      try{
        const p = JSON.parse(s);
        if(typeof p.trackIdx === 'number') setTrackIdx(p.trackIdx);
        if(typeof p.progress === 'number') setProgress(p.progress);
      }catch(_){}
    }
  },[]);
  useEffect(()=>{
    localStorage.setItem('ng_player', JSON.stringify({ trackIdx, progress }));
  },[trackIdx, progress]);

  // ---- swap source when track changes ----
  useEffect(()=>{
    const a = audioRef.current;
    if(!a) return;
    setLoadError(null);
    if(track && track.audio){
      if(!a.src.endsWith(track.audio)){
        a.src = track.audio;
        a.currentTime = Math.min(progress, track.seconds || 0);
      }
      setDuration(track.seconds || 0);  // fallback until metadata loads
    } else {
      a.pause();
      a.removeAttribute('src'); a.load();
      setDuration(track ? track.seconds : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx]);

  // ---- attach listeners once ----
  useEffect(()=>{
    const a = audioRef.current;
    if(!a) return;
    const onTime = ()=> setProgress(a.currentTime);
    const onMeta = ()=> { if(isFinite(a.duration)) setDuration(a.duration); };
    const onEnd  = ()=> next();
    const onErr  = ()=> { setLoadError('no se pudo cargar'); setPlaying(false); };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnd);
    a.addEventListener('error', onErr);
    return ()=>{
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('error', onErr);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- play / pause sync ----
  useEffect(()=>{
    const a = audioRef.current;
    if(!a || !track) return;
    if(hasReal){
      if(playing){
        const p = a.play();
        if(p && p.catch) p.catch(()=> setPlaying(false));
      } else {
        a.pause();
      }
    }
  },[playing, hasReal, track]);

  // ---- simulated progress fallback (tracks without real audio) ----
  useEffect(()=>{
    if(hasReal || !playing || !track){ return; }
    let raf, last = performance.now();
    const step = (t)=>{
      const dt = (t - last)/1000; last = t;
      setProgress(p => {
        const n = p + dt;
        if(n >= (track.seconds||0)){ next(); return 0; }
        return n;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return ()=> cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[playing, track, hasReal]);

  const play = useCallback((i)=>{
    if(i !== trackIdx){
      setTrackIdx(i); setProgress(0);
      if(audioRef.current) audioRef.current.currentTime = 0;
    }
    setPlaying(true);
  },[trackIdx]);
  const toggle = useCallback(()=> setPlaying(p => !p), []);
  const next = useCallback(()=> { setTrackIdx(i => (i+1) % TRACKS.length); setProgress(0); setPlaying(true); }, []);
  const prev = useCallback(()=> { setTrackIdx(i => (i-1+TRACKS.length) % TRACKS.length); setProgress(0); setPlaying(true); }, []);
  const seek = useCallback((s)=> {
    const clamped = Math.max(0, Math.min(duration || 0, s));
    setProgress(clamped);
    if(hasReal && audioRef.current) audioRef.current.currentTime = clamped;
  }, [duration, hasReal]);

  return { trackIdx, track, playing, progress, duration, hasReal, loadError, play, toggle, next, prev, seek };
}

const fmtTime = (s)=>{
  if(!s && s !== 0) return '0:00';
  const m = Math.floor(s/60); const r = Math.floor(s%60);
  return `${m}:${String(r).padStart(2,'0')}`;
};

function Player({ ctl }){
  const { track, playing, progress, duration, hasReal, loadError, toggle, next, prev, seek } = ctl;
  const barRef = useRef(null);
  const pct = duration > 0 ? (progress/duration)*100 : 0;

  const onBar = (e)=>{
    if(!track) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    seek(Math.max(0, Math.min(1, x)) * duration);
  };

  if(!track){
    return (
      <div className="player" style={{opacity:.55}}>
        <div className="player__now">
          <div className="player__reel"/>
          <div className="player__text">
            <div className="t" style={{color:'#b09a78',fontStyle:'italic'}}>silencio previo.</div>
            <div className="s">sin señal</div>
          </div>
        </div>
        <div style={{textAlign:'center',fontFamily:"'Caveat',cursive",fontSize:22,color:'#b09a78'}}>
          elegir una canción ↑
        </div>
        <div className="player__right">
          <VU active={false}/>
          <span className="player__key">— · —</span>
        </div>
      </div>
    );
  }

  const tag = loadError
    ? loadError
    : (hasReal ? `pista ${track.n} · ${track.mood} · ${track.key}`
               : `pista ${track.n} · ${track.mood} · ${track.key} · demo no subido`);

  return (
    <div className={`player ${playing && hasReal?'spin':''}`}>
      <div className="player__now">
        <div className="player__reel"/>
        <div className="player__text">
          <div className="t">{track.title}</div>
          <div className="s">{tag}</div>
        </div>
      </div>
      <div className="player__controls">
        <div className="player__btns">
          <button className="player__btn" onClick={prev} aria-label="anterior"><Icon.Prev size={14}/></button>
          <button className="player__btn player__btn--play" onClick={toggle} aria-label="play/pausa">
            {playing ? <Icon.Pause size={16}/> : <Icon.Play size={16}/>}
          </button>
          <button className="player__btn" onClick={next} aria-label="siguiente"><Icon.Next size={14}/></button>
        </div>
        <div className="player__scrub">
          <span className="t">{fmtTime(progress)}</span>
          <div className="player__bar" ref={barRef} onClick={onBar}>
            <div className="player__bar__fill" style={{width:`${pct}%`}}/>
            <div className="player__bar__head" style={{left:`${pct}%`}}/>
          </div>
          <span className="t">{fmtTime(duration)}</span>
        </div>
      </div>
      <div className="player__right">
        <VU active={playing && hasReal}/>
        <span className="player__key">{track.tempo} BPM · {track.key}</span>
      </div>
    </div>
  );
}

Object.assign(window, { usePlayer, Player, fmtTime });
