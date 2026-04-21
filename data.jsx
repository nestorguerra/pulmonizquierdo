// ---------- band data ----------
const ACTS = [
  {
    n: "I",
    title: "Las Leyes de la Fricción",
    kicker: "del contacto · del desgaste · de cómo se aprende a hacer daño sin querer",
    range: [0, 3],
    tone: "red",
    note: "aún no ha perdido la paciencia."
  },
  {
    n: "II",
    title: "Anatomía de tu Ausencia",
    kicker: "el forense del hueco · lo que queda en la almohada, en el pasillo, en la nevera",
    range: [4, 7],
    tone: "blue",
    note: "aquí se detiene. por si vuelves."
  },
  {
    n: "III",
    title: "La Mecánica de la Asfixia",
    kicker: "lo que hace el cuerpo cuando ya no se acuerda de respirar",
    range: [8, 11],
    tone: "dust",
    note: "no termina bien. eso no significa que termine mal."
  },
];

const TRACKS = [
  // ACTO I — Las Leyes de la Fricción
  { n: "01", act: "I",   title: "Son tus ojos",               titleAlt: ["Son","tus ojos"],               dur: "4:14", seconds: 254, mood: "hipnótico", key: "Am",  tempo: 92,  hue: 220, audio: "audio/01-son-tus-ojos.mp3" },
  { n: "02", act: "I",   title: "Mientes",                    titleAlt: ["Mientes"],                      dur: "3:42", seconds: 222, mood: "fricción",  key: "Dm",  tempo: 96,  hue: 22,  audio: "audio/02-mientes.mp3?v=4" },
  { n: "03", act: "I",   title: "Entra el aire",              titleAlt: ["Entra","el aire"],              dur: "4:36", seconds: 276, mood: "respirar",  key: "Am",  tempo: 88,  hue: 220, audio: "audio/03-entra-el-aire.mp3" },
  { n: "04", act: "I",   title: "Quererte es una enfermedad", titleAlt: ["Quererte es","una enfermedad"], dur: "4:54", seconds: 294, mood: "fiebre",    key: "Cm",  tempo: 82,  hue: 22, audio: "audio/04-quererte-es-una-enfermedad.mp3?v=2" },
  // ACTO II — Anatomía de tu Ausencia
  { n: "05", act: "II",  title: "De tus dulces bocados",      titleAlt: ["De tus dulces","bocados"],      dur: "5:02", seconds: 302, mood: "oscuro",    key: "D#m", tempo: 72,  hue: 22, audio: "audio/05-de-tus-dulces-bocados.mp3?v=2" },
  { n: "06", act: "II",  title: "Si ya no te tengo",          titleAlt: ["Si ya no","te tengo"],          dur: "5:16", seconds: 316, mood: "aliento",   key: "Em",  tempo: 68,  hue: 22 },
  { n: "07", act: "II",  title: "Por haberte perdido",        titleAlt: ["Por haberte","perdido"],        dur: "4:22", seconds: 262, mood: "duelo",     key: "Gm",  tempo: 76,  hue: 22,  audio: "audio/07-por-haberte-perdido.mp3" },
  { n: "08", act: "II",  title: "Y saber si eres mía",        titleAlt: ["Y saber","si eres mía"],        dur: "4:48", seconds: 288, mood: "abstinencia", key: "Dm",  tempo: 84,  hue: 22 },
  // ACTO III — La Mecánica de la Asfixia
  { n: "09", act: "III", title: "Sin ti me muero",            titleAlt: ["Sin ti","me muero"],            dur: "3:58", seconds: 238, mood: "pánico",    key: "Bm",  tempo: 118, hue: 22 },
  { n: "10", act: "III", title: "No llores más",              titleAlt: ["No llores","más"],              dur: "3:21", seconds: 201, mood: "catarsis",  key: "Em",  tempo: 112, hue: 22,  audio: "audio/10-no-llores-mas.mp3" },
  { n: "11", act: "III", title: "Un día",                     titleAlt: ["Un","día"],                     dur: "3:48", seconds: 228, mood: "explosión", key: "Fm",  tempo: 108, hue: 22 },
  { n: "12", act: "III", title: "De ti y de mí",              titleAlt: ["De ti","y de mí"],              dur: "4:08", seconds: 248, mood: "cierre épico", key: "F#m", tempo: 104, hue: 22, audio: "audio/12-de-ti-y-de-mi.mp3" },
];

