export default class RequestManager{

	constructor(storage) {
		this.storage = storage;	
	}

	register(request) {
		this.storage.save(request.url);
	}

	requestCallback(callback) {
		var url = this.storage.get();
		
		callback({ url: url});
	}

	run() {

	}

}