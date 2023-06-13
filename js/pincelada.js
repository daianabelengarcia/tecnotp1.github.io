class Pincelada {

  constructor() {
    this.y = 0;
    this.counter = 0;
    this.posX = random(-50, width + 50);
    this.posY = 0;
    this.x = 0;
    this.tam = 30;
    this.mezcla = 0.0;
  }

  dibujarGrafico(grafico, mezcla) {

    this.posY = this.y += 2;
    this.x = sin(this.counter) * 20 + this.posX;
    blendMode(DARKEST); 
    grafico.tint(255, 255 * this.mezcla);
    grafico.fill(0);
    grafico.noStroke();
    grafico.ellipse(this.x, this.posY, this.tam, this.tam);

    this.counter += 0.05;
  }

  dibujarGrafico2(grafico) {

    this.posY = this.y += 2;
    this.x = sin(this.counter) * 20 + this.posX;

    grafico.fill(0);
    grafico.noStroke();
    grafico.ellipse(this.x, this.posY, this.tam, this.tam);

    this.counter += 0.03;

  }


}