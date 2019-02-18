window.CheckboxField = React.createClass({
  componentDidMount: function(){
    var input = React.findDOMNode(this.refs.switch);
    componentHandler.upgradeElement(input);
  },

  componentDidUpdate: function(){
    var input = React.findDOMNode(this.refs.switch);
    input.MaterialSwitch.checkToggleState();
  },

  handleChange: function(event){
    var input = React.findDOMNode(this.refs.input);
    this.props.onChange(input.checked);
  },

  render: function(){
    var labelText = this.props.name[0].toUpperCase() + this.props.name.slice(1, this.props.name.length);

    return <div className='mdl-grid input-container'>
      <div className='mdl-cell mdl-cell--4-col'></div>
      <div className='mdl-cell mdl-cell--6-col'>
        <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' ref='switch'>
          <input  className="mdl-switch__input"
                  ref='input'
                  type='checkbox'
                  name={this.props.name}
                  id={this.props.name}
                  checked={this.props.checked}
                  onChange={this.handleChange}/>
          <span className="mdl-switch__label" htmlFor={this.props.name}>{labelText}</span>
        </label>
      </div>
    </div>
  }
});