Engine.ShaderPrograms.Geometry = class GeometryShaderProgram extends Engine.ShaderPrograms.Base {
  constructor(gl) {
    super(gl);

    this._vs = Engine.Shaders.Geometry.Vertex;
    this._fs = Engine.Shaders.Geometry.Fragment;

    this.glProgram = this._buildShaderProgram();

    this._uniformLocs = {
      modelMatrix: undefined,
      viewMatrix: undefined,
      projMatrix: undefined,
      normalMatrix: undefined,
      material: {
        ambient: undefined,
        diffuse: undefined,
        specular: undefined,
        shininess: undefined
      }
    };

    this._initUniformLocations();
  }

  use() {
    this._gl.useProgram( this.glProgram );
  };

  loadViewProjMatrices(viewMatrix, projMatrix) {
    this._gl.uniformMatrix4fv(this._uniformLocs.viewMatrix, false, flatten(viewMatrix));
    this._gl.uniformMatrix4fv(this._uniformLocs.projMatrix, false, flatten(projMatrix));
  };

  _initUniformLocations() {
    this._uniformLocs.modelMatrix = this._gl.getUniformLocation(this.glProgram, 'uModelMatrix');
    this._uniformLocs.viewMatrix = this._gl.getUniformLocation(this.glProgram, 'uViewMatrix');
    this._uniformLocs.projMatrix = this._gl.getUniformLocation(this.glProgram, 'uProjMatrix');
    this._uniformLocs.normalMatrix = this._gl.getUniformLocation(this.glProgram, 'uNormalMatrix');

    this._uniformLocs.material.ambient = this._gl.getUniformLocation(this.glProgram, 'uMaterial.ambient');
    this._uniformLocs.material.diffuse = this._gl.getUniformLocation(this.glProgram, 'uMaterial.diffuse');
    this._uniformLocs.material.specular = this._gl.getUniformLocation(this.glProgram, 'uMaterial.specular');
    this._uniformLocs.material.shininess = this._gl.getUniformLocation(this.glProgram, 'uMaterial.shininess');
  };

  loadUniforms(instance, material, camera) {
    this._gl.uniformMatrix4fv(this._uniformLocs.modelMatrix, false, flatten(instance.modelMatrix()));

    var normalMatrix = inverse(mult(camera.viewMatrix(), instance.modelMatrix()));
    this._gl.uniformMatrix4fv(this._uniformLocs.normalMatrix, false, flatten(normalMatrix));

    this._gl.uniform4fv(this._uniformLocs.material.ambient, material.ambient);
    this._gl.uniform4fv(this._uniformLocs.material.diffuse, material.diffuse);
    this._gl.uniform4fv(this._uniformLocs.material.specular, material.specular);
    this._gl.uniform1f(this._uniformLocs.material.shininess, material.shininess);
  }
}
