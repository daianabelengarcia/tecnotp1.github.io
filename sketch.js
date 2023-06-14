//-------CONFIGURACION----

let AMP_MIN = 0.07; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let IMPRIMIR = false;


//-----ENTRADA DE AUDIO----
let mic;

//-----AMPLITUD----

let amp;
let haySonido = false;
let subioelVolumen;
let umbral = 0.1;

//-----PINCELADAS----
let pincelada0 = [];
let pincelada1 = [];
let pincelada2 = [];
let pincelada3 = [];
let pincelada4 = [];
let pincelada5 = [];
let pincelada6 = [];

let cuadrados;

//-----CAPAS e IMAGENES----
let capa;
let marrones = [];
let naranjas = [];
let amarillos = [];
let colores = [];
let grafico = [];

let colorMarrones;
let colorAmarillos;
let colorMarrones2;
let colorColores;
let colorMarrones3;
let colorNaranjas;
let colorMarrones4;


function setup() {
  createCanvas(600, 600);

  mic = new p5.AudioIn();
  mic.start();
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  for (let i = 0; i < 7; i++) {
    grafico[i] = createGraphics(width, height);
  }

  for (let i = 0; i < 10; i++) {

    pincelada0.push(new Pincelada());
    pincelada1.push(new Pincelada());
    pincelada2.push(new Pincelada());
    pincelada3.push(new Pincelada());
    pincelada4.push(new Pincelada());
    pincelada5.push(new Pincelada());
    pincelada6.push(new Pincelada());
  }
  /* cuadrados = new Cuadrados(); */
  capa = 0;

  cambiaColor();


}

function preload() {
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

}

function draw() {

  amp = mic.getLevel();

  haySonido = amp > AMP_MIN;
  let diferenciaVolumen = amp - subioelVolumen;

  if (haySonido && diferenciaVolumen > umbral) {
    cambiaColor();
  }
  if (capa == 0) {
    for (let i = 0; i < 10; i++) {
      if (haySonido) {
        pincelada0[i].dibujarGrafico(grafico[0]);
      }
    }
    let copia = marrones[colorMarrones].get();
    copia.mask(grafico[0]);
    image(copia, 0, 0, width, height);
  }



  if (pincelada0[0].posY >= height) {
    capa = 1;
  }


  if (capa == 1) {
    for (let i = 0; i < 10; i++) {
      if (haySonido) {
        pincelada1[i].dibujarGrafico2(grafico[1]);
      }
    }
    copia = amarillos[colorAmarillos].get();
    copia.mask(grafico[1]);
    image(copia, 0, 0, width, height);
  }




   if (pincelada1[0].posY >= height) {
    capa = 2;
  }

  if (capa == 2) {
    for (let i = 0; i < 10; i++) {
      if (haySonido) {
        pincelada2[i].dibujarGrafico(grafico[2]);
      }
    }

    copia = marrones[colorMarrones2].get();
    copia.mask(grafico[2]);
    image(copia, 0, 0, width, height);

  } 

  if (pincelada2[0].posY >= height) {
    capa = 3;
  }

  if (capa == 3) {
    for (let i = 0; i < 10; i++) {
      if (haySonido) {
        pincelada3[i].dibujarGrafico2(grafico[3]);
      }
    }

    copia = colores[colorColores].get();
    copia.mask(grafico[3]);
    image(copia, 0, 0, width, height);

  } 

   if (pincelada3[0].posY >= height) {
    capa = 4;
  }

  if (capa == 4) {
    for (let i = 0; i < 10; i++) {
      if (haySonido) {
        pincelada4[i].dibujarGrafico(grafico[4]);
      }
    }

    copia = marrones[colorMarrones3].get();
    copia.mask(grafico[4]);
    image(copia, 0, 0, width, height);

  }

  if (pincelada4[0].posY >= height) {
    capa = 5;
  }

  if (capa == 5) {
    for (let i = 0; i < 10; i++) {
      if (haySonido) {
        pincelada5[i].dibujarGrafico2(grafico[5]);
      }
    }

    copia = naranjas[colorNaranjas].get();
    copia.mask(grafico[5]);
    image(copia, 0, 0, width, height);

  }

  if (pincelada5[0].posY >= height) {
    capa = 6;
  }

  if (capa == 6) {
    for (let i = 0; i < 10; i++) {
      if (haySonido) {
        pincelada6[i].dibujarGrafico(grafico[6]);
      }
    }

    copia = marrones[colorMarrones4].get();
    copia.mask(grafico[6]);
    image(copia, 0, 0, width, height);

  } 

  subioelVolumen = amp;

  if (haySonido) {
    console.log(amp);
  }
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

function cambiaColor() {
    colorMarrones = floor(random(0, 8));
    colorAmarillos = floor(random(0, 5));
    colorMarrones2 = floor(random(0, 8));
    colorColores = floor(random(0, 7));
    colorMarrones3 = floor(random(0, 8));
    colorNaranjas = floor(random(0,7));
    colorMarrones4 = floor(random(0, 8));
}
