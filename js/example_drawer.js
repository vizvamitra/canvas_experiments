window.ExampleDrawer = function(selector){

  return {
    canvas: undefined,
    ctx: undefined,
    world: undefined,

    keys: {
      w: false,
      a: false,
      s: false,
      d: false,
    },

    buttons: {
      mouseLeftBtn: false
    },

    mousePos: undefined,

    objects: [],

    init: function(){
      this.canvas = document.querySelector(selector);
      this.ctx = this.canvas.getContext('2d');

      this.world = Physics.World(this.canvas.width, this.canvas.height, 0.15, 20, 0.6);
      this.generateObjects(50);

      this.canvas.style.cursor = 'none';

      this.registerControls();

      requestAnimationFrame(this.animate.bind(this));
    },

    generateObjects: function(count){
      for(var i in this.objects){ this.objects[i].die(); }
      this.objects = [];

      for(var j = 0; j < count; j++){
        x = Math.floor(Math.random() * this.canvas.width);
        y = Math.floor(Math.random() * this.canvas.height);
        mass = Math.floor(Math.random() * (200-50) + 50);
        maxSpeed = Math.floor(Math.random() * (10-2) + 2);
        size = Math.floor(mass/25);
        square = Square(this, Vector(x, y), size, size, mass, maxSpeed);
        this.objects.push(square);
      }
    },

    animate: function(){
      this.move();
      this.clear();
      this.draw();
      requestAnimationFrame(this.animate.bind(this));
    },

    move: function(){
      this.world.physicsStep();
    },

    clear: function(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw: function(){
      if(this.mousePos){ this.drawHole(); }
      for(var i in this.objects){
        this.objects[i].draw();
      }
    },

    drawHole: function(){
      this.ctx.save();
      var grd = this.ctx.createRadialGradient(this.mousePos.x, this.mousePos.y, 3, this.mousePos.x, this.mousePos.y, this.canvas.width/15);
      this.ctx.fillStyle = grd;
      grd.addColorStop(0, "rgba(90,90,90, 0.5)");
      grd.addColorStop(0.1, "rgba(130,130,130, 0.5)");
      grd.addColorStop(0.8, "rgba(235,235,235, 0.5)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.restore();
    },

    onKeyDown: function(event){
      if(event.keyCode === 87){ this.keys.w = true; }
      if(event.keyCode === 83){ this.keys.s = true; }
      if(event.keyCode === 65){ this.keys.a = true; }
      if(event.keyCode === 68){ this.keys.d = true; }
    },

    onKeyUp: function(event){
      if(event.keyCode === 87){ this.keys.w = false; }
      if(event.keyCode === 83){ this.keys.s = false; }
      if(event.keyCode === 65){ this.keys.a = false; }
      if(event.keyCode === 68){ this.keys.d = false; }
    },

    onMouseMove: function(event){
      var rect = this.canvas.getBoundingClientRect();
      this.mousePos = Vector(
        event.clientX - rect.left,
        event.clientY - rect.top
      );
      this.world.gravityCenter = this.mousePos;
    },

    onMouseDown: function(event){
      if(event.button === 0){ this.buttons.mouseLeftBtn = true; }
    },

    onMouseUp: function(event){
      if(event.button === 0){ this.buttons.mouseLeftBtn = false; }
    },

    onMouseLeave: function(event){
      this.mousePos = undefined;
      this.world.gravityCenter = undefined;
      this.buttons.mouseLeftBtn = false;
    },

    registerControls: function(){
      window.addEventListener('keydown', this.onKeyDown.bind(this));
      window.addEventListener('keyup', this.onKeyUp.bind(this));
      this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
      this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
  };
};
