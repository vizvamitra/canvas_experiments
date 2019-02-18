window.TextField = React.createClass({
  componentDidMount: function(){
    var input = React.findDOMNode(this.refs.textfield);
    componentHandler.upgradeElement(input);
  },

  handleChange: function(event){
    var input = React.findDOMNode(this.refs.input);
    this.props.onChange(input.value);
  },

  render: function(){
    var labelText = this.props.name[0].toUpperCase() + this.props.name.slice(1, this.props.name.length);

    return <div className='mdl-grid input-container'>
      <div className='mdl-cell mdl-cell--3-col'>
        <label htmlFor={this.props.name}>{labelText}</label>
      </div>
      <div className='mdl-cell mdl-cell--5-col'>
        <div className='mdl-textfield mdl-js-textfield' ref='textfield'>
          <input  className="mdl-textfield__input"
                  ref='input'
                  type='text'
                  size=''
                  name={this.props.name}
                  id={this.props.name}
                  value={this.props.value}
                  onChange={this.handleChange}/>
          <label className="mdl-textfield__label" htmlFor={this.props.name}>{labelText + '...'}</label>
        </div>
      </div>
    </div>
  }
});