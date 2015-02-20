define(["react", "actions"], function(React, Actions) {
	
	return React.createClass({
		render: function() {
			return (
				<li className={ this.props.selected == this.props.id ? "active" : "" }><a href="#" onClick={ this._handleClick }>{ this.props.title }</a></li>
				);
		},
		
		_handleClick: function(e) {
			Actions.select(this.props.id);
			e.preventDefault();
		}
	});
	
});