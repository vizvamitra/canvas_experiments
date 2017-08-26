class Controls {
  constructor (canvas) {
    this.canvas = canvas;
    this.mousePos = undefined;

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    this.buttons = {
      mouseLeftBtn: false
    }

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));

    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onKeyDown (event) {
    if(event.keyCode === 87){ this.keys.w = true; }
    if(event.keyCode === 83){ this.keys.s = true; }
    if(event.keyCode === 65){ this.keys.a = true; }
    if(event.keyCode === 68){ this.keys.d = true; }
  }

  onKeyUp (event) {
    if(event.keyCode === 87){ this.keys.w = false; }
    if(event.keyCode === 83){ this.keys.s = false; }
    if(event.keyCode === 65){ this.keys.a = false; }
    if(event.keyCode === 68){ this.keys.d = false; }
  }

  onMouseMove (event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mousePos = new Vector(
      event.clientX - rect.left,
      event.clientY - rect.top
    );
  }

  onMouseDown (event) {
    if(event.button === 0){ this.buttons.mouseLeftBtn = true; }
  }

  onMouseUp (event) {
    if(event.button === 0){ this.buttons.mouseLeftBtn = false; }
  }

  onMouseLeave (event) {
    this.mousePos = undefined;
    this.buttons.mouseLeftBtn = false;
  }
}
