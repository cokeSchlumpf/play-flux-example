define(["react", "actions"], function(React, Actions) {
	
	return React.createClass({
		render: function() {
			var content;
			
			if (this.props.note) {
				var button;
				
				if (this.props.note.locked) {
					button = (<button type="button" className="btn btn-primary" disabled="disabled">Lock &amp; Edit</button>)
				} else {
					button = (<button type="button" className="btn btn-primary" onClick={ this._onClickEdit }>Lock &amp; Edit</button>)
				}
				
				content =
					<div>
						<h1>{ this.props.note.title }</h1>
						<p>{ this.props.note.text }</p>
						<br /><br />
						{ button }
					</div>;
			} else {
				content = <p>Please select a note ...</p>;
			}
			
			return content;
		},
		
		_onClickEdit: function() {
			Actions.edit(this.props.note.id);
		}
	});
	
});