class Drawer {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw (world, objects){
    if(world.gravityCenter){ this.drawHole(world.gravityCenter); }
    for(var i in objects){
      objects[i].draw();
    }
  }

  drawHole (position){
    this.ctx.save();
    var grd = this.ctx.createRadialGradient(position.x, position.y, 3, position.x, position.y, 100);
    this.ctx.fillStyle = grd;
    grd.addColorStop(0, "rgba(90,90,90, 0.5)");
    grd.addColorStop(0.1, "rgba(130,130,130, 0.5)");
    grd.addColorStop(0.8, "rgba(235,235,235, 0.5)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }
}
