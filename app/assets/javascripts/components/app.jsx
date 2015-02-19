define(["react", "store", "./sidebar"], function(React, NoteStore, Sidebar) {

	function getNotesState() {
		return {
			notes: NoteStore.getAll(),
			selected: NoteStore.getSelected()
		}
	}
	
	return React.createClass({
		getInitialState: function() {
			return getNotesState();
		},
		
		componentDidMount: function() {
			NoteStore.addChangeListener(this._onChange);
		},
		
		componentWillUnmount: function() {
			NoteStore.removeChangeListener(this._onChange);
		},
		
		render: function() {			
			return (
				<div className="container-fluid">
					<div className="row">
						<Sidebar notes={ this.state.notes } selected={ this.state.selected } />
					</div>
				</div>
				);
		},
		
		_onChange: function() {
			this.setState(getNotesState());
		}
	});
	
});