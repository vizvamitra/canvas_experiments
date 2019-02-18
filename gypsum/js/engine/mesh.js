Engine.Mesh = class Mesh {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material = material;

    this._ext = undefined;
    this._vao = undefined;

    this.numVertices = geometry.vertices.length;
  }

  init(gl, program) {
    this._gl = gl;
    let glProgram = program.glProgram;

    this._ext = this._gl.getExtension("OES_vertex_array_object");

    this._vao = this._ext.createVertexArrayOES();
    this._ext.bindVertexArrayOES(this._vao);

    let vPosition = this._gl.getAttribLocation(glProgram, "vPosition");

    var vBufferId = this._gl.createBuffer();
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, vBufferId );
    this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.geometry.vertices), this._gl.STATIC_DRAW );
    this._gl.vertexAttribPointer( vPosition, 3, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( vPosition );

    let vNormal = this._gl.getAttribLocation(glProgram, "vNormal");

    if(vNormal > -1){
      var nBufferId = this._gl.createBuffer();
      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, nBufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.geometry.normals), this._gl.STATIC_DRAW );
      this._gl.vertexAttribPointer( vNormal, 3, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( vNormal );
    }

    this._ext.bindVertexArrayOES(null);
  }

  bind() {
    this._ext.bindVertexArrayOES(this._vao);
    // this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this.vBufferId );
    // this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
    // this._gl.enableVertexAttribArray( this._vPosition );

    // this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this.nBufferId );
    // this._gl.vertexAttribPointer( this._vNormal, 3, this._gl.FLOAT, false, 0, 0 );
    // this._gl.enableVertexAttribArray( this._vNormal );
  }
}
