window.LightItem = React.createClass({

  handleCurrentLightSelect: function(event){
    event.preventDefault();
    this.props.onCurrentLightSelect(this.props.index);
  },

  render: function(){
    var className = 'mdl-button mdl-js-button';
    if (this.props.light === this.props.currentLight) className += ' mdl-button--raised';
    if (!this.props.light.enabled) className += ' mdl-button--disabled';
    var name = (this.props.light.name === '') ? 'unnamed' : this.props.light.name;
    var icon = (this.props.light.isPointLight) ? 'wb_incandescent' : 'signal_wifi_4_bar'

    return <button  className={className}
                    onClick={this.handleCurrentLightSelect}>
      <i className='material-icons'>{icon}</i> 
      <span> {name}</span>
    </button>
  }
})