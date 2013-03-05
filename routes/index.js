
/*
 * GET home page.
 */

var echojs = require('echojs')
	, echo = echojs({ key: "NAJD5Y2HDK92QOSQ6" })
	, util  = require("util")
	, mXm   = require("musixmatch");

mXm.Config.API_KEY = "4e2517913ad56d96d7a085205fc0cd37";

var fixList = function(text){
	var sorted = []
		, list = text.split("\n");
	for (var i=0; i < list.length; i++){
		var wordsec = list[i].trim();
		sorted.push(wordsec);
	};
	return sorted;
};

exports.index = function(req, res){
	if (req.session.user == null){
		req.session.user = {artist: "", songname: "",active: "Search For a Song"};
	};
	
	res.render('index', {title: 'Lyrics Swap', artist: req.session.user.artist, songname: req.session.user.songname, lyrics: fixList(req.session.user.active)});
};


