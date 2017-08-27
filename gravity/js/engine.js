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
      var x = this.random(0, this.canvas.width);
      var y = this.random(0, this.canvas.height);
      var mass = this.random(30, 100);
      var maxSpeed = this.random(2, 10);
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

  normalRandom (min, max, power=3) {
    var rand = new Array(power + 1).fill(0).reduce((acc, _) => acc + Math.random()) / power;
    return rand * (max-min) + min;
  }

  random (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
};
