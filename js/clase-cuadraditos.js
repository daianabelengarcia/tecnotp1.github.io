class Cuadrados {
  constructor() {
    this.img1 = loadImage("../img/cuadrado-1.png");
    this.img2 = loadImage("../img/cuadrado-1.png");
    this.posx1 = 0;
    this.posx2 = width;
  }
  
  dibujar(sonido) {
    if (sonido) {
      this.posx1 += 2;
      this.posx2 += 2;
    }
    
    if (this.posx1 >= width) {
      this.posx1 = -width;
    }
    
    if (this.posx2 >= width) {
      this.posx2 = -width;
    }
    
    image(this.img1, this.posx1, 0, width, height);
    image(this.img2, this.posx2, 0, width, height);
  }
}