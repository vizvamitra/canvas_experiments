window.PointLightSettings = React.createClass({
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

      <Range  name='temperature'
              min='1000'
              max='15000'
              step='100'
              value={Math.round(this.props.temperature/100)*100}
              onChange={this.props.onTemperatureChange} />
    </div>
  }
});