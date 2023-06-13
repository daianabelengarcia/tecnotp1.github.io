//-------CONFIGURACION----

let AMP_MIN = 0.07; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let IMPRIMIR = false;

let AMP_MAX = 0.2;

//-----ENTRADA DE AUDIO----
let mic;

//-----AMPLITUD----

let amp;
let haySonido = false;
let volumenAlto = false;
let volumenBajo = false;


let p = [];
let p2 = [];
let p3 = [];
let p4 = [];
let cuadrados;
let capa;
let imagen = [];
let grafico = [];
let eligeImagen;

let posXCam;
let espacioCaminantes = width / 20;

function setup() {
  createCanvas(600, 600);

  mic = new p5.AudioIn();
  mic.start();

  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  for (let i = 0; i < 10; i++) {
    grafico[i] = createGraphics(width, height);
  }

  for (let i = 0; i < 20; i++) {
    let x = posXCam + random(-5,5);
    p.push(new Pincelada(x));
    p2.push(new Pincelada(x));
    /*p3.push(new Pincelada());
    p4.push(new Pincelada());  */
    posXCam += espacioCaminantes;
  }
  /* cuadrados = new Cuadrados(); */

  capa = 0;


}

function preload() {
  for (let i = 0; i < 4; i++) {
    imagen[i] = loadImage('img/color-' + i + '.jpg');
  }

}

function draw() {

  amp = mic.getLevel();

  haySonido = amp > AMP_MIN;
  volumenBajo = amp < 0.15; //el volumen es bajo mientras no supere esa amplitud
  let subioelVolumen = haySonido && volumenAlto; //sube el volumen si hay sonido y el volumen es alto

  if (capa == 0 && volumenBajo) { //elige la imagen que se muestra en la mascara de recorte dependiendo el volumen del sonido
    eligeImagen = 0;
  } else if (capa == 0 && subioelVolumen) {
    eligeImagen = 1;
  } else if (capa == 1 && volumenBajo) { 
    eligeImagen = 2;
  } else if (capa == 1 && subioelVolumen) {
    eligeImagen = 3;
  }

  if (capa == 0) {
    for (let i = 0; i < 20; i++) {
      if (haySonido) {
        p[i].dibujarGrafico(grafico[0]);
      }
    }

    let copia = imagen[eligeImagen].get();
    copia.mask(grafico[0]);
    image(copia, 0, 0, width, height);
  }



  if (p[0].posY >= height) {
    capa = 1;
  }


  if (capa == 1) {

    for (let i = 0; i < 20; i++) {
      if (haySonido) {
        p2[i].dibujarGrafico2(grafico[1]);
      }
    }

    copia = imagen[eligeImagen].get();
    copia.mask(grafico[1]);
    image(copia, 0, 0, width, height);
  }



  volumenAlto = !volumenBajo; //volumen alto es verdadero cuando la otra condicion deja de serlo
  console.log (amp,volumenAlto);

  /* if (p2[0].posY >= height) {
     capa = 2;
   }
   if (capa == 2) {
     for (let i = 0; i < 30; i++) {
       if (haySonido) {
         if (i % 2 == 0) {
           p3[i].dibujar(amp, fondo);
         } else {
           p3[i].dibujar2(amp, fondo);
         }
       }
     }
   }
   if (p3[0].posY >= height) {
     capa = 3;
   }
   if (capa == 3) {
     for (let i = 0; i < 30; i++) {
       if (haySonido) {
         if (i % 2 == 0) {
           p4[i].dibujar(amp, fondo);
         } else {
           p4[i].dibujar2(amp, fondo);
         }
       }
     }
   }
   if (p4[0].posY >= height) {
     capa = 4;
   }
   
   if (capa == 4) {
     cuadrados.dibujar(haySonido);
   }
   if (IMPRIMIR) {
     imprimirData();
   } */
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
