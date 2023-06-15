class Pincelada {

  constructor() {
    this.y = 0;
    this.counter = 0;
    this.posX = random(-15,width+15);
    this.posY = 0;
    this.x = 0;
    this.tam = 40;
  }

  dibujarGrafico(grafico) {

    this.posY = this.y += 5;
    this.x = sin(this.counter) * 20 + this.posX;

    grafico.fill(0);
    grafico.noStroke();
    grafico.ellipse(this.x, this.posY, this.tam, this.tam);

    this.counter += 0.05;
  }

  dibujarGrafico2(grafico) {

    this.posY = this.y += 5;
    this.x = sin(this.counter) * 20 + this.posX;

    grafico.fill(0);
    grafico.noStroke();
    grafico.ellipse(this.x, this.posY, this.tam, this.tam);

    this.counter += 0.03;

  }
}