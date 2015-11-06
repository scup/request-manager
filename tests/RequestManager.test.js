import RequestManager from "../src/RequestManager";
import chai from "chai";
import sinon from "sinon";
import {ClientRequest} from "http";

describe("Request", function(){
	describe("#register", function(){
		it("should register request and save on queue adapter", function(done){
			// Given
			var expectedUrl = "http://scup.com.br";
			var storageStub = {
				"save" : function(url){
					// Then
					chai.assert.equal(expectedUrl, url);
					done();
				}
			};

			// When
			var requestManager = new RequestManager(storageStub);
			ClientRequest.url = expectedUrl;
			requestManager.register(ClientRequest);
		});		
	});

	describe("#resquestCallback", function() {
		it("should execute registered request from storage", function (done) {
			// given

			var expectedUrl = "http://scup.com.br";
			var storageStub = {
				"save" : function(url){
					// Need this guy
				},

				"get" : function(){
					// Then
					return expectedUrl;
				}

			};

			// When
			var requestManager = new RequestManager(storageStub);

			ClientRequest.url = expectedUrl;

			requestManager.register(ClientRequest);
			requestManager.requestCallback(function (request) {
				chai.assert.equal(expectedUrl, request.url);
				done();
			});

			requestManager.run();	
		})
	});
});