const LYRICS = {
  "Son tus ojos":
`Pasa el tiempo que, viendo a este loco y no entiendo,
este tercio de mí,
esta parte infinita que ahora tengo por ti.
Que no quiero querer,
que sin ti ya no quiero
volver a querer.

Son tus ojos de plata,
es mi piel de hojalata.
Este loco perdido en el blanco hilo
de tus ojos.

Solo, son tus ojos,
los que quiero ver,
los que puedo ver.
Solo, son tus ojos,
los que quiero ver,
los que puedo ver.
Solo, son tus ojos,
los que quiero ver,
los que puedo ver.
Solo, son tus ojos,
los que quiero ver,
los que puedo ver.`,

  "Mientes":
`Has vendido tu alma al destino,
has huido sin dar explicación,
has cogido todo lo que has podido,
has perdido tu causa y tu razón.

Mientes,
cuando quieres y no quieres,
cuando rezas tu oración.
Mientes,
cuando sientes y no sientes,
en tu pobre condición.

Has creído que nada iba contigo,
has prohibido abrir tu corazón,
has servido a un juego sin sentido,
has herido a todo el que te amó.

Mientes,
cuando sientes y no quieres,
cuando rezas tu oración.
Mientes,
cuando quieres y no sientes,
en tu pobre condición.`,

  "Entra el aire":
`Entra el aire que respira,
el ser que a mi lado habita
y contagia transpiración.
A este cuerpo que solo puede pedir más pasión.

Entra fuerte bocanada,
del viento que levanta llagas,
que congela mi razón.
A este cuerpo que solo puede pedir más calor.

Y es que no puedo
vivir sin tu aliento,
perder ni un solo momento.
Y es que no dudo
que el soplo que cubro
es la vida que tengo

por ti.

Piel en cueros amarrados,
cuerpos que ya están pegados.
Ignorando el alrededor,
esperando que tu cuerpo pida más amor.

Suave roce de la brisa,
este amor que no tiene prisa.
Navegando en tu perdición,
esperando que tu cuerpo pida más unión.

Y es que no puedo
vivir sin tu aliento,
perder ni un solo momento.
Y es que no dudo
que el soplo que cubro
es la vida que tengo

por ti.`,

  "Quererte es una enfermedad":
`Dicen que quererte es una enfermedad
que tiende a matar,
que tus besos quitan la amarga saliva
como arena al mar.

Dicen que quererte es una enfermedad
que tiende a matar,
de tus ojos, pecado, eterno pasado,
para no recordar.

Quererte sería morirme día a día,
creyendo tus sucias y crueles mentiras.
Maldito mi fin, maldito el día que te conocí.
Porque sin ti no quiero vivir.
No quiero vivir.
No quiero vivir.

Dicen que quererte es una enfermedad
que tiende a matar,
lenta y suavemente, herida y corazón,
y vuelve a sangrar.

Dicen que quererte es una enfermedad
que tiende a matar,
mil puñales clavas, mortales palabras,
no podré curar.

Quererte sería morirme día a día,
creyendo tus sucias y crueles mentiras.
Maldito mi fin, maldito el día que te conocí.
Porque sin ti no quiero vivir.
No quiero vivir.
No quiero vivir.
No quiero vivir.`,

  "De tus dulces bocados":
`De tus dulces bocados
y amargos pasados,
que siempre están
rozando mi lado.
Embriagas mi llanto,
desnudas mi canto.

De tus dulces abrazos
y agrios olvidos,
que te perdieron
sin sentido.
Estremeces mi piel,
soledades envueltas
con tu ser.

Silencios llenos de tu voz,
fantasmas llenan mi alrededor.
Oscuridad a cada amanecer,
sin tu querer.

Dicen que huir es
falsa libertad
que quiero dar.
Hay que ser de madera,
piedra o sal.

Dicen que el que peca
ya no vuelve a amar
nunca más,
ni bien ni mal.
Estaré a tu vera,
en todas las primaveras.

Silencios llenos de tu voz,
fantasmas llenan mi alrededor.
Oscuridad a cada amanecer,
sin tu querer.`,

  "Si ya no te tengo":
`Tu blanca melodía
el día que no te tengo
esperando en la esquina
a ningún otro momento.

¡Ay! Si yo no te tengo
que mi voz silenciosa
se oiga en el firmamento.
¡Ay! Si ya no te tengo
que tu eterno recuerdo
retumbe aquí dentro.

Encontré entre los ojos
que se cruzan en mi aliento
a la sombra más oscura
a la sombra que no quiero.

¡Ay! Si yo no te tengo
que mi voz silenciosa
se oiga en el firmamento.
¡Ay! Si ya no te tengo
que tu eterno recuerdo
retumbe aquí dentro.

Y del miedo que se parte
en los trozos más pequeños
yo no quiero que me dejes
no te vayas muy lejos.

¡Ay! Si yo no te tengo
que mi voz silenciosa
se oiga en el firmamento.
¡Ay! Si ya no te tengo
que tu eterno recuerdo
retumbe aquí dentro.

Y del aire de mis recuerdos
que yo expulso desde dentro
respirando de tu aroma
manteniendo tu reflejo.

¡Ay! Si yo no te tengo
que mi voz silenciosa
se oiga en el firmamento.
¡Ay! Si ya no te tengo
que tu eterno recuerdo
retumbe aquí dentro.`,

  "Por haberte perdido":
`Intentando soportar
esta amarga soledad
de tu vacío.
Ese raro amanecer
de abrazar y no poder
tocar tu piel.

No volverás
a mirar atrás.
En el camino que separa mi destino
de tus besos y los míos.
De tu luz y tu calor,
de las lágrimas y el olvido
que quedaron por tenerte,
y por haberte perdido.

Esta dulce sensación
de alcohólica confusión
por mi sangre.
Que se altera si tú estás,
que se para si te vas,
de mi vera.

No volverás
a mirar atrás.
En el camino que separa mi destino
de tus besos y los míos.
De tu luz y tu calor,
de las lágrimas y el olvido
que quedaron por tenerte,
y por haberte perdido.`,

  "Y saber si eres mía":
`Nada tengo que ver,
nada puedo saber
de tu alma, mi vida,
de quererte otra vez,
de perderme en la orilla,
de tocarte la piel
y saber si eres mía
con miel y con hiel.

Y saber...
si eres mía.

No te pude querer,
no lo supe hacer bien.
Tuve tanto miedo,
me dolía perder.
Me podré arrepentir,
y de qué iba a servir.
Solo quiero que vengas
y empezar a vivir.

Y saber...
si eres mía.

Y ahora vuelvo a ti
con las manos llenas
de ilusiones vanas,
promesas eternas.

Y saber...
si eres mía...
mía...`,

  "Sin ti me muero":
`Sin ti me muero,
sin ti no puedo.
El aire que sin remedio
expulso de mis recuerdos.
La luz de la memoria
acariciando el suelo.
Mis besos desgastados
buscando tu consuelo.

Sin ti me muero,
sin ti no puedo.
Gritarte desde el destierro
todo lo que yo te siento.
No tengo tus miradas
en mi castigo eterno.
No llores más, vida mía,
que pronto nos tendremos.

Sin ti me muero,
sin ti no puedo.
El aire que sin remedio
expulso de mis recuerdos.`,

  "No llores más":
`No llores más,
que lo que no ha pasado, ya no pasará.
Que lo que no has probado de mí, no lo probarás.
No llores más.

Qué más te da,
si lo que has perdido, perdido está.
Si tus besos ya no conquistarán nada
de lo que yo te pueda dar.

Mira hacia atrás,
los recuerdos que no olvidarás.
Los momentos que ya no pasarán, jamás.
No llores más.

Qué más te da,
si lo que has perdido, perdido está.
Si tus besos ya no conquistarán nada
de lo que yo te pueda dar.`,

  "Un día":
`El color de tus ojos no importa,
me da igual que seas mía, me da igual que estés sola.
No me asusta no volverte a ver
y saber que hoy es la última vez.
Nada me importa ya, solo hazme volar.

De tu piel lo mismo que ayer,
y saber si me quieres o te dejas querer.
No me asusta verte llorar,
que me odies, mi vida, que me ames sin más.
Nada me importa ya, solo hazme volar.

Y si Dios me vuelve a buscar,
dile que ya es tarde, no me podrá atrapar.
Y marchar a ningún lugar,
en ningún momento donde esté el final.
Nada me importa ya, solo hazme volar.`,

  "De ti y de mí":
`De la misma razón que del frío al calor,
de que salga la luna y se ponga el sol,
de mucho, de poco, de nada y de todo,
de ti y de mí.

De los mil y un versos que te pude escribir,
de saber si te quiero o me queda por vivir,
de mucho, de poco, de nada y de todo,
de ti y de mí.

De tu querer
no hay que buscar
en otro momento,
en otro lugar.
De tu querer
rompe el cristal,
que hace la magia
y hace arena el mar.

De sentir el vacío y tenerte aquí,
de la lluvia en los ojos, tanto invierno sin fin,
de mucho, de poco, de nada y de todo,
de ti y de mí.

De la vida vivida y lo que ha de venir,
de lo que hemos sufrido y lo que hay que sufrir,
de mucho, de poco, de nada y de todo,
de ti y de mí.

De tu querer
no hay que buscar
en otro momento,
en otro lugar.
De tu querer
rompe el cristal,
que hace la magia
y hace arena el mar.

De la misma razón que del frío al calor,
de que salga la luna y se ponga el sol,
de mucho, de poco, de nada y de todo,
de ti y de mí...
de ti y de mí...
de ti y de mí.`,
};

