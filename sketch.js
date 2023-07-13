//-------CONFIGURACION----

let AMP_MIN = 0.07; // umbral mínimo de amplitud. Señal que supera al ruido de fondo

//-----ENTRADA DE AUDIO----
let mic;

//-----AMPLITUD----

let amp;
let haySonido = false;
let subioelVolumen;
let umbral = 0.2; //Medida de amplitud para cambiar de color cuando detecta aplausos o ruidos similares

//-----PINCELADAS----
let tam = 25; //cantidad de pinceladas por capa
let pincelada0 = [];
let pincelada1 = [];
let pincelada2 = [];
let pincelada3 = [];
let pincelada4 = [];

//-----CAPAS,IMAGENES,PGRAPHICS----
let lienzo; 
let capa;

let marrones = [];
let naranjas = [];
let amarillos = [];
let colores = [];
let cuadrados;

let grafico = [];
let copia; 

//-----CAMBIO DE COLORES----
let colorAmarillos;
let colorColores;
let colorMarrones1;
let colorNaranjas;
let colorMarrones2;

//------CLASIFICADOR-----
let classifier;
const options = { probabilityThreshold: 0.9 };
let label;
let etiqueta;
const classModel = "https://teachablemachine.withgoogle.com/models/AWOQJGwws/"; //url del modelo producido con Teachable Machine


function preload() {
  //-----Background-----
  lienzo = loadImage("img/fondo.jpg");

  //-----Pinceladas-----
  for (let i = 0; i < 8; i++) {
    marrones[i] = loadImage("img/marron-" + i + ".jpg");
  }
  for (let i = 0; i < 5; i++) {
    amarillos[i] = loadImage("img/amarillo-" + i + ".jpg");
  }
  for (let i = 0; i < 7; i++) {
    naranjas[i] = loadImage("img/naranja-" + i + ".jpg");
  }
  for (let i = 0; i < 7; i++) {
    colores[i] = loadImage("img/color-" + i + ".jpg");
  }

  //------CLASIFICADOR-----
  classifier = ml5.soundClassifier(classModel + "model.json", options);
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  image(lienzo, 0, 0, width, height);

  mic = new p5.AudioIn();
  mic.start();
  userStartAudio(); // Esto hace un reset del motor de audio (audio context)

  for (let i = 0; i < 5; i++) {
    grafico[i] = createGraphics(width, height);
  }

  for (let i = 0; i < tam; i++) {
    pincelada0.push(new Pincelada());
    pincelada1.push(new Pincelada());
    pincelada2.push(new Pincelada());
    pincelada3.push(new Pincelada());
    pincelada4.push(new Pincelada());
  }
  cuadrados = new Cuadrados();

  capa = 0;

  colorAmarillos = floor(random(0, 5));
  colorColores = floor(random(0, 7));
  colorMarrones1 = floor(random(0, 8));
  colorNaranjas = floor(random(0, 7));
  colorMarrones2 = floor(random(0, 8));

  //------CLASIFICADOR-----
  classifier.classify(gotResult);
}

function draw() {
  amp = mic.getLevel();

  haySonido = amp > AMP_MIN;
  let diferenciaVolumen = amp - subioelVolumen;

  //-----CAPA 0-----
  if (capa == 0) {
    pintar(pincelada0, amarillos, colorAmarillos);
  }

  cambiaCapa(pincelada0, 1);

  //-----CAPA 1-----
  if (capa == 1) {
    pintar(pincelada1, colores, colorColores);
  }

  cambiaCapa(pincelada1, 2);

  //-----CAPA 2-----
  if (capa == 2) {
    pintar(pincelada2, marrones, colorMarrones1);
  }

  cambiaCapa(pincelada2, 3);

  //-----CAPA 3-----
  if (capa == 3) {
    pintar(pincelada3, naranjas, colorNaranjas);
  }

  cambiaCapa(pincelada3, 4);

  //-----CAPA 4-----
  if (capa == 4) {
    pintar(pincelada4, marrones, colorMarrones2);
  }

  cambiaCapa(pincelada4, 5);

//-----CUADRADOS-----
  if (capa == 0 && pincelada0[0].posY >= 1) {
    cuadrados.dibujar();
  } else if (capa == 1) {
    cuadrados.dibujar2();
  } else if (capa == 2) {
    cuadrados.dibujar3();
  } else if (capa >= 3) {
    cuadrados.dibujar4();
  }

//-----CAPA 5-----
  if (capa == 5) {
    cuadrados.mover(haySonido);
  }

  subioelVolumen = amp;

  //--------CLASIFICADOR------

  if (label == "Silenciar") {
    reiniciar();
    label = "";
  } else if ((haySonido && diferenciaVolumen > umbral) || label == "Aplauso") {
    cambiaColor();
    label = "";
  }

  if (haySonido) {
    console.log(amp);
  }

}

//-----Función del Teachable Machine-----
function gotResult(error, results) {
  if (error) {
    console.error(error);
  }

  label = results[0].label;
  etiqueta = label;
  console.log(results[0].label);
}

//-----Función para volver a elegin una imagen (color) en cada capa-----
function cambiaColor() {
  if (capa == 0) {
    colorAmarillos = floor(random(0, 5));
  } else if (capa == 1) {
    colorColores = floor(random(0, 7));
  } else if (capa == 2) {
    colorMarrones1 = floor(random(0, 8));
  } else if (capa == 3) {
    colorNaranjas = floor(random(0, 7));
  } else if (capa == 4) {
    colorMarrones2 = floor(random(0, 8));
  }
}

//-----Función para llamar a las pinceladas-----
function pintar(numPincelada, colorImagen, eleccionImagen) {

  for (let i = 0; i < tam; i++) {
    if (haySonido) {
      numPincelada[i].dibujarGrafico(grafico[capa]);
    }
  }
  copia = colorImagen[eleccionImagen].get();
  copia.mask(grafico[capa]);
  image(copia, 0, 0, width, height);

}

//-----Función para pasar a la siguiente capa-----
function cambiaCapa(numPincelada, numCapa) {
  if (numPincelada[0].posY >= height) {
    capa = numCapa;
  }
}

//-----Reinicio-----
function reiniciar() {
  image(lienzo, 0, 0, width, height);

  for (let i = 0; i < 5; i++) {
    grafico[i] = createGraphics(width, height);
  } 

  pincelada0 = [];
  pincelada1 = [];
  pincelada2 = [];
  pincelada3 = [];
  pincelada4 = []; 

  for (let i = 0; i < tam; i++) {
    pincelada0.push(new Pincelada());
    pincelada1.push(new Pincelada());
    pincelada2.push(new Pincelada());
    pincelada3.push(new Pincelada());
    pincelada4.push(new Pincelada());
  }

  cuadrados = new Cuadrados();

  capa = 0;

  cambiaColor();
}


