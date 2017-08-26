class Drawer {
  constructor (canvas, nightMode) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.nightMode = nightMode;
  }

  clear () {
    this.ctx.save();

    this.ctx.fillStyle = this._backgroundColor();
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();
  }

  draw (world, objects){
    if(world.gravityCenter){ this.drawHole(world.gravityCenter); }
    for(var i in objects){ this.drawObject(objects[i]) }
  }

  drawObject (object) {
    this.ctx.save();
    this.ctx.fillStyle = this._objectColor();

    this.ctx.fillRect(
      object.body.position.x,
      object.body.position.y,
      object.body.width,
      object.body.height
    );

    this.ctx.restore();
  }

  drawHole (position){
    this.ctx.save();

    this.ctx.fillStyle = this._holeGradient(position);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();
  }

  _backgroundColor () {
    return this.nightMode ? 'black' : 'white';
  }

  _objectColor () {
    return this.nightMode ? 'white' : 'black';
  }

  _holeGradient (position) {
    var grd = this.ctx.createRadialGradient(position.x, position.y, 3, position.x, position.y, 50);

    if (this.nightMode) {
      grd.addColorStop(0,   "rgba(180,180,180, 0.3)");
      grd.addColorStop(0.3, "rgba(140,140,140, 0.3)");
      grd.addColorStop(0.8, "rgba(100,100,100, 0.3)");
      grd.addColorStop(1,   "rgba(  0,  0,  0, 0.0)");
    } else {
      grd.addColorStop(0, "rgba(90,90,90, 0.5)");
      grd.addColorStop(0.1, "rgba(130,130,130, 0.5)");
      grd.addColorStop(0.8, "rgba(235,235,235, 0.5)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
    }

    return grd;
  }
}
