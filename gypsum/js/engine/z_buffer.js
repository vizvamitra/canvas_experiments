Engine.ZBuffer = class ZBuffer {
  constructor(gl, width, height) {
    this._gl = gl;
    this._ext = {
      buffer: undefined,
      floatTextures: undefined,
      linearFloatTextures: undefined
    };

    this._width = width;
    this._height = height;

    this._frameBuffer = undefined;
    this.textures = [];

    this._init()
  };

  _init() {
    this._initExtensions();
    this._initFrameBuffer();
    this._initTextures();
    this._initDepthBuffer();

    if (this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER) !== this._gl.FRAMEBUFFER_COMPLETE) {
      throw "Can't use framebuffer.";
    }

    this.unbind();
  };

  bind() {
    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._frameBuffer);

    var bufferList = [
      this._ext.buffer.COLOR_ATTACHMENT0_WEBGL,
      this._ext.buffer.COLOR_ATTACHMENT1_WEBGL,
      this._ext.buffer.COLOR_ATTACHMENT2_WEBGL,
      this._ext.buffer.COLOR_ATTACHMENT3_WEBGL,
      this._ext.buffer.COLOR_ATTACHMENT4_WEBGL,
      this._ext.buffer.COLOR_ATTACHMENT5_WEBGL,
      this._ext.buffer.COLOR_ATTACHMENT6_WEBGL,
      this._ext.buffer.COLOR_ATTACHMENT7_WEBGL,
    ];

    this._ext.buffer.drawBuffersWEBGL(bufferList);
  };

  unbind() {
    this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, null);
    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
  };

  bindTextures() {
    for(var i=0; i<8; i++){
      this._gl.activeTexture(this._gl['TEXTURE'+i]);
      this._gl.bindTexture(this._gl.TEXTURE_2D, this.textures[i]);
    }
  };

  _initExtensions() {
    this._ext.buffer = this._gl.getExtension('WEBGL_draw_buffers');
    if(!this._ext.buffer){ throw 'Multiple render targets not supported'; }

    this._ext.floatTextures = this._gl.getExtension('OES_texture_float');
    if(!this._ext.floatTextures){ throw 'Float textures not supported'; }

    this._ext.linearFloatTextures = this._gl.getExtension('OES_texture_float_linear');
    if(!this._ext.linearFloatTextures){ throw 'Linear float textures not supported'; }
  };

  _initFrameBuffer() {
    this._frameBuffer = this._gl.createFramebuffer();
    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._frameBuffer);
  };

  _initTextures() {
    for(var i=0; i<8; i++){
      this.textures[i] = this._gl.createTexture();

      this._gl.bindTexture(this._gl.TEXTURE_2D, this.textures[i]);
      this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._width, this._height, 0, this._gl.RGBA, this._gl.FLOAT, null);

      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);

      this._gl.framebufferTexture2D(
        this._gl.FRAMEBUFFER,
        this._ext.buffer['COLOR_ATTACHMENT'+i+'_WEBGL'],
        this._gl.TEXTURE_2D,
        this.textures[i],
        0
      );
    }
  };

  _initDepthBuffer() {
    var depthBuffer = this._gl.createRenderbuffer();
    this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, depthBuffer);
    this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16, this._width, this._height);
    this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.RENDERBUFFER, depthBuffer);
  };
}
