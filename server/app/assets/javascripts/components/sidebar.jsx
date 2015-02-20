define(["react", "./sidebarItem"], function(React, SidebarItem) {
	return React.createClass({
		render: function() {
			var notes = [];
			for (var id in this.props.notes) {
				notes.push(<SidebarItem key={ id } id={ id } title={ this.props.notes[id].title } selected={ this.props.selected } />);
			}

			return (
				<div className="col-sm-3 col-md-2 sidebar">
					<ul className="nav nav-sidebar">
						{ notes }
					</ul>
				</div>
				);
		}
	});
});