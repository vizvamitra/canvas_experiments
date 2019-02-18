class EventsEngine {
  constructor(canvasId, onRotateCallback, onScaleCallback) {
    this._canvas = document.getElementById(canvasId);

    this._prevMousePos = undefined;

    this._buttons = {
      left: false
    };

    this._onRotateCallback = onRotateCallback;
    this._onScaleCallback = onScaleCallback

    this._registerEvents();
  }

  isRotating() {
    return this._buttons.left && this._startMousePos && this._endMousePos;
  }

  _registerEvents() {
    this._canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
    this._canvas.addEventListener('wheel', this._onMouseWheel.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this));
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
  }

  _onMouseMove(event) {
    if(this._buttons.left){
      event.preventDefault();
      let currentMousePos = this._getMousePos(event.clientX, event.clientY);
      let mouseVec = subtract(currentMousePos, this._prevMousePos);

      this._onRotateCallback(mouseVec)

      this._prevMousePos = currentMousePos
    }
  }

  _onMouseUp(event) {
    if(event.button === 0){ this._buttons.left = false; }
    this._prevMousePos = undefined;
  }

  _onMouseDown(event) {
    if(event.button === 0){
      this._buttons.left = true;
      this._prevMousePos = this._getMousePos(event.clientX, event.clientY);
    }
  }

  _onMouseWheel(event) {
    event.preventDefault();

    this._onScaleCallback(event.deltaY)
  }

  _getMousePos(clientX, clientY) {
    let rect = this._canvas.getBoundingClientRect();
    return vec2( clientX - rect.left, clientY - rect.top );
  };
}
