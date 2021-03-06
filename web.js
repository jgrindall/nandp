var express = require("express");
var app = express();
var wkhtmltopdf = require('wkhtmltopdf');
var port = Number(process.env.PORT || 5000);
var exec = require('child_process').exec;
var fs = require('fs');
var wkhtmltopdf_path = process.env.PORT ? './bin/wkhtmltopdf-linux-amd64' : 'wkhtmltopdf';
var pdf_path = './public/gen/resume.pdf';
var pdf_url = 'http://www.numbersandpictures.com/#contact';
var mkdirp = require('mkdirp');
var alwaysGeneratePdf = false;

var makeGen = function(options){
	mkdirp('./public/gen', function(err) { 
		console.log("err is "+err);
		options.success();
	});
};


var generatePdf = function(options){
	makeGen({"success":function(){
		var child = exec([wkhtmltopdf_path, '--print-media-type', pdf_url, pdf_path].join(' '),	
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			else{
				console.log('DONE');
				options.success();
			}
		});
	}});
};

var getPdf = function(options){
	var stream = null;
	fs.readFile(pdf_path, function(error, content) {
		if (error) {
			options.success(null);
		}
		else {
			console.log("success!");
			options.success(content);
		}
	});
};

app.configure(function(){
	app.set("view engine", "jade");
	app.use(express.static(__dirname+"/public"));
});

app.get('/', function(req, res) {
	res.render("index");
});

app.get('/resume', function(req, res) {
	var content;
	fs.exists(pdf_path, function(exists) {
		console.log("exists "+exists);
		if (exists && !alwaysGeneratePdf){
			getPdf({"success":function(content){
				res.writeHead(200, { 'Content-Type': 'application/pdf' });
				res.end(content, 'utf-8');
			}});
		}
		else{
			generatePdf({"success":function(){
				console.log("get pdf");
				getPdf({"success":function(content){
					console.log("success");
					res.writeHead(200, { 'Content-Type': 'application/pdf' });
					res.end(content, 'utf-8');
				}});
			}});
		}
	});
});


app.listen(port, function() {
  console.log("Listening on " + port);
});



  

