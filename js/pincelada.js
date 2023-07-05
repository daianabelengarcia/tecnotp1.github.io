class Pincelada {

  constructor(transparencia) {
    this.y = 0;
    this.counter = 0;
    this.posX = random(-15,width+15);
    this.posY = 0;
    this.x = 0;
    this.tam = 20;
    this.curva = random(0.03,0.10);
    this.transparencia = transparencia;
  }

  dibujarGrafico(grafico) {

    this.posY = this.y += 8;
    this.x = sin(this.counter) * 20 + this.posX;

    grafico.fill(0,0,0,this.transparencia);
    grafico.noStroke();
    grafico.ellipse(this.x, this.posY, this.tam, this.tam);

    this.counter += this.curva;
    this.tam += random(-1,1);
  }

}