class Engine {
  constructor(canvasId) {
    this._renderer = new Engine.Renderer(canvasId)
    this.resources = new Engine.ResourceRegistry(this._renderer)
    this.camera = new Engine.Camera()
    this.scene = new Engine.Scene()
  }

  animationStep() {
    this.camera.update();
    this._renderer.render(this.scene, this.camera, this.resources);
  }
}
