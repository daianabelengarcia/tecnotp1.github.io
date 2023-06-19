class Cuadrados {
  constructor() {

    this.imagenes = [];
    this.posX;
    this.posY;
    this.filas = 27;
    this.cantidadDeImagenes = 10;
    this.cantidadDeCuadrados = windowHeight;
    this.cantidadDeCuadradosY = this.filas;
    this.distanciaCuadradosX = 27;
    this.distanciaCuadradosY = 40;
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

        let index = i * this.cantidadDeCuadradosY + c;
        let indice = this.indiceAleatorio[index];

        image(this.imagenes[indice], this.posX, this.posY, 20, 35);
      }
    }
  }

 mover(sonido){
  if (sonido) {
    this.distanciaCuadradosX= random(20, 50);
  } else {
    this.distanciaCuadradosX= 27;
} 
}

}
