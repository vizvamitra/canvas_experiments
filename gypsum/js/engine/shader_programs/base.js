Engine.ShaderPrograms.Base = class BaseShaderProgram {
  constructor(gl) {
    this._gl = gl;
  }

  _buildShader(type, code) {
    let shader = this._gl.createShader(type);

    this._gl.shaderSource(shader, code);
    this._gl.compileShader(shader);
    if ( !this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS) ) {
      let msg = "Shader failed to compile. The error log is:" +
                "<pre>" + this._gl.getShaderInfoLog( shader ) + "</pre>";
      alert(msg);
      return -1;
    }

    return shader;
  }

  _buildShaderProgram() {
    let vertexShader = this._buildShader(this._gl.VERTEX_SHADER, this._vs);
    let fragmentShader = this._buildShader(this._gl.FRAGMENT_SHADER, this._fs);

    let program = this._gl.createProgram();

    this._gl.attachShader(program, vertexShader);
    this._gl.attachShader(program, fragmentShader);
    this._gl.linkProgram(program);

    if ( !this._gl.getProgramParameter(program, this._gl.LINK_STATUS) ) {
      let msg = "Shader program failed to link. The error log is:" +
                "<pre>" + this._gl.getProgramInfoLog( program ) + "</pre>";
      alert( msg );
      return -1;
    }

    return program;
  }
}
