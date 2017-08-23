window.Square = function(drawer, position, width, height, mass, maxSpeed, speed){
  body = Physics.Body(position, width, height, mass, maxSpeed, speed);
  drawer.world.addBody(body);

  return {
    body: body,
    drawer: drawer,

    draw: function(){
      this.drawer.ctx.fillRect(this.body.position.x, this.body.position.y, this.body.width, this.body.height);
    },

    die: function(){
      this.drawer.world.removeBody(this.body);
    }
  };
};
