class Picture {
  constructor(img, x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = r;
    this.minRadius = r;
    this.img = img;
    this.img1 = img;
    this.img2 = img;

  }

  display() {
    imageMode(CENTER);
    // var mask1 = createGraphics(this.radius, this.radius, P2D);
    // mask1.background(0);
    // mask1.fill(255);
    // mask1.stroke(255);
    // mask1.ellipse(this.x, this.y, this.radius, this.radius);
    // this.img.mask(mask1);
    image(this.img, this.x, this.y, this.radius, this.radius);
    // image(this.img1, this.x + 1, this.y, this.radius, this.radius);
    // image(this.img2, this.x + 1, this.y, this.radius, this.radius);
  }

  update() {

    if (this.x + this.radius > 960 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > 960 || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interacte with the mouse
    if (mouseX - this.x < 50 && mouseX - this.x > -50 &&
      mouseY - this.y < 50 && mouseY - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    // console.log('x: ' + this.x, 'y: ' + this.y, mouseX, mouseY);
    this.display();
  }


}
