window.LightsManager = React.createClass({
  getInitialState: function(){
    return {
      lights: graphicsEngine.scene.lights,
      currentLight: graphicsEngine.scene.lights[0] || undefined
    }
  },

  onLightCreate: function(type){
    if (graphicsEngine.scene.lights.length >= 10) return;
    var newLight = graphicsEngine.scene.createLightSource({ type: type });
    this.setState({
      lights: graphicsEngine.scene.lights,
      currentLight: newLight
    });
  },

  onLightNameChange: function(name){
    var light = this.state.currentLight;
    light.name = name;
    this.setState({currentLight: light});
  },

  onIntensityChange: function(intensity){
    var light = this.state.currentLight;
    light.intensity = intensity;
    this.setState({currentLight: light});
  },

  onLightStatusChange: function(status){
    var light = this.state.currentLight;
    light.enabled = status;
    this.setState({currentLight: light});
  },

  onLightPositionChange: function(position){
    var light = this.state.currentLight;
    light.position = position;
    this.setState({currentLight: light});
  },

  onLightDirectionChange: function(angles){
    var light = this.state.currentLight;
    light.angles = angles;
    light.updateDirection();
    this.setState({currentLight: light});
  },

  onLightCutoffChange: function(cutoff){
    var light = this.state.currentLight;
    light.cutoff = cutoff;
    this.setState({currentLight: light});
  },

  onLightColorChange: function(color){
    var light = this.state.currentLight;
    light.ambient = vec4(0.2*color[0], 0.2*color[1], 0.2*color[2], 1.0);
    light.diffuse = color;
    light.specular = color;
    this.setState({currentLight: light});
  },

  onCurrentLightSelect: function(index){
    this.setState({currentLight: graphicsEngine.scene.lights[index]});
  },

  onLightDelete: function(){
    var index = graphicsEngine.scene.lights.indexOf(this.state.currentLight);
    if (index <= -1) return

    graphicsEngine.scene.lights.splice(index, 1);
    if(graphicsEngine.scene.lights.length > 0){
      var newCurrent = graphicsEngine.scene.lights[graphicsEngine.scene.lights.length-1];
    } else {
      var newCurrent = undefined;
    }

    this.setState({
      lights: graphicsEngine.scene.lights,
      currentLight: newCurrent
    });
  },

  render: function(){
    return <form id='lights-controls' className='mdl-grid'>
      <LightsList lights={this.state.lights}
                  currentLight={this.state.currentLight}
                  onLightCreate={this.onLightCreate}
                  onCurrentLightSelect={this.onCurrentLightSelect} />

      <LightSettings  light={this.state.currentLight}
                      onLightDelete={this.onLightDelete}
                      onIntensityChange={this.onIntensityChange}
                      onPositionChange={this.onLightPositionChange}
                      onDirectionChange={this.onLightDirectionChange}
                      onCutoffChange={this.onLightCutoffChange}
                      onColorChange={this.onLightColorChange}
                      onNameChange={this.onLightNameChange}
                      onStatusChange={this.onLightStatusChange} />
    </form>
  }
});
