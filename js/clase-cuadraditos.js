
  /* constructor() {
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
  } */
  class Cuadrados {
    constructor() {
  
      this.imagenes = [];
      this.posX;
      this.posY;
      this.cantidadDeImagenes = 10;
      this.cantidadDeCuadrados = windowHeight;
      this.cantidadDeCuadradosY = windowHeight;
      this.distanciaCuadradosX = random(25,30);
      this.distanciaCuadradosY = 45;
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
    
    dibujar(sonido) {
      for (let i = 0; i < this.cantidadDeCuadrados; i++) {
        for (let c = 0; c < this.cantidadDeCuadradosY; c++) {
            let x = i * this.distanciaCuadradosX;
            let y = c * this.distanciaCuadradosY;
            this.posX= x;
            this.posY= y;
  
            let index = i * this.cantidadDeCuadradosY + c;
            let indice = this.indiceAleatorio[index];
  
            image(this.imagenes[indice], this.posX, this.posY, 25, 40);
            
        if(sonido){
             this.distanciaCuadradosX= random(10,40);
           }
            
        }
    }
    }
  }
