class Cuadrados {
  constructor() {

    this.imagenes = [];
    this.posX;
    this.posY;
    this.filas = 11;
    this.cantidadDeImagenes = 25;
    this.cantidadDeCuadrados = windowHeight/35 +1;
    this.cantidadDeCuadradosY = windowHeight/55;
    this.distanciaCuadradosX = 20;
    this.distanciaCuadradosY = 30;
    this.indiceAleatorio = [];


    for (let i = 0; i < this.cantidadDeImagenes; i++) {
      this.imagenes[i] = loadImage('img/' + i + '.png');
    }


    for (let i = 0; i < this.cantidadDeCuadrados; i++) {
      for (let c = 0; c < this.cantidadDeCuadradosY; c++) {
        this.indiceAleatorio.push(floor(random(this.imagenes.length)));
      }
    }
  }

  dibujar() {
    for (let i = 0; i < this.cantidadDeCuadrados; i++) {
      for (let c = 0; c < this.cantidadDeCuadradosY; c++) {
        let x = i * this.distanciaCuadradosX;
        let y = c * this.distanciaCuadradosY;
        this.posX = x;
        this.posY = y;

        let index = i * this.filas + c;
        let indice = this.indiceAleatorio[index];

        image(this.imagenes[indice], this.posX-30, this.posY, 15, 25);
      }
    }
  }

  dibujar2() {
    this.dibujar();
    push();
    translate(width/2 + this.distanciaCuadradosX+10, height/2 + this.distanciaCuadradosY/2);
    this.dibujar ();
    pop();
  }

  dibujar3() {
    this.dibujar2();
    push();
    translate(width/2 + this.distanciaCuadradosX+10, 0);
    this.dibujar ();
    pop();
  }

  dibujar4() {
    this.dibujar3();
    push();
    translate(0, height/2 + this.distanciaCuadradosY/2);
    this.dibujar ();
    pop();
  }

 mover(sonido){
  if (sonido) {
    this.distanciaCuadradosX= random(15, 30);
  } else {
    this.distanciaCuadradosX= 20;
} 
}

}
