/**
 * REFERENCE: forever
 * 		http://stackoverflow.com/questions/12701259/how-to-make-a-node-js-application-run-permanently
 * 		TO RUN THIS APP: forever srvr.js
 * 
 * REFERENCE: https
 * 		https://blog.xervo.io/build-your-first-http-server-in-nodejs
 */

var http = require('http');
var request = require('request');
const PORT=8080;
var Boom = require('boom');

/*
	// Breakdown of Boom objects
	isBoom
	isServer
	output
		statusCode
		payload
			statusCode 
			error 
			message
		headers
	message
	isDeveloperError
*/

function handleRequest(req, resp){

	let user = req.url.substr(1);
	let urlstring = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

	request.get({
		url: urlstring,
		qs: {count: 10, screen_name: user},
	    method: 'GET',
	    headers: {
	        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAPSUzwAAAAAAyzcPjx68z3nBFNnbJXecuzpSsJ8%3DujPU0YtH0vUetTzJRl1OY2xeXg4VptbzidLvzROLpr9d9qd6J3',
	        'User-Agent': 'SelectedPolitics',
	        'Host': 'api.twitter.com'
	    }
	}, function(error, response, body){ 
	    if(error) {
	    	//console.log('internal error');
	    	resp.end(JSON.stringify(Boom.badImplementation())); 
	    } else if (response.statusCode === 200) {
	    	//console.log('ok, no error');
	    	resp.end(body); 
	    } else {
	    	//console.log('common error');
	    	var boomErr;
	    	switch (response.statusCode) {
	    		// 4xx errors
	    		case 400:
	    			boomErr = Boom.badRequest();
	    			break;
	    		case 401:
	    			boomErr = Boom.unauthorized();
	    			break;
	    		case 402:
	    			boomErr = Boom.paymentRequired();
	    			break;
	    		case 403:
	    			boomErr = Boom.forbidden();
	    			break;
	    		case 404:
	    			boomErr = Boom.notFound();
	    			break;
	    		case 405:
	    			boomErr = Boom.methodNotAllowed();
	    			break;
	    		case 406:
	    			boomErr = Boom.notAcceptable();
	    			break;
	    		case 407:
	    			boomErr = Boom.proxyAuthRequired();
	    			break;
	    		case 408:
	    			boomErr = Boom.clientTimeout();
	    			break;
	    		case 409:
	    			boomErr = Boom.conflict();
	    			break;
	    		case 410:
	    			boomErr = Boom.resourceGone();
	    			break;
	    		case 411:
	    			boomErr = Boom.lengthRequired();
	    			break;
	    		case 412:
	    			boomErr = Boom.preconditionFailed();
	    			break;
	    		case 413:
	    			boomErr = Boom.entityTooLarge();
	    			break;
	    		case 414:
	    			boomErr = Boom.uriTooLong();
	    			break;
	    		case 415:
	    			boomErr = Boom.unsupportedMediaType();
	    			break;
	    		case 416:
	    			boomErr = Boom.rangeNotSatisfiable();
	    			break;
	    		case 417:
	    			boomErr = Boom.expectationFailed();
	    			break;
	    		case 418:
	    			boomErr = Boom.teapot();
	    			break;
	    		case 422:
	    			boomErr = Boom.badData();
	    			break;
	    		case 423:
	    			boomErr = Boom.locked();
	    			break;
	    		case 428:
	    			boomErr = Boom.preconditionRequired();
	    			break;
	    		case 429:
	    			boomErr = Boom.tooManyRequests();
	    			break;
	    		case 429:
	    			boomErr = Boom.illegal();
	    			break;

		    	// 5xx errors
	    		case 500:
	    			boomErr = Boom.badImplementation();
	    			break;
	    		case 501:
	    			boomErr = Boom.notImplemented();
	    			break;
	    		case 502:
	    			boomErr = Boom.badGateway();
	    			break;
	    		case 503:
	    			boomErr = Boom.serverUnavailable();
	    			break;
	    		case 504:
	    			boomErr = Boom.gatewayTimeout();
	    			break;
	    	}
	    	resp.end(JSON.stringify(boomErr)); 
	    } 
	}); 
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
