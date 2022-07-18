class Engine {
  constructor (selector, settings) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');

    this.controls = new Controls(this.canvas);
    this.drawer = new Drawer(this.canvas, settings.nightMode);

    this.world = new Physics.World(
      this.canvas.width,
      this.canvas.height,
      settings.friction,
      settings.gravity,
      settings.elasticity
    );

    this.objects = [];
    this.generateObjects(settings.objectsCount);

    requestAnimationFrame(this.animate.bind(this));
  }

  generateObjects (count) {
    for(var i in this.objects){ this.objects[i].die(); }
    this.objects = [];

    for(var j = 0; j < count; j++){
      var x = Math.floor(Math.random() * this.canvas.width);
      var y = Math.floor(Math.random() * this.canvas.height);
      var mass = Math.random() * (100-30) + 30;
      var maxSpeed = Math.random() * (10-2) + 2;
      var size = Math.floor(mass/25);
      var square = new Square(this.world, new Vector(x, y), size, size, mass, maxSpeed);
      this.objects.push(square);
    }
  }

  animate () {
    this.move();
    this.clear();
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  move () {
    this.world.gravityCenter = this.controls.mousePos;
    this.world.physicsStep();
  }

  clear () {
    this.drawer.clear();
  }

  draw () {
    this.drawer.draw(this.world, this.objects);
  }

  setNightMode (state) {
    this.drawer.nightMode = state;
  }
};
