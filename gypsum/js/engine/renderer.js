Engine.Renderer = class Renderer {
  constructor(canvasId) {
    this._canvas = document.getElementById(canvasId);
    this._gl = this._initGL();
    this._zBuffer = new Engine.ZBuffer(this._gl, this._canvas.width, this._canvas.height);
    this._current_program = undefined;

    this._light_sphere_mesh = new Engine.Mesh(Engine.Renderer.LightSphereGeometry, null)

    this._init()
  };

  _init() {
    this._initShaderPrograms();

    this._light_sphere_mesh.init(this._gl, this._shader_programs.lightning);

    for(var i=0; i<4; i++){
      this._gl.activeTexture(this._gl['TEXTURE'+i]);
      this._gl.bindTexture(this._gl.TEXTURE_2D, this._zBuffer[i]);
    }
  };

  render(scene, camera, resources) {
    this._geometryPass(scene, camera, resources);
    this._lightningPass(scene.lights, camera);
  };

  _initGL() {
    var gl = WebGLUtils.setupWebGL(this._canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, this._canvas.width, this._canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);

    return gl;
  };

  initMesh(mesh) {
    mesh.init(this._gl, this._shader_programs.geometry)
  };

  _initShaderPrograms() {
    this._shader_programs = {
      direct: new Engine.ShaderPrograms.Direct(this._gl),
      geometry: new Engine.ShaderPrograms.Geometry(this._gl),
      lightning: new Engine.ShaderPrograms.Lightning(this._gl),
    };
  };

  _setShaderProgram(program) {
    program.use();
    this._current_program = program;
  };

  _clear() {
    this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
  };

  _geometryPass(scene, camera, resources) {
    this._zBuffer.bind();

    this._setShaderProgram(this._shader_programs.geometry);

    // this._gl.depthMask(this._gl.TRUE);
    this._clear();
    this._gl.enable(this._gl.DEPTH_TEST);

    this._current_program.loadViewProjMatrices(camera.viewMatrix(), camera.projMatrix());
    for(var i in scene.instances){
      var instance = scene.instances[i];
      var mesh = resources.meshes[instance.mesh];
      mesh.bind();
      this._current_program.loadUniforms(instance, mesh.material, camera);

      this._gl.drawArrays( this._gl.TRIANGLES, 0, mesh.numVertices );
    };

    // for (var j in scene.lights){
    //   var light = scene.lights[j];
    //   if(!light.enabled) continue;

    //   var instance = new Engine.Instance({
    //     mesh: 'light_source',
    //     position: light.position,
    //     scale: vec3(0.03, 0.03, 0.03)
    //   });
    //   var mesh = resources.meshes[instance.mesh];
    //   mesh.bind();
    //   this._current_program.loadUniforms(instance, mesh.material, camera);

    //   this._gl.drawArrays( this._gl.TRIANGLES, 0, mesh.numVertices );
    // }

    //this._gl.depthMask(this._gl.FALSE);
    this._zBuffer.unbind();
  };

  _lightningPass(lights, camera) {
    this._setShaderProgram(this._shader_programs.lightning);
    this._clear()

    this._zBuffer.bindTextures();

    this._gl.disable(this._gl.DEPTH_TEST);
    this._gl.enable(this._gl.BLEND);
    this._gl.blendEquation(this._gl.FUNC_ADD);
    this._gl.blendFunc(this._gl.ONE, this._gl.ONE);

    this._gl.enable(this._gl.CULL_FACE);
    this._gl.cullFace(this._gl.FRONT);
    //this._current_program.loadUniforms(lights, camera, this._canvas.width);
    //this._gl.enable(this._gl.STENCIL_TEST);

    for(var i in lights){
      var light = lights[i];
      if (!light.enabled || light.position[3] == 0) continue;
      var distance = light.affectionDistance();

      var instance = new Engine.Instance({
        mesh: 'light_sphere',
        position: light.position,
        scale: vec3(distance, distance, distance)
      });

      this._light_sphere_mesh.bind();

      this._current_program.loadUniforms(instance.modelMatrix(), [light], camera, this._canvas.width);
      this._gl.drawArrays( this._gl.TRIANGLES, 0, this._light_sphere_mesh.numVertices );
    }

    this._gl.cullFace(this._gl.BACK);
    this._gl.disable(this._gl.BLEND)
    this._gl.disable(this._gl.CULL_FACE);
  };
}
