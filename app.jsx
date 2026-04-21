// --- App root ---

function App(){
  const defaults = JSON.parse(
    document.getElementById('tweak-defaults').textContent.replace(/\/\*EDITMODE-(BEGIN|END)\*\//g,'')
  );
  const [tweaks, setTweaks] = useState(defaults);

  useEffect(()=>{
    document.documentElement.dataset.palette = tweaks.palette;
    document.body.classList.toggle('grain', !!tweaks.grain);
  },[tweaks.palette, tweaks.grain]);

  useEffect(()=>{
    const s = parseFloat(localStorage.getItem('ng_scroll'));
    if(!isNaN(s)) setTimeout(()=> window.scrollTo(0, s), 80);
    const onScroll = ()=> localStorage.setItem('ng_scroll', window.scrollY);
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  useReveal();
  const ctl = usePlayer();

  const heroProps = {
    bandName:   tweaks.bandName,
    albumTitle: tweaks.albumTitle,
    author:     tweaks.author,
    tagline:    tweaks.tagline,
    onPlay:     ()=> ctl.play(0),
  };
  const Hero = tweaks.heroMode === 'letter' ? HeroLetter : HeroPostcard;

  return (
    <>
      <Chrome bandName={tweaks.bandName} albumTitle={tweaks.albumTitle}/>
      <Hero {...heroProps}/>
      <SoundsSection ctl={ctl}/>
      <LyricsSection ctl={ctl}/>
      <ScrapbookSection/>
      <AlbumSection ctl={ctl} albumTitle={tweaks.albumTitle} author={tweaks.author}/>
      <MakingOfSection/>
      <BioSection author={tweaks.author} bandName={tweaks.bandName}/>
      <Footer bandName={tweaks.bandName} author={tweaks.author} albumTitle={tweaks.albumTitle}/>
      <Player ctl={ctl}/>
      <Tweaks tweaks={tweaks} setTweaks={setTweaks}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
