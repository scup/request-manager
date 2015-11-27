export default class RequestManager{

	constructor(storage) {
		this.storage = storage;	
		this.requestExecuter = undefined;
	}

	registerRequest(request) {
		this.storage.save(request.url);
	}

	registerCallback(callback) {		
		this.requestExecuter = callback;
	}

	run() {
		var url = this.storage.get();
		var cycle = global.setInterval(function(requestExecuter) {
			this.requestExecuter({url: url});
			this.requestExecuter({url: url});
			this.requestExecuter({url: url});
		}.bind(this), 60000)

	}

}