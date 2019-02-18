window.LightsList = React.createClass({
  handlePointLightCreate: function(event){
    event.preventDefault();
    this.props.onLightCreate(Engine.LightSource.Point);
  },

  handleSpotLightCreate: function(event){
    event.preventDefault();
    this.props.onLightCreate(Engine.LightSource.Spotlight);
  },

  render: function(){
    var lights = this.props.lights.map(function(light, i){
      return <li key={'light-'+i}>
        <LightItem
          light={light}
          currentLight={this.props.currentLight}
          index={i}
          onCurrentLightSelect={this.props.onCurrentLightSelect} />
      </li>
    }.bind(this));

    return <div className='mdl-cell mdl-cell--4-col' id='lightSelect'>
      <ul>{lights}</ul>

      <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              id='addPointLightSourceBtn'
              onClick={this.handlePointLightCreate}>
        <i className='material-icons'>add</i>
        <i className='material-icons'>wb_incandescent</i>
      </button>

      <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              id='addSpotLightSourceBtn'
              onClick={this.handleSpotLightCreate}>
        <i className='material-icons'>add</i>
        <i className='material-icons'>signal_wifi_4_bar</i>
      </button>
    </div>
  }
})
