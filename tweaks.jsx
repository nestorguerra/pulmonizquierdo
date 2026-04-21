// Tweaks panel

function Tweaks({ tweaks, setTweaks }){
  const [visible, setVisible] = useState(false);

  useEffect(()=>{
    const onMsg = (e)=>{
      const d = e.data || {};
      if(d.type === '__activate_edit_mode') setVisible(true);
      if(d.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type:'__edit_mode_available'},'*');
    return ()=> window.removeEventListener('message', onMsg);
  },[]);

  const update = (patch)=>{
    setTweaks(t => ({...t, ...patch}));
    window.parent.postMessage({type:'__edit_mode_set_keys', edits: patch},'*');
  };

  if(!visible) return null;

  const palettes = [
    { key:'paper',  label:'papel',  c1:'#efe7d6', c2:'#8b2a1a' },
    { key:'night',  label:'noche',  c1:'#15110c', c2:'#d95a3a' },
    { key:'sepia',  label:'sepia',  c1:'#e0cda5', c2:'#6e2410' },
    { key:'bruise', label:'morado', c1:'#d9d0dc', c2:'#6a2d4b' },
    { key:'sea',    label:'mar',    c1:'#dfe0d5', c2:'#2b4a5e' },
  ];

  const heroModes = [
    { key:'postcard', label:'postal' },
    { key:'letter',   label:'carta' },
  ];

  return (
    <div className="tweaks">
      <h3>ajustes</h3>

      <div className="tweaks__row">
        <label>nombre en portada</label>
        <input type="text" value={tweaks.bandName} onChange={e=>update({bandName:e.target.value})}/>
      </div>

      <div className="tweaks__row">
        <label>título del disco</label>
        <input type="text" value={tweaks.albumTitle} onChange={e=>update({albumTitle:e.target.value})}/>
      </div>

      <div className="tweaks__row">
        <label>frase de entrada</label>
        <input type="text" value={tweaks.tagline} onChange={e=>update({tagline:e.target.value})}/>
      </div>

      <div className="tweaks__row">
        <label>paleta</label>
        <div className="tweaks__swatches">
          {palettes.map(p => (
            <button key={p.key}
              title={p.label}
              className={`tweaks__swatch ${tweaks.palette===p.key?'active':''}`}
              onClick={()=>update({palette:p.key})}
              style={{background:`linear-gradient(135deg, ${p.c1} 60%, ${p.c2} 60%)`}}/>
          ))}
        </div>
      </div>

      <div className="tweaks__row">
        <label>portada</label>
        <div className="tweaks__segs">
          {heroModes.map(m => (
            <button key={m.key}
              className={tweaks.heroMode===m.key?'active':''}
              onClick={()=>update({heroMode:m.key})}>{m.label}</button>
          ))}
        </div>
      </div>

      <div className="tweaks__row">
        <div className="tweaks__toggle">
          <label>grano de película</label>
          <button className={tweaks.grain?'on':''} onClick={()=>update({grain:!tweaks.grain})}/>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Tweaks });
