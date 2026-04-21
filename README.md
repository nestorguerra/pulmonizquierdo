# Pulmón Izquierdo — *Anatomía de una asfixia*

Web del primer LP de **Pulmón Izquierdo** (proyecto de Néstor Guerra).
Doce canciones sobre el aire que había y ya no está. Madrid · MMXXVI.

🔗 **En producción:** https://nestorguerra.github.io/pulmonizquierdo/

---

## Stack

Sitio estático, sin build. Se abre directamente con cualquier HTTP server.

- **React 18** + **ReactDOM** vía CDN (unpkg)
- **Babel standalone** transpilando JSX en el navegador
- **Google Fonts**: Cormorant Garamond, Caveat, Special Elite, Fraunces (variable axes)
- **Medios**: MP3 locales, 1 vídeo local (`video/album-loop.mp4`), fotos propias + algunos vídeos ambientales de Pexels

## Estructura

```
index.html                 ← entry point (meta OG, fuentes, <script> loaders)
favicon.svg
styles.css                 ← paleta papel/tinta, tipografía, animaciones
data.jsx                   ← TRACKS, ACTS, LYRICS, PRESS
media.jsx                  ← catálogo MEDIA (fotos + vídeos) y TONES
components.jsx             ← hooks + iconos + Rail + VU meter
imagery.jsx                ← Still (foto tonada), AmbientVideo, MotionCard
player.jsx                 ← HTMLAudioElement persistente + UI pletina
sections.jsx               ← Chrome, Hero, Sounds, Lyrics, Scrapbook, Album, MakingOf, Bio, Footer
tweaks.jsx                 ← panel de ajustes (oculto en producción)
app.jsx                    ← root / enrutado de secciones
audio/                     ← MP3s de las pistas
video/album-loop.mp4       ← bucle del álbum
photos-nestor/             ← fotos propias (retratos, taller, scrapbook)
photos-nestor/guitar/      ← reel g01-g18 de guitarras/vida
```

## Desarrollo local

```bash
# cualquier servidor estático vale
python3 -m http.server 4717
# → http://127.0.0.1:4717/
```

## Despliegue

GitHub Pages servido desde `main / root`.

Cambios merge'ados a `main` se publican solos (Actions: `pages-build-deployment`).

## Notas técnicas

- **Cache-bust de scripts**: `?v=N` en `<script src="*.jsx?v=N">` dentro de `index.html` — súbelo si cambias JSX y quieres forzar a clientes antiguos a volver a transpilar.
- **Cache-bust de audio**: misma convención en `data.jsx` (`audio: "audio/02-mientes.mp3?v=4"`) por si subes una mezcla nueva con el mismo nombre.
- **Babel in browser**: aceptable para hosting estático, pero bloquea el TTI en ~1–1.5s. Si quieres optimizar, precompila a un único JS vía esbuild/vite y sustituye los `<script type="text/babel">` por uno solo compilado.

## Créditos

- Letra y música: **Néstor Guerra**
- Grabación: Vallecas, Madrid
- Fotos y diseño: proyecto
- Vídeos ambientales: [Pexels](https://www.pexels.com) (licencia libre)

© MMXXVI · Pulmón Izquierdo · Autoeditado
