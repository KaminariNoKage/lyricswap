
/*
 * GET users listing.
 */

var echojs = require('echojs')
	, echo = echojs({ key: "NAJD5Y2HDK92QOSQ6" })
	, util  = require("util")
	, mXm   = require("musixmatch");

mXm.Config.API_KEY = "4e2517913ad56d96d7a085205fc0cd37";

//Randomizes array
var shuffle = function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};

exports.getLyrics = function(req, res){
	echo('song/search').get({
		artist: req.body.artist ,
		title: req.body.title ,
		bucket: 'id:musixmatch-WW'
	}, function (err, json) {
		var songs = json.response.songs
			, flt_songs = [];
		for (var el=0; el<songs.length; el++){
			var temp = songs[el].foreign_ids;
			if (temp.length > 0){
				flt_songs.push(songs[el]);
			};
		};

		var artist = req.body.artist
			, songname = req.body.title;
		//sweeps through a list of songs until finds something with lyrics
		var tryget = function(songid, callback){
			var successCallback = function(modelOrCollection) {
				var lyric_extract = modelOrCollection.attributes.lyrics_body
					, copyright = modelOrCollection.attributes.lyrics_copyright
					, lyrics = lyric_extract.replace("******* This Lyrics is NOT for Commercial use *******", copyright);

				callback(lyrics);
			};

			mXm.API.getLyrics(songid, successCallback);
		};


		if (flt_songs.length > 0){

			//Randomize the filtered song list
			if (flt_songs.length > 1){
				flt_songs = shuffle(flt_songs);				
			};

			var sweepList = function(x, y){
				req.session.user == {active: null};
				var all = flt_songs;

				if (all[x] !== undefined && all[x].foreign_ids[y] !== undefined){
					var song_id = flt_songs[x].foreign_ids[y].foreign_id;

					tryget(song_id.replace("musixmatch-WW:song:", ""), function(lyrics){
						if (lyrics){
							var artist = " by " + flt_songs[x].artist_name
								, songname = flt_songs[x].title;
							req.session.user = {artist: artist, songname: songname, active: lyrics};
							return res.redirect('/');
						}
						else{
							//Going through list of filtered songs trying to find lyrices
							if (x >= all.length){
								req.session.user = {active: "No songs were found"};
								return res.redirect('/');
							}
							else if (y >= all[x].foreign_ids.length){
								console.log("next");
								sweepList(x+1, 0);
							}
							else{
								console.log("and next");
								sweepList(x, y+1);
							};
						};
					});
				};
			}
			sweepList(0, 0);
		}
		else{
			req.session.user = {active: "No Songs were found"};
			return res.redirect('/');
		};
		
	});
};

exports.about = function(req, res){
	res.render('about', {title: 'Lyrics Swap'});
};