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

function handleRequest(request, response){
	doRequest().then((data) => {
		response.end(data);
	});
}

var doRequest = function () {
	return new Promise ((resolve, reject) => {
		request({
			url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
			qs: {count: 10, screen_name: 'realDonaldTrump'},
		    method: 'GET',
		    headers: {
		        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAPSUzwAAAAAAyzcPjx68z3nBFNnbJXecuzpSsJ8%3DujPU0YtH0vUetTzJRl1OY2xeXg4VptbzidLvzROLpr9d9qd6J3',
		        'User-Agent': 'SelectedPolitics',
		        'Host': 'api.twitter.com'
		    }
		}, function(error, response, body){
		    if(error) {
		        console.log(error);
		    } else {
		    	resolve(body);
		        console.log('tweets retreived');
		    }
		});
	});
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
