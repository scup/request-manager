import RequestManager from "../src/RequestManager";
import chai from "chai";
import sinon from "sinon";
import {ClientRequest} from "http";

describe("Request", function(){
	describe("#register", function(){
		it("should register request and save on queue adapter", function(done){
			// Given
			var expectedUrl = "http://scup.com.br";
			var storage = {
				"save" : function(url){

					// Then
					chai.assert.equal(expectedUrl, url);
					done();

				}
			};
			var requestManager = new RequestManager(storage);

			// When
			ClientRequest.url = expectedUrl;
			requestManager.register(ClientRequest);
		});
	});
});