const SHOWS = [
  { date: "May 02", year: "2026", city: "Madrid · ES",    venue: "Sala El Sol",        status: "a la venta" },
  { date: "May 09", year: "2026", city: "Barcelona · ES", venue: "La [2] d'Apolo",     status: "a la venta" },
  { date: "May 17", year: "2026", city: "Sevilla · ES",   venue: "Sala Malandar",      status: "últimas" },
  { date: "Jun 04", year: "2026", city: "Valencia · ES",  venue: "16 Toneladas",       status: "pronto" },
  { date: "Jun 11", year: "2026", city: "Bilbao · ES",    venue: "Kafé Antzokia",      status: "pronto" },
  { date: "Feb 14", year: "2026", city: "Zaragoza · ES",  venue: "Sala López",         status: "pasado", past:true },
  { date: "Ene 28", year: "2026", city: "Granada · ES",   venue: "Planta Baja",        status: "pasado", past:true },
];

const PRESS = [
  { quote: "Letras que pesan como piedras pequeñas en el bolsillo. No impiden andar, pero se notan.",  src: "Rockdelux" },
  { quote: "Canciones que no piden permiso para doler y, sin embargo, saben disimularlo.",             src: "Jenesaispop" },
  { quote: "Melódico, a veces amable, casi siempre ilegible. Un hallazgo que no se explica.",          src: "Mondo Sonoro" },
];

Object.assign(window, { ACTS, TRACKS, LYRICS, SHOWS, PRESS });
