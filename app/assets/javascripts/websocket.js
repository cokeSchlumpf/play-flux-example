require(["jquery"], function($) {

	var url, ws;
	
	url = $("meta[name='websocketurl']").attr("content");
	ws = new WebSocket(url);
	
	ws.onmessage = function(event) {
		console.log(event.data);
	};
	
	ws.onopen = function() {
		var message = {
			actionType: "sayHello",
			message: "Hallo Freunde auf dem Server!"
		};
		
		ws.send('{"actionType": "sayHello", "message":"HORST!"}');
	};
	
});
