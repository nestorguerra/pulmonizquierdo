// ---------- real-media catalogue ----------
// Only local photos (Néstor's own) for polaroids/scrapbook/bio/hero.
// Pexels videos only used as ambient motion layers behind other elements.

const P = "photos-nestor/"; // local photos root
const G = "photos-nestor/guitar/"; // guitar/studio photo reel

const MEDIA = {
  // ATMOSPHERE (ambient video only, no photo — these are only used behind typography)
  heart:      { vid: "https://videos.pexels.com/video-files/7195148/7195148-hd_1920_1080_30fps.mp4", tone: "red"   },
  // Album-cover loop: local clip (webvideofinal), tone matched to paper world.
  smoke:      { vid: "video/album-loop.mp4", tone: "sepia" },
  rain:       { img: G+"g01.jpg", vid: "https://videos.pexels.com/video-files/856129/856129-hd_1920_1080_30fps.mp4", tone: "blue"  },
  sea:        { img: G+"g18.jpg", vid: "https://videos.pexels.com/video-files/2519660/2519660-hd_1920_1080_24fps.mp4", tone: "blue" },

  // Néstor portrait / presence
  portrait:   { img: P+"nestor-portrait.jpg",  tone: "sepia" },
  mirror:     { img: P+"nestor-mirror.jpg",    tone: "sepia" },
  outdoor:    { img: P+"nestor-outdoor.jpg",   tone: "blue"  },

  // B/W distorted reel (new set) — always rendered in high-contrast monochrome
  bwPlane:    { img: P+"bw-studio-wide.jpg",   tone: "sepia", bw: "clean" },
  bwFlex:     { img: P+"bw-mirror-flex.jpg",   tone: "sepia", bw: true },
  bwGear:     { img: P+"gear-selfie.jpg",      tone: "sepia", bw: "clean" },
  bwChest:    { img: P+"bw-chest.jpg",         tone: "sepia", bw: "clean" },
  bioGuitar:  { img: P+"bio-guitar.jpg",       tone: "sepia", bw: "clean" },

  // Studio / making-of
  pedals:     { img: P+"pedals.jpg",           tone: "blue"  },
  acoustic:   { img: P+"guitar-acoustic.jpg",  tone: "sepia" },
  keysTop:    { img: P+"keys-top.jpg",         tone: "sepia" },
  bandmate:   { img: P+"bandmate-guitar.jpg?v=2",  tone: "sepia" },
  studioWide: { img: P+"studio-wide.jpg",      tone: "dust"  },
  room:       { img: P+"nestor-studio.jpg",    tone: "dust"  },

  // scrapbook additions — no distortion, toned like the rest
  playAcoustic:     { img: P+"play-acoustic.jpg",       tone: "sepia" },
  guitarMacro:      { img: P+"guitar-macro.jpg",        tone: "sepia", bw: "clean" },
  pedalboardAcoust: { img: P+"pedalboard-acoustic.jpg", tone: "blue"  },
  mirrorGibson:     { img: P+"mirror-gibson.jpg",       tone: "blue"  },
  marshallLesPaul:  { img: P+"marshall-lespaul.jpg",    tone: "sepia" },
  guitarLineup:     { img: P+"guitar-lineup.jpg",       tone: "sepia" },
  handOnGuitar:     { img: P+"hand-on-guitar.jpg",      tone: "sepia" },
  // same source as bwGear but in full color with a heavier vintage cast
  gearOverhead:     { img: P+"bw-gear.jpg",             tone: "sepia", vintage: true },

  // Guitar/life reel (replaces all Unsplash stock in polaroids)
  // Kinds are semantic — images are rotated from the guitar reel.
  eye:        { img: G+"g02.jpg",              tone: "sepia" },
  hand:       { img: G+"g03.jpg",              tone: "dust"  },
  curtain:    { img: G+"g04.jpg",              tone: "sepia" },
  flowers:    { img: G+"g05.jpg",              tone: "sepia" },
  letter:     { img: G+"g06.jpg",              tone: "sepia" },
  lung:       { img: G+"g07.jpg",              tone: "red"   },
  window:     { img: G+"g08.jpg",              tone: "dust"  },
  street:     { img: G+"g09.jpg",              tone: "blue"  },

  // Extra guitar slots available for future use
  g10: { img: G+"g10.jpg", tone: "sepia" },
  g11: { img: G+"g11.jpg", tone: "sepia" },
  g12: { img: G+"g12.jpg", tone: "dust"  },
  g13: { img: G+"g13.jpg", tone: "blue"  },
  g14: { img: G+"g14.jpg", tone: "sepia" },
  g15: { img: G+"g15.jpg", tone: "dust"  },
  g16: { img: G+"g16.jpg", tone: "sepia" },
  g17: { img: G+"g17.jpg", tone: "blue"  },

  candle:     { vid: "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4", tone: "red"   },
  grain:      { vid: "https://videos.pexels.com/video-files/5752729/5752729-hd_1920_1080_30fps.mp4", tone: "sepia" },
};

// Tonal overlay per palette key — tints photos to match the paper/ink world.
const TONES = {
  sepia:  { bg:"#2a1f14", mix:"rgba(42,31,20,.35)",  hue: 30  },
  blue:   { bg:"#0f1820", mix:"rgba(15,24,32,.45)",  hue: 210 },
  dust:   { bg:"#221a14", mix:"rgba(34,26,20,.35)",  hue: 35  },
  red:    { bg:"#200f0a", mix:"rgba(32,15,10,.45)",  hue: 10  },
  moss:   { bg:"#14180f", mix:"rgba(20,24,15,.4)",   hue: 80  },
  bruise: { bg:"#1a0f1e", mix:"rgba(26,15,30,.4)",   hue: 290 },
};

Object.assign(window, { MEDIA, TONES });
