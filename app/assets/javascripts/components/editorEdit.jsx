define(["react", "actions"], function(React, Actions) {
	
	return React.createClass({
		getInitialState: function() {
			return {
				title: this.props.note.title,
				text: this.props.note.text
			};
		},
		
		render: function() {
			var content = 
				<div>
					<div className="form-group">
						<label>Title</label>
						<input type="text" className="form-control" placeholder="Title" defaultValue={ this.props.note.title } onChange={ this._onChangeTitle } />
					</div>
					<div className="form-group">
						<label>Text</label>
						<textarea className="form-control" rows="10" defaultValue={ this.props.note.text } onChange={ this._onChangeText } />
					</div>
					<div>
						<button type="button" className="btn btn-primary" onClick={ this._onClickUpdate }>Save & Unlock</button>
					</div>
				</div>;
				
			return content;
		},
		
		_onClickUpdate: function() {
			Actions.update(this.props.note.id, this.state.title, this.state.text);
		},
		
		_onChangeTitle: function(event) {
			this.setState({ title: event.target.value });
		},
		
		_onChangeText: function(event) {
			this.setState({ text: event.target.value });
		}
	});
	
});