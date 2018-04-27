// select the html element 'canvas'
var canvas = document.querySelector('canvas');

// resize the canvas so it takes the size of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create a context 'c'
var c = canvas.getContext('2d');

// variables
var joseonHanbok = ['#9C7785', '#474457', "#DFCDDD", '#E8B452', '#D6384F'];

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;

// event listener to follow mouse movement
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

// event to make a responsive canvas
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})


// Circle Object with two functions : draw and update
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = joseonHanbok[Math.floor(Math.random() * joseonHanbok.length)];


  this.draw = function() {

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interacte with the mouse
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;

      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

var circleArray = [];

function init() {

  circleArray = [];

  for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 4 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 4;
    var dy = (Math.random() - 0.5) * 4;

    circleArray.push(new Circle(x, y, dx, dy, radius));

  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}

init();
animate();
