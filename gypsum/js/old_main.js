var renderer, scene, camera, events, rotation;

rotation = {
  axis: vec3(0.0, 1.0, 0.0),
  direction: -1,
  speed: 1
}

initRenderer();
initScene();
initEventsEngine();
initCamera();
renderUI();
requestAnimFrame(mainLoop);


function initRenderer(){
  renderer = new Gypsum.Renderer('gl-canvas');
  renderer.init();
}

function initScene(){
  scene = new Gypsum.Scene();

  scene.instances.push(
    new Instance({
      mesh: 'caesar',
      position: vec4(0.0, 0.0, 0.0, 1.0),
      scale: vec3(0.25, 0.25, 0.25)
    }),
    new Instance({
      mesh: 'cube',
      position: vec4(0.0, -0.75, 0.0, 1.0),
      scale: vec3(0.1, 0.5, 0.1)
    }),
    new Instance({ // room
      mesh: 'room',
      position: vec4(0.0, 0.0, 0.0, 1.0),
      scale: vec3(2.5, 1.25, 2.5)
    })
  );
  scene.lights = [
    new Gypsum.LightSource.Point({
      position: vec4(0.5, 0.5, 0.5, 1.0),
      ambient: vec4(0.2, 0.2, 0.2, 1.0),
      diffuse: vec4(1.0, 1.0, 1.0, 1.0),
      specular: vec4(1.0, 1.0, 1.0, 1.0),
      attenuation: {
        constant: 0.0,
        linear: 0.0,
        exp: 1.0
      }
    })
  ];
}

function initEventsEngine(){
  events = new Gypsum.EventsEngine();
  events.init('gl-canvas');
}

function initCamera(){
  var canvas = document.getElementById('gl-canvas');
  camera = new Gypsum.Camera();
  camera.setPerspective(canvas.width / canvas.height, 75);
  camera.distance = 1.5;
  camera.angles.vertical = -20;
  camera.angles.horisontal = 0;
  camera.update();
}

function renderUI(){
  React.render(
    React.createElement(LightsManager, null),
    document.getElementById('lights-controls-panel')
  );
}

function mainLoop(){
  // for (var i = 0; i < scene.lights.length; i++){
  //   var newPos = mult(rotate(-1, vec3(0.0, 1.0, 0.0)), scene.lights[i].position);
  //   scene.lights[i].position = newPos;
  // }
  camera.update();

  renderer.render(scene, camera);
  requestAnimFrame(mainLoop);
}

function onCheckboxSwitch(event, index){
  var checkbox = event.target;
  scene.lights[index].enabled = checkbox.checked;
}

function onModelChange(event){
  event.preventDefault();
  var axisSelect = event.target;
  scene.instances[0].mesh = axisSelect.value;
}
