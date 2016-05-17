var AWS = require("aws-sdk");
var helpers = require("../helpers");

AWS.config.loadFromPath('./config.json');

var task =  function(request, callback){

	var bucket = request.query["bucket"];
 	var key = request.query["key"];
	callback(null, "Dodano do bucket: " + bucket + " " + "za pomoca klucza: " + key);
}

var s3 = new AWS.S3();
var params = {Bucket: bucket, Key: key};

s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response

  var algorithms = request.body.alg ? Object.keys(request.body.alg) : [];
	var loopCount = request.body.loop ? request.body.loop : 1;
	var doc = request.body.txt ? request.body.txt : "";
  
  helpers.calculateMultiDigest(doc, 
		algorithms, 
		function(err, digests) {
			callback(null, digests.join("<br>") + ("<hr>  <br>Service provided by: " + os.hostname()));	
		}, 
		loopCount);
  
  
  });


exports.action = task