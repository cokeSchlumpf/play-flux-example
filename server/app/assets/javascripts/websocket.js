require(["jquery", "shared"], function($, shared) {

	var url, ws;
	
	url = $("meta[name='websocketurl']").attr("content");
	ws = new WebSocket(url);
	
	console.log(new shared.SayGoodbye("Tschöö"));
	
	
	ws.onmessage = function(event) {
		console.log(event.data);
	};
	
	ws.onopen = function() {
		var message = (new shared.SayGoodbye("Tschöö"));
		
		console.log(message instanceof shared.SayGoodbye);
		console.log(message instanceof shared.SayHello);
		
		ws.send(message.toJSON());
	};
	
});
