define(["react", "store", "./sidebar", "./editor"], function(React, NoteStore, Sidebar, Editor) {

	function getNotesState() {
		return {
			notes: NoteStore.getAll(),
			selected: NoteStore.getSelected(),
			editMode: NoteStore.isEditMode()
		}
	}
	
	var App = React.createClass({
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
			var selectedNote;
			
			selectedNote = this.state.selected ? this.state.notes[this.state.selected] : undefined;
			
			return (
				<div className="container-fluid">
					<div className="row">
						<Sidebar notes={ this.state.notes } selected={ this.state.selected } />
						<Editor note={ selectedNote } editMode={ this.state.editMode }/>
					</div>
				</div>
				);
		},
		
		_onChange: function() {
			this.setState(getNotesState());
		}
	});
	
	React.render(<App />, document.getElementById("react"));
	
});