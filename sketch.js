//-------CONFIGURACION----

let AMP_MIN = 0.05; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let IMPRIMIR = false;

//-----ENTRADA DE AUDIO----
let mic;

//-----AMPLITUD----

let amp;
let haySonido = false;
let subioelVolumen;
let umbral = 0.1;

//-----PINCELADAS----
let tam = 20;
let pincelada0 = [];
let pincelada1 = [];
let pincelada2 = [];
let pincelada3 = [];
let pincelada4 = [];
let tr = 80; //transparencia de caminantes


//-----CAPAS e IMAGENES----
let cuadrados;
let lienzo;
let capa;
let marrones = [];
let naranjas = [];
let amarillos = [];
let colores = [];
let grafico = [];

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
const classModel = 'https://teachablemachine.withgoogle.com/models/SinBwQf_x/'; //url del modelo producido con Teachable Machine


function preload() {
  lienzo = loadImage('img/lienzo.jpg');
  for (let i = 0; i < 8; i++) {
    marrones[i] = loadImage('img/marron-' + i + '.jpg');
  }
  for (let i = 0; i < 5; i++) {
    amarillos[i] = loadImage('img/amarillo-' + i + '.jpg');
  }
  for (let i = 0; i < 7; i++) {
    naranjas[i] = loadImage('img/naranja-' + i + '.jpg');
  }
  for (let i = 0; i < 7; i++) {
    colores[i] = loadImage('img/color-' + i + '.jpg');
  }

//------CLASIFICADOR-----
classifier = ml5.soundClassifier(classModel + 'model.json', options);

}

function setup() {
  createCanvas(windowHeight, windowHeight);
  image(lienzo, 0, 0, width, height);

  mic = new p5.AudioIn();
  mic.start();
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  for (let i = 0; i < 5; i++) {
    grafico[i] = createGraphics(width, height);
  }

  for (let i = 0; i < tam; i++) {
    pincelada0.push(new Pincelada(tr));
    pincelada1.push(new Pincelada(tr));
    pincelada2.push(new Pincelada(tr));
    pincelada3.push(new Pincelada(tr));
    pincelada4.push(new Pincelada(tr));
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

  if (haySonido && diferenciaVolumen > umbral) { //Elije una nueva imagen del color cuando supera el umbral de amplitud
    cambiaColor();
  }

  if (capa == 0) {
    for (let i = 0; i < tam; i++) {
      if (haySonido) {
        pincelada0[i].dibujarGrafico(grafico[0]);
      }
    }
    let copia0 = amarillos[colorAmarillos].get();
    copia0.mask(grafico[0]);
    image(copia0, 0, 0, width, height);
  }



  if (pincelada0[0].posY >= height) {
    capa = 1;
  }

  if (capa == 1) {
    for (let i = 0; i < tam; i++) {
      if (haySonido) {
        pincelada1[i].dibujarGrafico(grafico[1]);
      }
    }

    let copia1 = colores[colorColores].get();
    copia1.mask(grafico[1]);
    image(copia1, 0, 0, width, height);

  }

  if (pincelada1[0].posY >= height) {
    capa = 2;
  }

  if (capa == 2) {
    for (let i = 0; i < tam; i++) {
      if (haySonido) {
        pincelada2[i].dibujarGrafico(grafico[2]);
      }
    }

    let copia2 = marrones[colorMarrones1].get();
    copia2.mask(grafico[2]);
    image(copia2, 0, 0, width, height);

  }

  if (pincelada2[0].posY >= height) {
    capa = 3;
  }

  if (capa == 3) {
    for (let i = 0; i < tam; i++) {
      if (haySonido) {
        pincelada3[i].dibujarGrafico(grafico[3]);
      }
    }

    let copia3 = naranjas[colorNaranjas].get();
    copia3.mask(grafico[3]);
    image(copia3, 0, 0, width, height);

  }

  if (pincelada3[0].posY >= height) {
    capa = 4;
  }

  if (capa == 4) {
    for (let i = 0; i < tam; i++) {
      if (haySonido) {
        pincelada4[i].dibujarGrafico(grafico[4]);
      }
    }
    let copia4 = marrones[colorMarrones2].get();
    copia4.mask(grafico[4]);
    image(copia4, 0, 0, width, height);
  }


  if (pincelada4[0].posY >= height) {
    capa = 5;
  }

  if (capa >= 0) { //Aparecen los cuadrados por capas
    cuadrados.dibujar();
  }
  if (capa >= 1) { 
    cuadrados.dibujar2();
  }
  if (capa >= 2) { 
    cuadrados.dibujar3();
  }
  if (capa >= 3) { 
    cuadrados.dibujar4();
  }
  if (capa == 5) {
    cuadrados.mover(haySonido);
  }

  subioelVolumen = amp;

  if (haySonido) {
    
  }

  //--------CLASIFICADOR------
  //console.log(label);
  if(label == 'Shhhhh'){
    reiniciar();
    label = ''; //no sacar esto [sabemos que hace?] [no] 
    //[podemos sacarlo?] [no, se rompe el programa]
    console.log ("resetea");
  }else if(label == 'Aplauso'){
    label = '';
  }

}

function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  //console.log(results);
  // Show the first label and confidence
  label = results[0].label;
  etiqueta = label;
  console.log (results[0].label);
}

function imprimirData() {

  background(255);
  push();
  textSize(16);
  fill(0);
  let texto;
  texto = 'amplitud: ' + amp;
  text(texto, 10, 20);
  pop();

}

function cambiaColor() { //Vuelve a elegir una imagen -color- en cada capa
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

// function mouseClicked() {
//   setup(); // Vuelve a ejecutar la función setup()
//   reiniciar();
// }

function reiniciar() {
  pincelada0 = [];
  pincelada1 = [];
  pincelada2 = [];
  pincelada3 = [];
  pincelada4 = [];

  for (let i = 0; i < tam; i++) {
    pincelada0.push(new Pincelada(tr));
    pincelada1.push(new Pincelada(tr));
    pincelada2.push(new Pincelada(tr));
    pincelada3.push(new Pincelada(tr));
    pincelada4.push(new Pincelada(tr));
  }

  capa = 0;

  colorAmarillos = floor(random(0, 5));
  colorColores = floor(random(0, 7));
  colorMarrones1 = floor(random(0, 8));
  colorNaranjas = floor(random(0, 7));
  colorMarrones2 = floor(random(0, 8));
}

