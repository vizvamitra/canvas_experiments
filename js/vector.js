window.Vector = function(x, y){
  return {
    x: x || 0,
    y: y || 0,

    length: function(){
      return Math.sqrt(this.x*this.x + this.y*this.y);
    },

    direction: function(){
      if(this.length() !== 0){
        return this.divide(this.length());
      } else {
        return Vector(0, 0);
      }
    },

    inverse: function(){
      if(this.x === 0){x = 0;}else{x = -this.x;}
      if(this.y === 0){y = 0;}else{y = -this.y;}
      return Vector(x, y);
    },

    divide: function(value){
      if(value === 0){console.error('division by zero!');}
      return Vector(this.x/value, this.y/value);
    },

    multiply: function(value){
      return Vector(this.x*value, this.y*value);
    },

    add: function(vector){
      return Vector(this.x+vector.x, this.y+vector.y);
    },

    substract: function(vector){
      return Vector(this.x-vector.x, this.y-vector.y);
    }
  };
};
