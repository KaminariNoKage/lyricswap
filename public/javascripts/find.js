$(document).ready(function(){

	$("#find_song").click(function(){
		/*if ($("#artist_name").val() == ""){
			alert("Please Enter an Artist's Name");
		}
		else */if ($("#song_name").val() == ""){
			alert("Please Enter a Song Name");
		}
		else{
			var artist = $("#artist_name").val()
				, title = $("#song_name").val();
			$.post("/song/lyrics", {artist: artist, title: title}, function(){
				location.reload();
			});
			return false;
		};
	});

	$(".swap").click(function(){
		var redir = this.id;
		$.post("/song/lyrics", {artist: null, title: redir}, function(){
			location.reload();
		});
		return false;
	});

	//Go through lyrics and replace text with Links
	//which, when clicked, change the displayed song
	var replaceLyrics = function(keywords){
		//Get the content of the div containing the lyrics
		var all_lyrics = $("#lyric_container").text();
		console.log(all_lyrics);
		//Filter through and replace the key words with their respective links
		//Class name: .swap, id: song/keywords with lead to the songs
		for(var i=0; i < keywords.length; i++){
			var curstring = keywords[i];
			if (all_lyrics.contains(curstring)){

				//get found text,

			};
		};
	};

	replaceLyrics(searchwords);

})