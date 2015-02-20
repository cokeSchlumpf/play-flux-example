define(["dispatcher", "constants"], function(dispatcher, constants) {
	
	return {
		create: function(title, text) {
			dispatcher.dispatch({
				actionType: constants.NOTE_CREATE,
				title: title,
				text: text
			});
		},
		
		edit: function(id) {
			dispatcher.dispatch({
				actionType: constants.NOTE_EDIT,
				id: id
			});
		},
		
		update: function(id, title, text) {
			dispatcher.dispatch({
				actionType: constants.NOTE_UPDATE,
				id: id,
				title: title,
				text: text
			});
		},
		
		lock: function(id) {
			dispatcher.dispatch({
				actionType: constants.NOTE_LOCK,
				id: id
			});
		},
		
		select: function(id) {
			dispatcher.dispatch({
				actionType: constants.NOTE_SELECT,
				id: id
			});
		}
	};
	
});