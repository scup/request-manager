import RequestManager from "../src/RequestManager";
import chai from "chai";
import sinon from "sinon";
import {ClientRequest} from "http";
import lolex from "lolex";


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
            requestManager.registerRequest(ClientRequest);
        });     
    });

    describe("#registerCallback", function() {

        before(function(){
            this.clock = lolex.install();
        });

        after(function(){
            this.clock.uninstall();
        });

        it("should execute registered request from storage", function () {
            // Given
            var expectedUrl = "http://scup.com.br";
            var storageStub = {
                "save" : function(url){
                    // Need this guy
                },

                "get" : function(){
                    return [expectedUrl];
                }

            };

            // When
            var requestManager = new RequestManager(storageStub);

            ClientRequest.url = expectedUrl;

            requestManager.registerRequest(ClientRequest);
            requestManager.registerCallback(function (request) {
                // Then
                console.log('request.url', request.url)
                console.log('expectedUrl', expectedUrl)
                console.log('mindfuck', request.url === expectedUrl)
                chai.assert.equal(expectedUrl, request.url);

            });

            requestManager.run();
            this.clock.tick(60000);
        });

        it("should execute registered callback only when run is called", function () {
            // Given
            this.timeout = 70000;
            var expectedUrl = "http://scup.com.br";
            var storageStub = {
                "save" : function(url){
                    // Need this guy
                },

                "get" : function(){
                    return [expectedUrl];
                }

            };
            var spyCallback = sinon.spy();

            // When
            var requestManager = new RequestManager(storageStub);

            ClientRequest.url = expectedUrl;

            requestManager.registerRequest(ClientRequest);
            requestManager.registerCallback(spyCallback);

            //Then
            chai.assert.equal(false, spyCallback.called);
            requestManager.run();

            this.clock.tick(60000);
            chai.assert.equal(true, spyCallback.called);

        });
    });

    describe("#run", function() {
        
        before(function(){
            this.clock = lolex.install();
        });

        after(function(){
            this.clock.uninstall();
        });


        it("should execute 3 requests in on cycle", function() {
            // Given
            this.timeout = 130000;
            var expectedUrl = "http://scup.com.br";
            var storageStub = {
                "save" : function(url) {
                    // Need this guy
                },

                "get" : function() {
                    // return expectedUrl;
                }

            };

            var spyCallback = sinon.spy();

            // When
            var requestManager = new RequestManager(storageStub);

            ClientRequest.url = expectedUrl;

            requestManager.registerRequest(ClientRequest);
            requestManager.registerCallback(spyCallback);

            //Then
            chai.assert.equal(false, spyCallback.called);
            requestManager.run();

            this.clock.tick(60000);
            chai.assert.equal(3, spyCallback.callCount);

            this.clock.tick(60000);
            chai.assert.equal(6, spyCallback.callCount);

        });        
    });
});