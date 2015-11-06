#Request Manager

## Init
```javascript
var RequestManager = require('request-manager');

var config = {
	"rateLimit" : 100,
	"adapter" : {
		"type" : "memory"
	}
};

var requestManager = new RequestManager(config);
```

## Register Request
```javascript

//Restify Example
server.get('/', function (request, res, next) {
  requestManager.register(request);

  ...

  return next();
});
```

## Register Request Callback
```javascript
// Request Callback With 
requestManager.resquestCallback(function(request){

	var result = request(url);

	return result;
});
```