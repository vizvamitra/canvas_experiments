window.LightSettings = React.createClass({
  handleLightDelete: function(event){
    event.preventDefault();
    this.props.onLightDelete();
  },

  onIntensityChange: function(){
    var intensity = parseFloat( document.querySelector('input#intensity').value );
    this.props.onIntensityChange(intensity);
  },

  onPositionChange: function(){
    var angle = radians(parseInt(document.querySelector('input#position').value));
    var height = parseFloat(document.querySelector('input#height').value) - 1.25;
    var distance = parseFloat(document.querySelector('input#distance').value);

    var newPosition = vec4(
      distance*Math.sin(angle),
      height,
      distance*Math.cos(angle),
      1.0
    );

    this.props.onPositionChange(newPosition);
  },

  onTemperatureChange: function(value){
    var rgb = colorTemperature2rgbUsingTH(value);
    this.props.onColorChange(vec4(rgb.red/255, rgb.green/255, rgb.blue/255, 1.0));
  },

  render: function(){
    if (this.props.light === undefined) {
      return <div className='mdl-cell mdl-cell--8-col' id='lightSettings'>
        <p>Light is not selected</p>
      </div>
    } else {
      var light = this.props.light;
      var intensity = light.intensity;
      var name = (this.props.light.name === '') ? 'unnamed' : this.props.light.name;
      var height = (light.position[1] + 1.25).toFixed(2);
      var distance = Math.sqrt(light.position[0]*light.position[0] + light.position[2]*light.position[2]).toFixed(2);
      var angle = polarAngleFromCoords(light.position[2], light.position[0]);
      var temperature = rgb2colorTemperature({red: light.diffuse[0], green: light.diffuse[1], blue: light.diffuse[2]});

      if (light.isPointLight) {
        var settings = <PointLightSettings  light={light}
                                            intensity={intensity}
                                            angle={angle}
                                            height={height}
                                            distance={distance}
                                            temperature={temperature}
                                            onPositionChange={this.onPositionChange}
                                            onIntensityChange={this.onIntensityChange}
                                            onTemperatureChange={this.onTemperatureChange} />
      } else if (light.isSpotLight) {
        var settings = <SpotLightSettings light={light}
                                          intensity={intensity}
                                          angle={angle}
                                          height={height}
                                          distance={distance}
                                          temperature={temperature}
                                          onPositionChange={this.onPositionChange}
                                          onIntensityChange={this.onIntensityChange}
                                          onTemperatureChange={this.onTemperatureChange}
                                          onDirectionChange={this.props.onDirectionChange}
                                          onCutoffChange={this.props.onCutoffChange} />
      }

      return <div className='mdl-cell mdl-cell--8-col' id='lightSettings'>
        <fieldset>
          <legend>
            <span>{name.toUpperCase()}</span>
            <button className="mdl-button mdl-js-button mdl-button--icon"
                    onClick={this.handleLightDelete}>
              <i className="material-icons">delete</i>
            </button>
          </legend>

          <CheckboxField  name='enabled'
                          checked={this.props.light.enabled}
                          onChange={this.props.onStatusChange} />

          <TextField  name='name'
                      value={this.props.light.name}
                      onChange={this.props.onNameChange} />

          {settings}
        </fieldset>
      </div>
    }
  }
});