define(["react", "actions", "./editorReadOnly", "./editorEdit"], function(React, Actions, ReadOnly, Edit) {
	
	return React.createClass({
		render: function() {
			var content;
			
			if (this.props.editMode) {
				content = <Edit {... this.props} />
			} else {
				content = <ReadOnly {... this.props} />
			}
			
			return (
				<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
					{ content }
				</div>
				);
		}
	});
	
});