define([ "dispatcher", "constants", "jquery", "eventemitter" ], function(
		dispatcher, constants, $, EventEmitter) {

	var CHANGE_EVENT = "change", _notes = {
		1 : {
			id : 1,
			title : "Lorem ipsum",
			text : "Sit amet del pbsl lkf asd sfa",
			locked : false
		},

		2 : {
			id : 2,
			title : "Balsd",
			text : "Hallo Bla aks",
			locked : false
		}
	}, _selectedNote, _editMode = false;

	function create(title, text) {
		// Using the current timestamp + random number in place of a real id.
		var id = (+new Date() + Math.floor(Math.random() * 999999))
				.toString(36);
		return update(id, title, text);
	}

	function update(id, title, text) {
		_notes[id] = {
			id : id,
			title : title,
			text : text,
			locked : false
		};
		_editMode = false;
		return _notes[id];
	}

	function lock(id) {
		_notes[id].locked = true;
		return _notes[id];
	}

	function edit(id) {
		_editMode = true;
		return lock(id);
	}

	var NoteStore = $.extend(true, EventEmitter.prototype, {
		isEditMode : function() {
			return _editMode;
		},

		getAll : function() {
			return _notes;
		},

		getSelected : function() {
			return _selectedNote;
		},

		emitChange : function() {
			this.emit(CHANGE_EVENT);
		},

		addChangeListener : function(cb) {
			this.on(CHANGE_EVENT, cb);
		},

		removeChangeListener : function(cb) {
			this.removeListener(CHANGE_EVENT, cb);
		}
	});

	dispatcher.register(function(action) {
		var text, title, id;

		switch (action.actionType) {
		case constants.NOTE_CREATE:
			text = action.text.trim();
			title = action.title.trim();
			if (text !== "" && title !== "") {
				create(title, text);
			}
			break;

		case constants.NOTE_EDIT:
			edit(action.id);
			break;

		case constants.NOTE_UPDATE:
			text = action.text.trim();
			title = action.title.trim();
			if (text !== "" && title !== "") {
				update(action.id, title, text);
			}
			break;

		case constants.NOTE_LOCK:
			lock(action.id);
			break;

		case constants.NOTE_SELECT:
			_selectedNote = action.id;
			break;

		default:
			return;
		}

		NoteStore.emitChange();
	});

	return NoteStore;

});