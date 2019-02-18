window.SpotLightSettings = React.createClass({
  onCutoffChange: function(){
    var cutoff = parseInt(document.querySelector('input#cutoff').value);
    this.props.onCutoffChange(cutoff);
  },

  onDirectionChange: function(){
    var newAngles = {
      horisontal: parseInt(document.querySelector('input#horisontal_direction').value),
      vertical: parseInt(document.querySelector('input#vertical_direction').value)
    }

    this.props.onDirectionChange(newAngles);
  },

  render: function(){
    return <div className='ranges'>
      <Range  name='intensity'
              min='0.1'
              max='5'
              step='0.1'
              value={this.props.intensity}
              onChange={this.props.onIntensityChange} />

      <Range  name='position'
              min='0'
              max='360'
              step='1'
              value={degrees(this.props.angle).toFixed(0)}
              onChange={this.props.onPositionChange} />

      <Range  name='height'
              min='0'
              max='2.5'
              step='0.01'
              value={this.props.height}
              onChange={this.props.onPositionChange} />

      <Range  name='distance'
              min='0.0'
              max='2.5'
              step='0.01'
              value={this.props.distance}
              onChange={this.props.onPositionChange} />

      <Range  name='horisontal_direction'
              min='0'
              max='360'
              step='1'
              value={this.props.light.angles.horisontal}
              onChange={this.onDirectionChange} />

      <Range  name='vertical_direction'
              min='-90'
              max='90'
              step='1'
              value={this.props.light.angles.vertical}
              onChange={this.onDirectionChange} />

      <Range  name='cutoff'
              min='10'
              max='90'
              step='1'
              value={this.props.light.cutoff}
              onChange={this.onCutoffChange} />

      <Range  name='temperature'
              min='1000'
              max='15000'
              step='100'
              value={Math.round(this.props.temperature/100)*100}
              onChange={this.props.onTemperatureChange} />
    </div>
  }
});