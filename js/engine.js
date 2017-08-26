class Engine {
  constructor (selector, settings) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');

    this.controls = new Controls(this.canvas);
    this.drawer = new Drawer(this.canvas);

    this.world = new Physics.World(
      this.canvas.width,
      this.canvas.height,
      settings.friction,
      settings.gravity,
      settings.elasticity
    );

    this.objects = [];
    this.generateObjects(settings.objects_count);

    requestAnimationFrame(this.animate.bind(this));
  }

  generateObjects (count) {
    for(var i in this.objects){ this.objects[i].die(); }
    this.objects = [];

    for(var j = 0; j < count; j++){
      var x = Math.floor(Math.random() * this.canvas.width);
      var y = Math.floor(Math.random() * this.canvas.height);
      var mass = Math.floor(Math.random() * (100-50) + 50);
      var maxSpeed = Math.floor(Math.random() * (10-2) + 2);
      var size = Math.floor(mass/25);
      var square = new Square(this, new Vector(x, y), size, size, mass, maxSpeed);
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
};
