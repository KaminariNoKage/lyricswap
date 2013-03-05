
/*
 * GET home page.
 */

var echojs = require('echojs')
	, echo = echojs({ key: "NAJD5Y2HDK92QOSQ6" })
	, util  = require("util")
	, mXm   = require("musixmatch");

mXm.Config.API_KEY = "4e2517913ad56d96d7a085205fc0cd37";

var fixList = function(text){
	var searchwords = ["I am", "I need a hero", "let your heart", "my mind", "step away", "superhuman", "someone save me", "save me now", "the morning light", "world gone mad"]

};

exports.index = function(req, res){
	if (req.session.user == null){
		req.session.user = {active: "Search For a Song"};
	};
	res.render('index', {title: 'Lyrics Swap', lyrics: req.session.user.active});
};


