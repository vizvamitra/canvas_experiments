window.Range = React.createClass({
  componentDidMount: function(){
    var input = React.findDOMNode(this.refs.input);
    componentHandler.upgradeElement(input);
  },

  componentDidUpdate: function(){
    var input = React.findDOMNode(this.refs.input);
    input.MaterialSlider.change(this.props.value);
  },

  handleChange: function(event){
    var input = React.findDOMNode(this.refs.input);
    var output = React.findDOMNode(this.refs.output);
    output.innerHTML = input.value;
    this.props.onChange(input.value);
  },

  render: function(){
    var labelText = this.props.name.replace(/^./, function(ch){return ch.toUpperCase()}).replace('_', ' ');

    return <div className='mdl-grid range-container'>
      <div className='mdl-cell mdl-cell--3-col'>
        <label htmlFor={this.props.name}>{labelText}</label>
      </div>
      <div className='mdl-cell mdl-cell--7-col'>
        <input className='mdl-slider mdl-js-slider' type='range'
                                                    ref='input'
                                                    name={this.props.name}
                                                    id={this.props.name}
                                                    min={this.props.min}
                                                    max={this.props.max}
                                                    step={this.props.step} 
                                                    value={this.props.value}
                                                    onChange={this.handleChange} />
      </div>
      <div className='mdl-cell mdl-cell--2-col'>
        <output ref='output'>{this.props.value}</output>
      </div>
    </div>
  }
});