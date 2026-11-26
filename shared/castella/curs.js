/* Castellà · curs d'ortografia, gramàtica i comprensió (per al Mario i l'Oliver).
   Format: mira el comentari de dalt de shared/duo.js. min:6 = només per a 6è.
   Tot el contingut és en castellà. Ortografia segons la RAE (2010): solo, este, guion... sense titlla.
   Es para atenció especial als errors típics de qui parla català (b/v, h, ny/ñ, ll, titlles, catalanismes). */
(function(){
/* Textos de comprensió lectora (es reutilitzen en diverses preguntes) */
const TORTUGA="<p><b>La tortuga de Lucía</b></p><p>Lucía tiene una tortuga que se llama Galleta. Vive en una caja grande en el balcón, con agua, piedras y hojas de lechuga.</p><p>En invierno, Galleta casi no se mueve: duerme semanas enteras. La primera vez, Lucía se preocupó mucho, pero el veterinario le explicó que algunas tortugas hibernan cuando hace frío.</p><p>Cuando llega la primavera, Galleta se despierta con mucha hambre. ¡Entonces se come una hoja de lechuga entera en un momento!</p>";
const EXCURSION="<p><b>Excursión a la montaña</b></p><p>El sábado, la clase de cuarto fue de excursión a la montaña. Salieron del colegio a las ocho en autobús.</p><p>Subieron por un camino lleno de piedras. A mitad de camino, Marc se cansó y se sentó en una roca. Su amiga Aina le dio agua y un plátano, y siguieron subiendo juntos.</p><p>Arriba, comieron los bocadillos mirando el paisaje. Los pueblos de abajo parecían de juguete. Al volver, todos estaban agotados, pero muy contentos.</p>";
const JUDIA="<p><b>Cómo hacer crecer una judía</b></p><p>Necesitas: un vaso de yogur vacío, algodón, agua y una judía seca.</p><p>1. Moja el algodón y ponlo dentro del vaso.<br>2. Coloca la judía encima del algodón, pegada al borde.<br>3. Deja el vaso cerca de una ventana.<br>4. Riega un poco cada dos días.</p><p>Al cabo de unos días verás salir una raíz blanca. Después saldrá un tallo verde con hojas.</p>";
const NORA="<p><b>Silencio</b></p><p>Cuando Nora abrió la puerta, el comedor estaba en silencio. Las persianas estaban bajadas y no se oía nada. «Qué raro», pensó. «Mamá me ha dicho que volviera directamente después del entrenamiento».</p><p>Dejó la bolsa de deporte en el suelo y encendió la luz. De repente, veinte voces gritaron a la vez: «¡Felicidades!». Sus abuelos, sus primos y medio equipo de baloncesto salieron de detrás del sofá, con globos y gorros de colores.</p><p>Nora se quedó sin palabras. Luego miró a su madre, que sonreía con cara de culpable, y se echó a reír.</p>";
const ABEJAS="<p><b>Las abejas, pequeñas e imprescindibles</b></p><p>Las abejas son mucho más que insectos que pican. Cuando vuelan de flor en flor para alimentarse de néctar, transportan polen de una planta a otra. Este proceso, llamado <b>polinización</b>, permite que muchas plantas produzcan frutos y semillas.</p><p>Muchos de los alimentos que comemos, como las manzanas, las cerezas o los melones, dependen de los insectos polinizadores. Sin embargo, en los últimos años el número de abejas ha disminuido por culpa de los pesticidas, la pérdida de flores silvestres y el cambio climático.</p><p>Por eso, algunos ayuntamientos han empezado a dejar zonas de césped sin cortar, donde crecen flores silvestres que sirven de alimento a las abejas.</p>";
const PATIO="<p><b>Un patio sin pantallas</b></p><p>En nuestra escuela se está discutiendo si hay que prohibir los móviles en el patio. Yo creo que es una buena idea. En el patio deberíamos correr, hablar y jugar juntos, no mirar cada uno su pantalla.</p><p>Algunos compañeros dicen que el móvil sirve para avisar a los padres si pasa algo. Es verdad, pero en la escuela ya hay teléfono y los maestros pueden llamar a casa en cualquier momento.</p><p>Por todo esto, pienso que el patio debería ser una zona sin móviles.</p><p><i>Carla, 6.º B</i></p>";

window.CASTELLA=[

/* 1 ------------------------------------------------------------ */
{id:"bv",title:"La b y la v",sub:"suenan igual, se escriben distinto",img:"bus",
 learn:[
  {img:"bus",t:"Dos letras, un sonido",p:"En castellano la <b>b</b> y la <b>v</b> suenan exactamente igual. Por eso hay que aprender cómo se escribe cada palabra y fijarse en unas cuantas reglas.",
   ex:[["bueno · vaso","suenan igual al principio"],["caballo · nube","con b"],["invierno · nuevo","con v"]],
   tip:"Cuando dudes, piensa en otra palabra de la misma familia: <i>mover</i> → <b>móvil</b>."},
  {img:"pencil",t:"Se escriben con b",p:"<b>1.</b> Los verbos acabados en <b>-bir</b>: escribir, recibir, subir (excepto <b>hervir, servir y vivir</b>).<br><b>2.</b> Las terminaciones <b>-aba, -abas, -ábamos, -aban</b> del pasado de los verbos en -ar.<br><b>3.</b> Delante de consonante: <b>bl, br</b>.<br><b>4.</b> Las palabras que empiezan por <b>bu-, bur-, bus-</b>.",
   ex:[["escribir · subir","-bir"],["cantaba · jugábamos","-aba"],["blanco · brazo","bl, br"],["buzón · burro · buscar","bu-, bur-, bus-"]],
   tip:"¡Ojo! En catalán es <i>cantava</i>, con v. En castellano siempre <b>cantaba</b>."},
  {img:"snowflake",t:"Se escriben con v",p:"<b>1.</b> Después de <b>n</b>: invierno, enviar, invitar.<br><b>2.</b> Los adjetivos acabados en <b>-avo, -ava, -evo, -eva, -ivo, -iva</b>: octavo, nuevo, activa.<br><b>3.</b> Las formas del verbo <b>ir</b>: voy, vas, va, vamos, vais, van.",
   ex:[["invierno · enviar","nv"],["nuevo · activo","-evo, -ivo"],["voy · vamos","verbo ir"]],
   tip:"Delante de b nunca va n, va m: <b>hombre, cambiar</b>. Por eso después de n siempre viene v."},
  {img:"thinking",t:"¡Cuidado con el catalán!",p:"Muchas palabras se escriben con <b>b</b> en castellano y con <b>v</b> en catalán, o al revés.",
   ex:[["caballo","cavall"],["abuelo","avi"],["gobierno","govern"],["probar","provar"],["nube","núvol"],["móvil","mòbil"]],
   tip:"No copies la letra del catalán: ¡muchas veces es la contraria!"}
 ],
 ex:[
  {k:"pick",t:"Elige la palabra bien escrita",q:"Un animal que relincha:",a:"caballo",o:["cavallo","cavayo"],w:"En catalán es <i>cavall</i>, pero en castellano se escribe con <b>b</b>: <b>caballo</b>."},
  {k:"pick",q:"Mi abuela ___ galletas todos los domingos.",a:"preparaba",o:["preparava"],w:"El pasado de los verbos en -ar termina en <b>-aba</b>, siempre con b. En catalán es <i>preparava</i>, con v."},
  {k:"type",q:"Cuando éramos pequeños, ___ en la calle. (nosotros, jugar)",a:["jugábamos"],w:"<b>jugábamos</b>: con b (-ábamos) y con tilde, porque es esdrújula."},
  {k:"pick",q:"Voy a ___ una carta a mi tía.",a:"escribir",o:["escrivir","escrebir"],w:"Los verbos acabados en <b>-bir</b> se escriben con b: escribir, recibir, subir."},
  {k:"pick",q:"Cuando era pequeño, ___ en un pueblo.",a:"vivía",o:["bivía","vibía"],w:"<b>vivir</b> es una de las excepciones de -bir: se escribe con v las dos veces."},
  {k:"match",p:[["caballo","cavall"],["abuelo","avi"],["gobierno","govern"],["nube","núvol"],["probar","provar"]]},
  {k:"pick",q:"Mario es un niño muy ___: no para quieto.",a:"activo",o:["actibo"],w:"Los adjetivos acabados en <b>-ivo, -avo, -evo</b> van con v: activo, octavo, nuevo."},
  {k:"pick",q:"Mañana ___ a la piscina.",a:"vamos",o:["bamos"],w:"Todas las formas del verbo <b>ir</b> van con v: voy, vas, va, vamos, vais, van."},
  {k:"pick",q:"En ___ hace mucho frío.",a:"invierno",o:["imbierno","inbierno"],w:"Después de <b>n</b> se escribe <b>v</b>: invierno, enviar, invitar."},
  {k:"pick",q:"Me han regalado un ___ nuevo.",a:"móvil",o:["móbil","mòbil"],w:"En catalán es <i>mòbil</i>, con b, pero en castellano es <b>móvil</b>, con v, como <i>mover</i>."},
  {k:"type",q:"El cielo está lleno de ___ grises. (núvols)",a:["nubes"],w:"núvol → <b>nube</b>, con b."},
  {k:"pick",q:"Me gusta ___ zumo de naranja.",a:"beber",o:["bever","veber"],w:"<b>beber</b> lleva b las dos veces (en catalán, <i>beure</i>)."},
  {k:"order",s:"Mi abuelo tenía un caballo blanco.",x:["cavallo"]},
  {k:"order",s:"Ayer escribí una carta a mi prima.",x:["escriví"]},
  {k:"pick",q:"Gracias por tu ___.",a:"amabilidad",o:["amavilidad","amabilidat"],w:"Las palabras acabadas en <b>-bilidad</b> van con b: amabilidad, posibilidad. Excepciones: movilidad y civilidad.",min:6},
  {k:"pick",q:"El agua ___ a cien grados.",a:"hierve",o:["hierbe","ierve"],w:"<b>hervir</b> es una excepción de -bir: va con v. Y lleva h, como <i>hielo</i> o <i>hierro</i>.",min:6}
 ]},

/* 2 ------------------------------------------------------------ */
{id:"h",title:"La h",sub:"la letra que no suena",img:"house",
 learn:[
  {img:"house",t:"La letra muda",p:"La <b>h</b> no suena: se escribe, pero no se pronuncia. Por eso es fácil olvidarla.",
   ex:[["hola · hoy · hacer","se dice «ola», «oy», «acer»"],["hormiga · hielo","también con h"]],
   tip:"Que no suene no quiere decir que no esté. ¡Hay que verla!"},
  {img:"egg",t:"Reglas de la h",p:"<b>1.</b> Las palabras que empiezan por <b>hie-, hue-, hui-</b>.<br><b>2.</b> Las que empiezan por <b>hum-, horm-, herm-, hosp-</b>.<br><b>3.</b> Los verbos <b>haber, hacer, hablar, habitar</b> y todas sus formas.",
   ex:[["hielo · huevo · hueso","hie-, hue-"],["humo · hormiga · hermano · hospital","hum-, horm-, herm-, hosp-"],["hay · hizo · habló","haber, hacer, hablar"]]},
  {img:"fire",t:"Truco del catalán: f → h",p:"Muchas palabras que en catalán empiezan por <b>f</b>, en castellano empiezan por <b>h</b>.",
   ex:[["harina","farina"],["horno","forn"],["hilo","fil"],["hormiga","formiga"],["humo","fum"],["hierro","ferro"]],
   tip:"Pero al revés también hay trampas: catalán <i>hivern</i> → castellano <b>invierno</b>, ¡sin h!"},
  {img:"question",t:"¿a o ha? ¿hay, ahí o ay?",p:"<b>ha</b> es del verbo haber (ha comido). <b>a</b> es una preposición (voy a casa).<br><b>hay</b> es del verbo haber (hay un gato). <b>ahí</b> es un lugar (ponlo ahí). <b>¡ay!</b> es una queja (¡ay, qué daño!).",
   ex:[["Oliver ha ganado.","verbo haber"],["Vamos a jugar.","preposición"],["Hay pan ahí. ¡Ay!","haber · lugar · queja"]],
   tip:"Truco: si puedes cambiarlo por <i>han</i>, se escribe <b>ha</b>."}
 ],
 ex:[
  {k:"pick",q:"___ un gato en el tejado.",a:"Hay",o:["Ahí","Ay"],w:"<b>Hay</b> es del verbo haber: dice que algo existe."},
  {k:"pick",q:"¡___, qué daño me he hecho!",a:"Ay",o:["Hay","Ahí"],w:"<b>¡Ay!</b> es lo que decimos cuando algo nos duele."},
  {k:"pick",q:"Deja la mochila ___, encima de la silla.",a:"ahí",o:["hay","ay"],w:"<b>ahí</b> indica un lugar, como <i>aquí</i> o <i>allí</i>."},
  {k:"pick",q:"Mario ___ terminado los deberes.",a:"ha",o:["a"],w:"<b>ha</b> es del verbo haber. Truco: puedes decir <i>han terminado</i>, así que va con h."},
  {k:"pick",q:"Mañana vamos ___ la playa.",a:"a",o:["ha"],w:"Aquí no puedes decir <i>han la playa</i>: es la preposición <b>a</b>, sin h."},
  {k:"pick",t:"Elige la palabra bien escrita",q:"Lo pone la gallina:",a:"huevo",o:["uevo","güevo"],w:"Las palabras que empiezan por <b>hue-</b> llevan h: huevo, hueso, huerto."},
  {k:"type",q:"En invierno el agua del lago se convierte en ___. (gel)",a:["hielo"],w:"Las palabras que empiezan por <b>hie-</b> llevan h: hielo, hierba, hierro."},
  {k:"match",p:[["harina","farina"],["horno","forn"],["hilo","fil"],["hormiga","formiga"],["humo","fum"]]},
  {k:"type",q:"Papá mete el pastel en el ___. (forn)",a:["horno"],w:"forn → <b>h</b>orno. ¡Muchas palabras con f en catalán llevan h en castellano!"},
  {k:"pick",q:"En ___ nieva en la montaña.",a:"invierno",o:["hinvierno","hivierno"],w:"En catalán es <i>hivern</i>, con h, pero en castellano <b>invierno</b> no lleva h."},
  {k:"pick",q:"Esta tarde voy a ___ los deberes.",a:"hacer",o:["acer","haser"],w:"<b>hacer</b> y todas sus formas llevan h: hago, hizo, hecho."},
  {k:"pick",q:"Tengo que ___ con la profe.",a:"hablar",o:["ablar","havlar"],w:"<b>hablar</b> lleva h: hablo, hablas, habló."},
  {k:"order",s:"Mi hermano ha comido dos huevos.",x:["a"]},
  {k:"order",s:"Hay una hormiga en la hoja.",x:["Ahí"]},
  {k:"pick",q:"Ya he ___ los deberes.",a:"hecho",o:["echo"],w:"<b>hecho</b> (de hacer) lleva h. <b>echo</b>, sin h, es del verbo echar: <i>echo sal a la sopa</i>.",min:6},
  {k:"pick",q:"Siempre ___ un poco de sal a la ensalada.",a:"echo",o:["hecho"],w:"Aquí es el verbo <b>echar</b> (poner, tirar): <b>echo</b>, sin h.",min:6}
 ]},

/* 3 ------------------------------------------------------------ */
{id:"gj",title:"g, j, gu, gü",sub:"gato · guitarra · pingüino · jirafa",img:"giraffe",
 learn:[
  {img:"cat",t:"La g suave",p:"Con <b>a, o, u</b> la g suena suave: <b>ga, go, gu</b>. Pero con <b>e, i</b> necesita una <b>u</b> que no suena: <b>gue, gui</b>.",
   ex:[["gato · gota · gusano","ga, go, gu"],["guerra · guitarra","gue, gui: la u no suena"]]},
  {img:"penguin",t:"La diéresis: güe, güi",p:"Si la <b>u</b> de <i>gue, gui</i> sí que suena, le ponemos dos puntitos encima: la <b>diéresis</b> (¨).",
   ex:[["pingüino","pin-güi-no"],["cigüeña","ci-güe-ña"],["vergüenza","ver-güen-za"]],
   tip:"Compara: <i>guitarra</i> (la u no suena) y <i>pingüino</i> (la u sí suena)."},
  {img:"giraffe",t:"El sonido fuerte: j y g",p:"<b>ja, jo, ju</b> siempre con j. Pero <b>je, ji</b> y <b>ge, gi</b> suenan igual. Algunas reglas:<br>Con <b>g</b>: los verbos en <b>-ger, -gir</b> (coger, elegir) excepto tejer y crujir.<br>Con <b>j</b>: las palabras acabadas en <b>-aje</b> (viaje) y en <b>-jero, -jera</b> (cajera).",
   ex:[["gente · girasol","ge, gi"],["coger · elegir","-ger, -gir"],["viaje · garaje","-aje"],["extranjero · cajera","-jero, -jera"]]},
  {img:"plane",t:"Truco del catalán: -atge → -aje",p:"Las palabras que en catalán acaban en <b>-atge</b>, en castellano acaban en <b>-aje</b>, con j. Y ojo con la <i>girafa</i>.",
   ex:[["viaje","viatge"],["mensaje","missatge"],["paisaje","paisatge"],["garaje","garatge"],["jirafa","girafa"]]}
 ],
 ex:[
  {k:"pick",t:"Elige la palabra bien escrita",q:"Animal con el cuello muy largo:",a:"jirafa",o:["girafa","jiraffa"],w:"En catalán es <i>girafa</i>, pero en castellano es <b>jirafa</b>, con j."},
  {k:"pick",q:"Este verano haremos un ___ a Galicia.",a:"viaje",o:["viage","viatge"],w:"Las palabras acabadas en <b>-aje</b> van con j: viaje, garaje, paisaje."},
  {k:"type",q:"El coche está en el ___. (garatge)",a:["garaje"],w:"-atge en catalán → <b>-aje</b> en castellano: garaje."},
  {k:"pick",q:"El ___ vive en la Antártida.",a:"pingüino",o:["pinguino","pingüíno"],w:"La u de <b>güi</b> suena, por eso lleva diéresis: pin-<b>güi</b>-no."},
  {k:"pick",q:"Mi hermano toca la ___.",a:"guitarra",o:["gitarra","güitarra"],w:"Para que suene suave delante de i escribimos <b>gui</b>. La u no suena, así que no lleva diéresis."},
  {k:"pick",q:"Me da mucha ___ hablar delante de la clase.",a:"vergüenza",o:["verguenza","bergüenza"],w:"ver-<b>güen</b>-za: la u suena, lleva diéresis. Y empieza por v."},
  {k:"pick",q:"Hay mucha ___ en la plaza.",a:"gente",o:["jente","gent"],w:"<b>gente</b> se escribe con g (en catalán, <i>gent</i>)."},
  {k:"pick",q:"Tengo que ___ un color para pintar.",a:"elegir",o:["elejir","eligir"],w:"Los verbos acabados en <b>-gir</b> y <b>-ger</b> se escriben con g: elegir, coger, recoger."},
  {k:"match",p:[["viaje","viatge"],["mensaje","missatge"],["paisaje","paisatge"],["jirafa","girafa"],["jardín","jardí"]]},
  {k:"type",q:"Te he enviado un ___ por el móvil. (missatge)",a:["mensaje"],w:"missatge → <b>mensaje</b>: con n, con j y acabado en -aje."},
  {k:"type",q:"La ___ hace su nido en el campanario. (cigonya)",a:["cigüeña"],w:"ci-<b>güe</b>-ña: diéresis porque la u suena, y <b>ñ</b> donde el catalán pone ny."},
  {k:"order",s:"La jirafa come hojas del árbol.",x:["girafa"]},
  {k:"order",s:"Mi abuelo toca la guitarra en el jardín.",x:["gitarra"]},
  {k:"pick",q:"Ayer le ___ la verdad a mi madre.",a:"dije",o:["dige","dijé"],w:"Los pasados de <b>decir, traer, conducir</b> se escriben con j: dije, traje, conduje.",min:6},
  {k:"pick",q:"El mago hizo un truco de ___.",a:"magia",o:["majia","màgia"],w:"Las palabras acabadas en <b>-gia, -gio, -gión</b> van con g: magia, colegio, región. Y la tilde castellana es siempre ´.",min:6},
  {k:"pick",q:"Pierre es ___: vino de Francia.",a:"extranjero",o:["extrangero","estranjero"],w:"Las palabras acabadas en <b>-jero</b> van con j: extranjero, relojero. Y empieza por <b>ex-</b>.",min:6}
 ]},

/* 4 ------------------------------------------------------------ */
{id:"lly",title:"ll, y, ñ",sub:"lluvia · rey · montaña",img:"rain",
 learn:[
  {img:"rain",t:"ll e y",p:"Mucha gente pronuncia igual la <b>ll</b> y la <b>y</b>, así que hay que fijarse en cómo se escriben.<br>Con <b>y</b>: al final de palabra cuando suena i y no lleva tilde (rey, hoy, muy), y en formas como <i>cayó, leyó, oyó</i>.<br>Con <b>ll</b>: las palabras acabadas en <b>-illo, -illa, -ello, -ella</b>.",
   ex:[["rey · hoy · muy · estoy","y al final"],["pasillo · ardilla · botella","-illo, -illa, -ella"]],
   tip:"Si al final suena fuerte con tilde, va i: <b>reí, leí</b>."},
  {img:"book",t:"Trampa: ll del catalán",p:"Muchas palabras que en catalán empiezan por <b>ll</b>, en castellano empiezan por <b>l</b>.",
   ex:[["luna","lluna"],["libro","llibre"],["leche","llet"],["lobo","llop"],["lápiz","llapis"]],
   tip:"Y al revés: muchas palabras con ll en castellano empiezan en catalán por pl, cl o fl: <b>lluvia</b> (pluja), <b>llave</b> (clau), <b>llorar</b> (plorar), <b>llama</b> (flama)."},
  {img:"mountain",t:"La ñ",p:"Donde el catalán escribe <b>ny</b>, el castellano escribe <b>ñ</b>.",
   ex:[["año","any"],["montaña","muntanya"],["señor","senyor"],["bañar","banyar"],["piña","pinya"],["España","Espanya"]],
   tip:"La ñ es una sola letra. ¡Nunca escribas <s>ny</s> en castellano!"}
 ],
 ex:[
  {k:"pick",q:"Esta noche hay ___ llena.",a:"luna",o:["lluna","yuna"],w:"En catalán es <i>lluna</i>, pero en castellano es <b>luna</b>, con una sola l."},
  {k:"pick",q:"Estoy leyendo un ___ de piratas.",a:"libro",o:["llibro","llibre"],w:"llibre → <b>libro</b>, con l."},
  {k:"pick",q:"El ___ vive en el castillo.",a:"rey",o:["rei","reill"],w:"Al final de palabra, cuando suena i sin tilde, se escribe <b>y</b>: rey, hoy, muy."},
  {k:"pick",q:"___ no tengo deberes.",a:"Hoy",o:["Oy","Hoi"],w:"<b>Hoy</b>: con h al principio y con y al final."},
  {k:"pick",q:"Abre la puerta con la ___.",a:"llave",o:["yave","llabe"],w:"<b>llave</b>: con ll y con v (en catalán, <i>clau</i>)."},
  {k:"pick",q:"Coge una ___ de agua de la nevera.",a:"botella",o:["boteya","botela"],w:"Las palabras acabadas en <b>-ella, -illo, -illa</b> van con ll: botella, pasillo, ardilla."},
  {k:"pick",q:"Ayer mi hermano se ___ de la bici.",a:"cayó",o:["calló","cayo"],w:"<b>cayó</b> es del verbo caer. <i>calló</i> es del verbo callar (no hablar)."},
  {k:"match",p:[["año","any"],["montaña","muntanya"],["señor","senyor"],["bañar","banyar"],["piña","pinya"]]},
  {k:"type",q:"El ___ que viene iré a quinto. (any)",a:["año"],w:"Donde el catalán escribe <b>ny</b>, el castellano escribe <b>ñ</b>: año."},
  {k:"type",q:"Subimos a la ___ más alta. (muntanya)",a:["montaña"],w:"muntanya → <b>montaña</b>: con o y con ñ."},
  {k:"type",q:"Hoy no salimos porque ___ mucho. (llover)",a:["llueve"],w:"llover → <b>llueve</b>, <b>lluvia</b>: con ll."},
  {k:"type",q:"Me gusta mucho beber ___ con cacao. (llet)",a:["leche"],w:"llet → <b>leche</b>, con una sola l."},
  {k:"order",s:"Mi hermana se calló y no dijo nada.",x:["cayó"]},
  {k:"order",s:"El niño se baña en el río.",x:["banya"]},
  {k:"pick",q:"Mi primo ___ un cuento muy largo.",a:"leyó",o:["lleyó","leió"],w:"Los pasados de <b>leer, oír, caer, huir</b> llevan y: leyó, oyó, cayó, huyó.",min:6},
  {k:"pick",q:"¡___ golazo has marcado!",a:"Vaya",o:["Valla","Baya"],w:"<b>vaya</b>: exclamación o verbo ir. <b>valla</b>: una cerca. <b>baya</b>: un fruto pequeño.",min:6},
  {k:"pick",q:"El perro saltó la ___ del jardín.",a:"valla",o:["vaya","baya"],w:"Una <b>valla</b> es una cerca. <i>vaya</i> es del verbo ir y <i>baya</i> es un fruto.",min:6}
 ]},

/* 5 ------------------------------------------------------------ */
{id:"tilde",title:"Agudas, llanas y esdrújulas",sub:"las reglas de la tilde",img:"pencil",
 learn:[
  {img:"pencil",t:"La sílaba tónica",p:"En cada palabra hay una sílaba que suena más fuerte: la <b>sílaba tónica</b>. A veces lleva <b>tilde</b> (´) y a veces no.",
   ex:[["ca-<b>mión</b>","la última"],["<b>me</b>-sa","la penúltima"],["<b>pá</b>-ja-ro","la antepenúltima"]],
   tip:"En castellano la tilde es siempre así: <b>´</b>. Nunca <s>`</s> como en catalán."},
  {img:"rocket",t:"Agudas",p:"La sílaba tónica es la <b>última</b>. Llevan tilde si terminan en <b>vocal, n o s</b>.",
   ex:[["café · camión · compás","con tilde"],["reloj · papel · comer","sin tilde"]]},
  {img:"tent",t:"Llanas",p:"La sílaba tónica es la <b>penúltima</b>. Llevan tilde si <b>NO</b> terminan en vocal, n o s. ¡Justo al revés que las agudas!",
   ex:[["árbol · lápiz · fácil","con tilde"],["casa · examen · lunes","sin tilde"]]},
  {img:"star",t:"Esdrújulas",p:"La sílaba tónica es la <b>antepenúltima</b>. Llevan tilde <b>siempre</b>.",
   ex:[["pájaro · música · teléfono","siempre tilde"],["matemáticas · murciélago",""]],
   tip:"Ojo con el catalán: <i>anglès</i> → <b>inglés</b>, <i>també</i> → <b>también</b>, <i>arbre</i> → <b>árbol</b>."}
 ],
 ex:[
  {k:"match",p:[["aguda","ca-fé"],["llana","ár-bol"],["esdrújula","mú-si-ca"],["sílaba tónica","la que suena más fuerte"]]},
  {k:"pick",t:"¿Qué tipo de palabra es?",q:"ratón",a:"aguda",o:["llana","esdrújula"],w:"ra-<b>tón</b>: la sílaba fuerte es la última → aguda. Acaba en n → lleva tilde."},
  {k:"pick",t:"¿Qué tipo de palabra es?",q:"lápiz",a:"llana",o:["aguda","esdrújula"],w:"<b>lá</b>-piz: la penúltima → llana. Acaba en z → lleva tilde."},
  {k:"pick",t:"¿Qué tipo de palabra es?",q:"murciélago",a:"esdrújula",o:["llana","aguda"],w:"mur-<b>cié</b>-la-go: la antepenúltima → esdrújula. Siempre con tilde."},
  {k:"pick",q:"Mi profe de ___ es de Londres.",a:"inglés",o:["inglès","ingles"],w:"<b>in-glés</b> es aguda y acaba en s → tilde. Y en castellano la tilde es ´, no ` como en <i>anglès</i>."},
  {k:"pick",q:"Me he subido a un ___ muy alto.",a:"árbol",o:["arbol","àrbol"],w:"<b>ár</b>-bol es llana y acaba en l (no en vocal, n o s) → lleva tilde."},
  {k:"pick",q:"Hoy tenemos examen de ___.",a:"matemáticas",o:["matematicas","matemàticas"],w:"ma-te-<b>má</b>-ti-cas es esdrújula → tilde siempre, y con ´."},
  {k:"pick",q:"Mi ___ marca las cinco en punto.",a:"reloj",o:["relój"],w:"re-<b>loj</b> es aguda, pero acaba en j → <b>no</b> lleva tilde."},
  {k:"pick",q:"El ___ de ciencias es mañana.",a:"examen",o:["exámen","examén"],w:"e-<b>xa</b>-men es llana y acaba en n → <b>no</b> lleva tilde."},
  {k:"type",q:"Necesito un ___ para dibujar. (llapis)",a:["lápiz"],w:"<b>lá</b>-piz: llana acabada en z → tilde. Y con l, no ll."},
  {k:"type",q:"En el árbol canta un ___. (ocell)",a:["pájaro"],w:"<b>pá</b>-ja-ro es esdrújula: siempre con tilde."},
  {k:"type",q:"Mi mejor amigo ___ juega al fútbol. (també)",a:["también"],w:"tam-<b>bién</b>: aguda acabada en n → tilde ´."},
  {k:"order",s:"El camión rojo está en la calle.",x:["camion"]},
  {k:"order",s:"Mañana tengo examen de inglés.",x:["exámen"]},
  {k:"pick",q:"Esta semana tenemos dos ___.",a:"exámenes",o:["examenes","exámenés"],w:"<i>examen</i> no lleva tilde, pero en plural, e-<b>xá</b>-me-nes, es esdrújula → sí lleva.",min:6},
  {k:"pick",q:"Mi hermano tiene muy buen ___.",a:"carácter",o:["caracter","caràcter"],w:"ca-<b>rác</b>-ter: llana acabada en r → tilde. (En plural, ca-rac-<b>te</b>-res, ya no lleva.)",min:6}
 ]},

/* 6 ------------------------------------------------------------ */
{id:"palabras",title:"Sustantivo, adjetivo y verbo",sub:"género y número",img:"books",
 learn:[
  {img:"dog",t:"Sustantivo, adjetivo y verbo",p:"El <b>sustantivo</b> nombra personas, animales o cosas. El <b>adjetivo</b> dice cómo es el sustantivo. El <b>verbo</b> dice lo que se hace.",
   ex:[["perro · Oliver · mesa","sustantivos"],["grande · simpático · rojo","adjetivos"],["correr · come · jugamos","verbos"]],
   tip:"Los nombres propios (Mario, Barcelona) van con mayúscula."},
  {img:"people",t:"Género y número",p:"Los sustantivos y adjetivos tienen <b>género</b> (masculino o femenino) y <b>número</b> (singular o plural). El adjetivo concuerda con el sustantivo.",
   ex:[["el gato negro","masculino singular"],["las gatas negras","femenino plural"]],
   tip:"Plural: vocal → <b>-s</b> (casa, casas). Consonante → <b>-es</b> (árbol, árboles). z → <b>-ces</b> (lápiz, lápices)."},
  {img:"thinking",t:"Género distinto del catalán",p:"Algunas palabras tienen un género en castellano y otro en catalán.",
   ex:[["la nariz","el nas"],["la señal","el senyal"],["la costumbre","el costum"],["el olor","l'olor (femenino)"],["el valle","la vall"]]}
 ],
 ex:[
  {k:"pick",t:"¿Qué clase de palabra es?",q:"perro",a:"sustantivo",o:["adjetivo","verbo"],w:"<b>perro</b> nombra un animal → sustantivo."},
  {k:"pick",t:"¿Qué clase de palabra es?",q:"saltar",a:"verbo",o:["sustantivo","adjetivo"],w:"<b>saltar</b> es una acción → verbo (acaba en -ar)."},
  {k:"pick",t:"¿Qué clase de palabra es?",q:"simpática",a:"adjetivo",o:["sustantivo","verbo"],w:"<b>simpática</b> dice cómo es alguien → adjetivo."},
  {k:"pick",q:"¿Cuál es el adjetivo en «El gato negro duerme»?",a:"negro",o:["gato","duerme"],w:"<b>negro</b> dice cómo es el gato."},
  {k:"pick",q:"Las flores del jardín son muy ___.",a:"bonitas",o:["bonitos","bonita"],w:"<i>flores</i> es femenino plural → <b>bonitas</b>."},
  {k:"type",q:"un árbol → dos ___ (plural)",a:["árboles"],w:"Acaba en consonante → añadimos <b>-es</b>: árboles."},
  {k:"type",q:"un lápiz → tres ___ (plural)",a:["lápices"],w:"La z cambia a c: lápiz → <b>lápices</b>, pez → peces."},
  {k:"type",q:"el león → la ___ (femenino)",a:["leona"],w:"león → <b>leona</b>. ¡Y la tilde desaparece!"},
  {k:"pick",q:"Me pica ___ nariz.",a:"la",o:["el"],w:"En castellano <b>la nariz</b> es femenino (en catalán, <i>el nas</i>)."},
  {k:"pick",q:"Me encanta ___ olor de las galletas.",a:"el",o:["la"],w:"<b>el olor</b> es masculino en castellano (en catalán es femenino)."},
  {k:"pick",q:"El coche se paró en ___ señal de stop.",a:"la",o:["el"],w:"<b>la señal</b> es femenino en castellano (en catalán, <i>el senyal</i>)."},
  {k:"match",p:[["el actor","la actriz"],["el caballo","la yegua"],["el rey","la reina"],["el padre","la madre"],["el toro","la vaca"]]},
  {k:"order",s:"Los perros pequeños corren por el parque.",x:["pequeñas"]},
  {k:"order",s:"Mi hermana tiene unas zapatillas nuevas.",x:["nuevos"]},
  {k:"pick",q:"¿Qué clase de sustantivo es «manada»?",a:"colectivo",o:["propio","individual"],w:"<b>manada</b> nombra un grupo de animales aunque está en singular → colectivo. Otros: rebaño, enjambre, orquesta.",min:6},
  {k:"pick",q:"¿Cuál de estas palabras es un sustantivo abstracto?",a:"alegría",o:["mesa","perro"],w:"Los sustantivos abstractos nombran cosas que no se pueden ver ni tocar: alegría, miedo, amistad.",min:6}
 ]},

/* 7 ------------------------------------------------------------ */
{id:"verbos",title:"Presente, pasado y futuro",sub:"los tiempos del verbo",img:"clock",
 learn:[
  {img:"clock",t:"Tres conjugaciones",p:"Los verbos en infinitivo acaban en <b>-ar</b> (1.ª), <b>-er</b> (2.ª) o <b>-ir</b> (3.ª). Cambian según la persona: yo, tú, él/ella, nosotros, vosotros, ellos.",
   ex:[["cantar · comer · vivir","1.ª · 2.ª · 3.ª"],["yo canto, tú cantas, él canta","presente"],["nosotros cantamos, vosotros cantáis, ellos cantan",""]]},
  {img:"calendar",t:"El pasado",p:"Para algo que pasó y terminó: <b>canté, comí, viví</b>. Para describir cómo eran las cosas o lo que hacíamos a menudo: <b>cantaba, comía, vivía</b>.",
   ex:[["Ayer comí pizza.","pasó y terminó"],["De pequeño comía mucha fruta.","lo que hacía siempre"]],
   tip:"<b>comía, tenía, vivía</b> llevan tilde en la í. En catalán, <i>tenia</i> no lleva."},
  {img:"thinking",t:"¡Ojo con «vaig anar»!",p:"En catalán el pasado se dice <i>vaig anar</i>. En castellano, <b>voy a ir</b> es <b>futuro</b>. El pasado es <b>fui</b>.",
   ex:[["Ayer fui al cine.","vaig anar al cine"],["Mañana voy a ir al cine.","demà aniré al cine"]]},
  {img:"rocket",t:"El futuro",p:"Para lo que pasará: <b>cantaré, cantarás, cantará, cantaremos, cantaréis, cantarán</b>. También se puede decir <b>voy a cantar</b>.",
   ex:[["Mañana lloverá.","futuro"],["El sábado vamos a ir a la playa.","ir a + infinitivo"]]}
 ],
 ex:[
  {k:"pick",q:"Ayer ___ al cine con mi padre.",a:"fui",o:["voy a ir","iré"],w:"En catalán decimos <i>vaig anar</i>, pero en castellano el pasado es <b>fui</b>. «Voy a ir» es futuro."},
  {k:"pick",q:"Ayer ___ una pizza enorme.",a:"comí",o:["como","comeré"],w:"<i>Ayer</i> → pasado: <b>comí</b>, con tilde."},
  {k:"pick",q:"Mañana nosotros ___ a los abuelos.",a:"visitaremos",o:["visitábamos","visitaron"],w:"<i>Mañana</i> → futuro. <i>nosotros</i> → <b>visitaremos</b>."},
  {k:"pick",q:"Cuando era pequeño, ___ un perro que se llamaba Toby.",a:"tenía",o:["tenia","tendré"],w:"<b>tenía</b> lleva tilde en castellano (en catalán, <i>tenia</i>, sin tilde)."},
  {k:"type",q:"Cuando éramos pequeños, ___ mucho al parque. (ir, nosotros)",a:["íbamos"],w:"<b>íbamos</b>: esdrújula, lleva tilde. Y con b."},
  {k:"type",q:"Nosotros ___ en el coro del cole. (cantar, presente)",a:["cantamos"]},
  {k:"type",q:"Mañana ___ sol todo el día. (hacer, futuro)",a:["hará"],w:"Futuro de hacer: haré, harás, <b>hará</b>. Aguda acabada en vocal → tilde."},
  {k:"type",q:"Ayer Oliver ___ un gol precioso. (marcar, pasado)",a:["marcó"],w:"él <b>marcó</b>: aguda acabada en vocal → tilde."},
  {k:"match",p:[["yo","canto"],["tú","cantas"],["nosotros","cantamos"],["vosotros","cantáis"],["ellos","cantan"]]},
  {k:"pick",q:"¿En qué tiempo está «saltaremos»?",a:"futuro",o:["presente","pasado"],w:"<b>saltaremos</b> = lo haremos más adelante → futuro."},
  {k:"pick",q:"¿En qué tiempo está «bebí»?",a:"pasado",o:["presente","futuro"],w:"<b>bebí</b> = ya lo hice → pasado."},
  {k:"order",s:"Ayer fuimos al museo con la clase.",x:["vamos"]},
  {k:"order",s:"El año que viene iré a otro colegio.",x:["fui"]},
  {k:"pick",q:"Si tuviera dinero, me ___ una bici nueva.",a:"compraría",o:["compraré","compro"],w:"Con <i>si tuviera</i> va el condicional: <b>compraría</b>, con tilde en la í.",min:6},
  {k:"pick",q:"Cuando llegamos, la película ya ___.",a:"había empezado",o:["ha empezado","empezará"],w:"Algo que pasó antes de otra cosa pasada: <b>había empezado</b> (pretérito pluscuamperfecto).",min:6},
  {k:"pick",q:"Ojalá ___ buen tiempo mañana.",a:"haga",o:["hace","hará"],w:"Después de <i>ojalá</i> va el subjuntivo: <b>haga</b>.",min:6},
  {k:"pick",q:"El domingo ___ muchos kilómetros por la montaña.",a:"anduve",o:["andé","andí"],w:"<b>andar</b> es irregular en pasado: anduve, anduviste, anduvo. Nunca <s>andé</s>.",min:6}
 ]},

/* 8 ------------------------------------------------------------ */
{id:"nocat",title:"¡No lo digas en catalán!",sub:"sinónimos, antónimos y trampas",img:"thinking",
 learn:[
  {img:"hug",t:"Sinónimos y antónimos",p:"Los <b>sinónimos</b> significan lo mismo o casi lo mismo. Los <b>antónimos</b> significan lo contrario.",
   ex:[["contento = alegre","sinónimos"],["empezar = comenzar","sinónimos"],["alto ≠ bajo","antónimos"],["abrir ≠ cerrar","antónimos"]]},
  {img:"thinking",t:"Frases que se nos cuelan",p:"Algunas frases del catalán no se dicen igual en castellano.",
   ex:[["Mañana cumplo diez años.","no: hago diez años"],["Me duele la barriga.","no: me hace mal"],["Llaman a la puerta.","no: pican a la puerta"],["¡Ya voy!","no: ¡ya vengo!"],["Vamos a llegar tarde.","no: hacer tarde"],["¿Puedo usar tu goma?","no: hacer servir"]],
   tip:"Si te suena raro, piensa: ¿esto lo he oído en castellano o lo estoy traduciendo?"},
  {img:"sandwich",t:"Palabras de cada día",p:"Hay palabras muy distintas en cada idioma.",
   ex:[["calcetines","mitjons"],["fresa","maduixa"],["toalla","tovallola"],["escoba","escombra"],["merienda","berenar"],["vaso","got"]]},
  {img:"rabbit",t:"Se me ha caído",p:"Cuando van juntos <b>se</b> y <b>me</b> (o te, le), primero va <b>se</b>.",
   ex:[["Se me ha caído el lápiz.","no: me se ha caído"],["Se te ha olvidado la mochila.","no: te se"]]}
 ],
 ex:[
  {k:"match",p:[["contento","alegre"],["empezar","comenzar"],["bonito","precioso"],["rápido","veloz"],["enfadado","enojado"]]},
  {k:"match",p:[["alto","bajo"],["abrir","cerrar"],["ganar","perder"],["dentro","fuera"],["mucho","poco"]]},
  {k:"pick",q:"¿Cuál es el antónimo de «valiente»?",a:"cobarde",o:["fuerte","atrevido"],w:"Lo contrario de valiente es <b>cobarde</b>. <i>Atrevido</i> es casi un sinónimo."},
  {k:"pick",q:"Mañana mi hermana ___ diez años.",a:"cumple",o:["hace","fa"],w:"En catalán se dice <i>fa anys</i>, pero en castellano se dice <b>cumple años</b>."},
  {k:"pick",q:"No puedo comer más, me ___ la barriga.",a:"duele",o:["hace mal","fa mal"],w:"En castellano se dice <b>me duele</b> (en catalán, <i>em fa mal</i>)."},
  {k:"pick",q:"Alguien está ___ a la puerta.",a:"llamando",o:["picando"],w:"En castellano se <b>llama</b> a la puerta (en catalán, <i>picar a la porta</i>)."},
  {k:"pick",q:"Mamá me llama para cenar y yo contesto: «¡Ya ___!»",a:"voy",o:["vengo"],w:"Si vas hacia la persona que te llama, en castellano se dice <b>¡Ya voy!</b> (en catalán, <i>ja vinc</i>)."},
  {k:"pick",q:"Corre, que vamos a ___ tarde.",a:"llegar",o:["hacer"],w:"En castellano se dice <b>llegar tarde</b> (en catalán, <i>fer tard</i>)."},
  {k:"pick",q:"¿Me dejas ___ tus tijeras?",a:"usar",o:["hacer servir"],w:"<i>Fer servir</i> en castellano es <b>usar</b> o <b>utilizar</b>."},
  {k:"pick",q:"¡Uy! ___ ha caído el bocadillo.",a:"Se me",o:["Me se"],w:"Primero va <b>se</b> y luego <b>me</b>: se me ha caído, se te ha olvidado."},
  {k:"match",p:[["calcetines","mitjons"],["fresa","maduixa"],["toalla","tovallola"],["escoba","escombra"],["merienda","berenar"]]},
  {k:"type",q:"Me he puesto la ___ de mi equipo. (samarreta)",a:["camiseta"],w:"samarreta → <b>camiseta</b>."},
  {k:"order",s:"Mi hermano cumple doce años mañana.",x:["hace"]},
  {k:"order",s:"Me duele mucho la cabeza.",x:["hace","mal"]},
  {k:"pick",q:"___ más estudias, más aprendes.",a:"Cuanto",o:["Contra","Como"],w:"En castellano se dice <b>cuanto más</b>... más. Nunca <s>contra más</s> (en catalán, <i>com més</i>).",min:6},
  {k:"pick",q:"¡Oliver, ___ a tu habitación ahora mismo!",a:"ve",o:["ves"],w:"La orden del verbo <b>ir</b> es <b>ve</b> (o <i>vete</i>). <i>Ves</i> es del verbo ver: <i>tú ves la tele</i>.",min:6}
 ]},

/* 9 ------------------------------------------------------------ */
{id:"lectura4",title:"Comprensión lectora",sub:"leer y entender",img:"book",
 learn:[
  {img:"book",t:"Cómo leer un texto",p:"<b>1.</b> Lee el texto entero con calma.<br><b>2.</b> Lee bien la pregunta.<br><b>3.</b> Vuelve al texto a buscar la respuesta.",
   tip:"¡No contestes de memoria! Mira el texto todas las veces que haga falta."},
  {img:"owl",t:"Buscar pistas",p:"A veces la respuesta no está escrita tal cual. Hay que pensar con las pistas del texto.",
   ex:[["«Se puso el abrigo y la bufanda.»","pista: hace frío"],["«Volvió con las zapatillas llenas de barro.»","pista: ha llovido o ha pisado tierra mojada"]]}
 ],
 ex:[
  {k:"text",txt:TORTUGA,q:"¿Cómo se llama la tortuga?",a:"Galleta",o:["Lucía","Lechuga"]},
  {k:"text",txt:TORTUGA,q:"¿Por qué Galleta casi no se mueve en invierno?",a:"Porque hiberna cuando hace frío",o:["Porque está enferma","Porque no tiene comida"]},
  {k:"text",txt:TORTUGA,q:"¿Quién le explicó a Lucía lo que le pasaba a Galleta?",a:"el veterinario",alt:["veterinario","un veterinario","la veterinaria"]},
  {k:"text",txt:TORTUGA,q:"¿Cómo se siente Galleta al despertarse en primavera?",a:"Tiene mucha hambre",o:["Tiene mucho sueño","Tiene frío"]},
  {k:"text",txt:EXCURSION,q:"¿Cómo fueron a la montaña?",a:"En autobús",o:["En tren","A pie desde el colegio"]},
  {k:"text",txt:EXCURSION,q:"¿Qué hizo Aina cuando Marc se cansó?",a:"Le dio agua y un plátano",o:["Lo llevó en brazos","Llamó a la profesora"]},
  {k:"text",txt:EXCURSION,q:"¿Por qué los pueblos parecían «de juguete»?",a:"Porque desde arriba se veían muy pequeños",o:["Porque eran de plástico","Porque estaban en una tienda"]},
  {k:"text",txt:EXCURSION,q:"¿Qué significa «agotados»?",a:"Muy cansados",o:["Muy enfadados","Muy aburridos"]},
  {k:"text",txt:JUDIA,q:"¿Qué se pone primero dentro del vaso?",a:"Algodón mojado",o:["La judía","Tierra"]},
  {k:"text",txt:JUDIA,q:"¿Cada cuánto hay que regar?",a:"Cada dos días",o:["Cada día","Una vez por semana"]},
  {k:"text",txt:JUDIA,q:"¿Qué sale primero de la judía?",a:"Una raíz blanca",o:["Una flor","Un tallo verde con hojas"]},
  {k:"text",txt:JUDIA,q:"¿Para qué sirve este texto?",a:"Para explicar cómo hacer algo",o:["Para contar un cuento","Para dar una noticia"]},
  {k:"order",s:"Aina le dio agua a su amigo Marc.",x:["Lucía"]}
 ]},

/* 10 ----------------------------------------------------------- */
{id:"diacritica",title:"Diptongo, hiato y tilde diacrítica",sub:"día · él · tú · más",img:"point",min:6,
 learn:[
  {img:"point",t:"Diptongo",p:"Dos vocales en la <b>misma sílaba</b>: una abierta (a, e, o) con una cerrada (i, u) sin acento, o dos cerradas. Siguen las reglas normales de la tilde.",
   ex:[["cuen-to · pie-dra · ciu-dad","diptongos"],["can-ción · tam-bién","aguda en n → tilde"]]},
  {img:"snail",t:"Hiato",p:"Dos vocales en <b>sílabas distintas</b>. Si la vocal fuerte de la palabra es una <b>i</b> o una <b>u</b> junto a una a, e, o, lleva tilde <b>siempre</b>, aunque no lo pidan las reglas.",
   ex:[["dí-a · rí-o · pa-ís · ma-íz","hiato: tilde siempre"],["po-li-cí-a · e-ner-gí-a","¡en catalán sin tilde!"],["bú-ho","la h no impide el hiato"]],
   tip:"En catalán se escribe <i>policia, energia</i>. En castellano: <b>policía, energía</b>."},
  {img:"question",t:"Tilde diacrítica",p:"Los monosílabos no llevan tilde (<b>fue, dio, vio, fe, ti, guion</b>), salvo algunos que la llevan para distinguirse de otra palabra igual.",
   ex:[["él / el","Él vino. · El perro."],["tú / tu","Tú cantas. · Tu casa."],["mí / mi","Para mí. · Mi libro."],["sí / si","Dijo que sí. · Si llueve..."],["sé / se","No lo sé. · Se fue."],["té / te","Un té. · Te quiero."],["más / mas","Quiero más."]],
   tip:"<b>qué, cómo, dónde, cuándo, quién, cuánto</b> llevan tilde cuando preguntan o exclaman."},
  {img:"star",t:"Sin tilde (RAE)",p:"Según la RAE, <b>solo</b> y los demostrativos <b>este, ese, aquel</b> se escriben sin tilde. Y tampoco llevan tilde <b>fue, dio, vio, guion</b>.",
   ex:[["Estoy solo en casa.",""],["Solo quiero agua.",""],["Este es mi primo.",""]]}
 ],
 ex:[
  {k:"pick",q:"___ siempre llega tarde a clase.",a:"Él",o:["El"],w:"Aquí es una persona (pronombre) → <b>Él</b>, con tilde. <i>El</i> sin tilde va delante de un nombre: el perro."},
  {k:"pick",q:"¿Has visto ___ libro de cuentos?",a:"el",o:["él"],w:"Va delante de un nombre (libro) → artículo <b>el</b>, sin tilde."},
  {k:"pick",q:"¿Es ___ mochila la azul?",a:"tu",o:["tú"],w:"<b>tu</b> mochila: dice de quién es → sin tilde. <i>Tú</i> con tilde es la persona: tú cantas."},
  {k:"pick",q:"¿Este regalo es para ___?",a:"mí",o:["mi"],w:"Después de <i>para</i> es la persona → <b>mí</b>, con tilde. <i>Mi</i> sin tilde: mi casa."},
  {k:"pick",q:"Le pregunté si venía y me dijo que ___.",a:"sí",o:["si"],w:"<b>sí</b> de afirmar lleva tilde. <i>si</i> sin tilde pone una condición: si llueve, no salgo."},
  {k:"pick",q:"No ___ dónde he puesto las llaves.",a:"sé",o:["se"],w:"<b>sé</b> del verbo saber lleva tilde. <i>se</i> sin tilde: se fue."},
  {k:"pick",q:"Quiero ___ helado, por favor.",a:"más",o:["mas"],w:"<b>más</b> de cantidad lleva tilde. <i>mas</i> sin tilde significa «pero» y casi no se usa."},
  {k:"pick",q:"¿___ hora es?",a:"Qué",o:["Que"],w:"En las preguntas, <b>qué</b> lleva tilde."},
  {k:"pick",q:"El ___ pasa por el pueblo.",a:"río",o:["rio","riu"],w:"<b>rí-o</b> es hiato con i fuerte → tilde siempre."},
  {k:"pick",q:"La ___ ha cortado la calle.",a:"policía",o:["policia","polícia"],w:"po-li-<b>cí</b>-a: hiato → tilde. En catalán, <i>policia</i>, sin tilde."},
  {k:"pick",q:"Ayer Laura ___ al cine con su tío.",a:"fue",o:["fué"],w:"<b>fue</b> es un monosílabo: nunca lleva tilde. Igual que <i>dio, vio, fui</i>."},
  {k:"pick",q:"Lo he hecho yo ___, sin ayuda.",a:"solo",o:["sólo"],w:"Según la RAE, <b>solo</b> se escribe siempre sin tilde."},
  {k:"pick",t:"¿Diptongo o hiato?",q:"maíz",a:"hiato",o:["diptongo"],w:"ma-<b>íz</b>: la a y la í están en sílabas distintas → hiato (y por eso lleva tilde)."},
  {k:"type",q:"Hoy hace un ___ precioso. (dia)",a:["día"],w:"<b>dí-a</b>: hiato → tilde siempre. En catalán, <i>dia</i>, sin tilde."},
  {k:"type",q:"Por la noche, el ___ ulula en el bosque. (mussol)",a:["búho"],w:"<b>bú-ho</b>: hiato con u fuerte → tilde. La h en medio no cuenta."},
  {k:"order",s:"Él me preparó un té muy caliente.",x:["El","te"]}
 ]},

/* 11 ----------------------------------------------------------- */
{id:"oracion",title:"Sujeto y predicado",sub:"la oración y la concordancia",img:"people",min:6,
 learn:[
  {img:"people",t:"Sujeto y predicado",p:"La oración tiene <b>sujeto</b> (de quién se habla) y <b>predicado</b> (lo que se dice del sujeto). El núcleo del sujeto es un sustantivo o un pronombre; el núcleo del predicado, un verbo.",
   ex:[["<b>Los niños</b> juegan en el patio.","sujeto"],["Los niños <b>juegan en el patio</b>.","predicado"]]},
  {img:"thinking",t:"Cómo encontrar el sujeto",p:"Cambia el verbo a plural o a singular: la parte que también tiene que cambiar es el sujeto. ¡Puede estar al final!",
   ex:[["Me gusta <b>la fresa</b>. → Me gustan <b>las fresas</b>.","sujeto: la fresa"],["Fuimos al zoo.","sujeto omitido: nosotros"]],
   tip:"<i>Me</i> nunca es el sujeto."},
  {img:"trophy",t:"Concordancia",p:"El sujeto y el verbo concuerdan en <b>número</b> y <b>persona</b>.",
   ex:[["Me encantan los cómics.","no: me encanta los cómics"],["Había muchos niños.","no: habían muchos niños"],["Hubo dos tormentas.","no: hubieron"]],
   tip:"<b>Había, hubo, habrá</b> (de existir) van siempre en singular."},
  {img:"lion",t:"Predicado nominal y verbal",p:"Con <b>ser, estar, parecer</b> que dicen cómo es el sujeto, el predicado es <b>nominal</b>. Con los demás verbos, es <b>verbal</b>.",
   ex:[["Mi abuela es muy divertida.","nominal"],["Mi abuela cocina paella.","verbal"]]}
 ],
 ex:[
  {k:"pick",q:"¿Cuál es el sujeto de «Los niños juegan en el patio»?",a:"Los niños",o:["juegan","en el patio"],w:"¿Quién juega? <b>Los niños</b>."},
  {k:"pick",q:"¿Cuál es el sujeto de «Me encantan las películas de miedo»?",a:"las películas de miedo",o:["Me","yo"],w:"Si dices <i>Me encanta la película</i>, el verbo cambia con la película → sujeto: <b>las películas de miedo</b>."},
  {k:"pick",q:"¿Cuál es el predicado de «Mi perro come pienso»?",a:"come pienso",o:["Mi perro","pienso"],w:"El predicado es el verbo y lo que lo acompaña: <b>come pienso</b>."},
  {k:"pick",q:"¿Cuál es el núcleo del sujeto en «El gato gris de mi vecina duerme»?",a:"gato",o:["gris","vecina"],w:"El sujeto es <i>El gato gris de mi vecina</i>, y la palabra principal es <b>gato</b>."},
  {k:"pick",q:"¿Cuál es el sujeto de «Fuimos al zoo el domingo»?",a:"nosotros (omitido)",o:["el domingo","al zoo"],w:"<i>Fuimos</i> → <b>nosotros</b>. No está escrito, pero se sabe: sujeto omitido."},
  {k:"pick",q:"Me ___ mucho las fresas.",a:"gustan",o:["gusta"],w:"El sujeto es <i>las fresas</i> (plural) → <b>gustan</b>."},
  {k:"pick",q:"Ayer ___ muchos niños en la fiesta.",a:"había",o:["habían"],w:"<b>había</b> (de existir) va siempre en singular, aunque después haya un plural."},
  {k:"pick",q:"El año pasado ___ dos tormentas muy fuertes.",a:"hubo",o:["hubieron"],w:"<b>hubo</b>, siempre en singular. <s>Hubieron</s> es incorrecto aquí."},
  {k:"pick",q:"Mi hermana y yo ___ al mismo colegio.",a:"vamos",o:["van","va"],w:"<i>Mi hermana y yo</i> = nosotros → <b>vamos</b>."},
  {k:"type",q:"Los pájaros ___ en el árbol. (cantar, presente)",a:["cantan"],w:"<i>Los pájaros</i> = ellos → <b>cantan</b>."},
  {k:"type",q:"Tú y tu primo ___ muy altos. (ser, presente)",a:["sois"],w:"<i>Tú y tu primo</i> = vosotros → <b>sois</b>."},
  {k:"match",p:[["sujeto","de quién se habla"],["predicado","lo que se dice del sujeto"],["núcleo del predicado","el verbo"],["núcleo del sujeto","un sustantivo o pronombre"],["sujeto omitido","no está escrito, pero se sabe"]]},
  {k:"order",s:"Las nubes negras anuncian una tormenta.",x:["anuncia"]},
  {k:"order",s:"A mi hermano le encantan los dinosaurios.",x:["encanta"]},
  {k:"pick",q:"¿Qué tipo de predicado tiene «Mi abuela es muy divertida»?",a:"nominal",o:["verbal"],w:"Con <i>es</i> diciendo cómo es el sujeto → predicado <b>nominal</b>."},
  {k:"pick",q:"¿Qué tipo de predicado tiene «Mi abuela cocina paella»?",a:"verbal",o:["nominal"],w:"<i>cocina</i> es una acción → predicado <b>verbal</b>."}
 ]},

/* 12 ----------------------------------------------------------- */
{id:"lectura6",title:"Leer entre líneas",sub:"comprensión lectora",img:"owl",min:6,
 learn:[
  {img:"owl",t:"Lo que el texto no dice",p:"Un buen lector entiende también lo que no está escrito: une las pistas y saca conclusiones. Eso se llama <b>inferir</b>.",
   ex:[["«Entró empapado y dejó el paraguas roto en la puerta.»","Llueve mucho y hace viento."]],
   tip:"Pregúntate: ¿qué pistas me da el texto? ¿qué conclusión sale de ellas?"},
  {img:"books",t:"Tipos de texto",p:"<b>Narrativo</b>: cuenta una historia. <b>Informativo</b>: explica datos o hechos. <b>Instructivo</b>: dice cómo hacer algo. <b>De opinión</b>: defiende una idea con argumentos."},
  {img:"bulb",t:"La idea principal",p:"Es lo más importante del texto, lo que lo resume todo. Los detalles ayudan a explicarla, pero no son la idea principal.",
   tip:"Truco: intenta resumir el texto en una sola frase."}
 ],
 ex:[
  {k:"text",txt:NORA,q:"¿Qué están celebrando?",a:"El cumpleaños de Nora",o:["Que el equipo ha ganado un partido","El final del curso"]},
  {k:"text",txt:NORA,q:"¿Por qué la madre tenía «cara de culpable»?",a:"Porque había preparado la sorpresa en secreto",o:["Porque había roto algo","Porque había llegado tarde"]},
  {k:"text",txt:NORA,q:"¿Qué deporte practica Nora?",a:"baloncesto",alt:["el baloncesto","basket","básquet"]},
  {k:"text",txt:NORA,q:"¿Qué significa «se quedó sin palabras»?",a:"Se sorprendió tanto que no podía hablar",o:["Se olvidó de cómo se habla","Estaba enfadada y no quería hablar"]},
  {k:"text",txt:ABEJAS,q:"¿Cuál es la idea principal del texto?",a:"Las abejas son muy importantes para las plantas y los alimentos, y están en peligro",o:["Las abejas pican y son peligrosas","Los ayuntamientos cortan el césped en verano"]},
  {k:"text",txt:ABEJAS,q:"¿Qué es la polinización?",a:"Llevar polen de una planta a otra",o:["Fabricar miel en la colmena","Cortar las flores silvestres"]},
  {k:"text",txt:ABEJAS,q:"¿Por qué algunos ayuntamientos dejan césped sin cortar?",a:"Para que crezcan flores que alimentan a las abejas",o:["Para ahorrar agua","Para que los niños jueguen"]},
  {k:"text",txt:ABEJAS,q:"En el texto, «ha disminuido» quiere decir...",a:"ha bajado",o:["ha subido","se ha mantenido igual"]},
  {k:"text",txt:ABEJAS,q:"¿Qué tipo de texto es?",a:"Informativo",o:["Narrativo","Instructivo"]},
  {k:"text",txt:PATIO,q:"¿Qué opina Carla?",a:"Que los móviles deberían prohibirse en el patio",o:["Que todos los alumnos necesitan un móvil","Que el patio debería ser más grande"]},
  {k:"text",txt:PATIO,q:"¿Qué argumento dan los que no están de acuerdo con Carla?",a:"Que el móvil sirve para avisar a los padres",o:["Que el móvil sirve para estudiar","Que en el patio se aburren"]},
  {k:"text",txt:PATIO,q:"¿Cómo responde Carla a ese argumento?",a:"Dice que en la escuela ya hay teléfono",o:["Dice que los padres nunca contestan","Dice que no le importa"]},
  {k:"text",txt:PATIO,q:"¿Qué tipo de texto es?",a:"De opinión",o:["Una noticia","Un cuento"]},
  {k:"order",s:"Las abejas llevan el polen de flor en flor.",x:["lleva"]}
 ]}

];
})();
