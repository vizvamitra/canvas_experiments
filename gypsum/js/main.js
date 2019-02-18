var canvasId = 'gl-canvas'

var graphicsEngine = new Engine(canvasId)
var eventsEngine = buildEventsEngine(canvasId, graphicsEngine)

registerResources(graphicsEngine)
buildScene(graphicsEngine)
setupCamera(graphicsEngine)

renderUI()
requestAnimFrame(mainLoopStep)


///////////////////////////////////////////////////////////////////////////////


function registerResources(graphicsEngine) {
  // geometry
  graphicsEngine.resources.registerGeometry('caesar', Resources.Geometry.Caesar)
  graphicsEngine.resources.registerGeometry('cube',   Resources.Geometry.Cube)
  graphicsEngine.resources.registerGeometry('room',   Resources.Geometry.Room)
  graphicsEngine.resources.registerGeometry('sphere', Resources.Geometry.Sphere)
  graphicsEngine.resources.registerGeometry('light_sphere', Resources.Geometry.LightSphere)

  // materials
  graphicsEngine.resources.registerMaterial('gypsum', Resources.Materials.Gypsum)
  graphicsEngine.resources.registerMaterial('metal', Resources.Materials.Metal)
  // this one should be placed inside since it is used for debugging purposes
  graphicsEngine.resources.registerMaterial('light_source', Resources.Materials.LightSource)

  // meshes
  graphicsEngine.resources.registerMesh('caesar',       Resources.Meshes.Caesar)
  graphicsEngine.resources.registerMesh('room',         Resources.Meshes.Room)
  graphicsEngine.resources.registerMesh('cube',         Resources.Meshes.Cube)
  graphicsEngine.resources.registerMesh('sphere',       Resources.Meshes.Sphere)
  graphicsEngine.resources.registerMesh('light_source', Resources.Meshes.LightSource)
}


function buildScene(graphicsEngine) {
  graphicsEngine.scene.createInstance({
    mesh: 'caesar',
    position: vec4(0.0, 0.0, 0.0, 1.0),
    scale: vec3(0.25, 0.25, 0.25)
  })
  graphicsEngine.scene.createInstance({
    mesh: 'cube',
    position: vec4(0.0, -0.75, 0.0, 1.0),
    scale: vec3(0.1, 0.5, 0.1)
  }),
  graphicsEngine.scene.createInstance({
    mesh: 'room',
    position: vec4(0.0, 0.0, 0.0, 1.0),
    scale: vec3(2.5, 1.25, 2.5)
  })

  graphicsEngine.scene.createLightSource({ type: Engine.LightSource.Point })
}


function setupCamera(graphicsEngine) {
  let canvas = document.getElementById('gl-canvas');

  graphicsEngine.camera.setPerspective(canvas.width / canvas.height, 75);
  graphicsEngine.camera.distance = 1.5;
  graphicsEngine.camera.angles.vertical = -20;
  graphicsEngine.camera.angles.horisontal = 0;
}


function buildEventsEngine(canvasId, graphicsEngine) {
  return new EventsEngine(
    canvasId,
    function(mouseVec) {
      let camera = graphicsEngine.camera

      camera.angles.horisontal -= mouseVec[0]/2;
      camera.angles.vertical -= mouseVec[1]/2;

      if(camera.angles.vertical > 25) camera.angles.vertical = 25;
      if(camera.angles.vertical < -25) camera.angles.vertical = -25;
    },
    function(deltaY) {
      let camera = graphicsEngine.camera

      camera.distance += deltaY/100

      if(camera.distance > 2.5) camera.distance = 2.5
      if(camera.distance < 0.5) camera.distance = 0.5
    }
  )
}


function renderUI(){
  React.render(
    React.createElement(LightsManager, null),
    document.getElementById('lights-controls-panel')
  );
}


function mainLoopStep(){
  // for (var i = 0; i < scene.lights.length; i++){
  //   var newPos = mult(rotate(-1, vec3(0.0, 1.0, 0.0)), scene.lights[i].position);
  //   scene.lights[i].position = newPos;
  // }
  graphicsEngine.animationStep()
  requestAnimFrame(mainLoopStep);
}
