$(document).ready(function(){

	var searchwords = ["I am", "I need a hero", "let your heart", "my mind", "step away", "superhuman", "someone save me", "save me now", "the morning light", "world gone mad"]

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

	var getSelected = function(){
		var text = '';
		if (window.getSelection){
			t = window.getSelection();
		}else if (document.getSelection){
			t = document.getSelection();
		}else if (document.selection){
			t = document.selection.createRange().text;
		};
		return t;
	};

	var wrap = function(selected){
		return $('<a>').attr('href', '#').attr('class', 'swap').text(selected);
	};

	$("#lyric_container").on("click", ".swap", function(){
		var redir = $(this).text();
		$.post("/song/lyrics", {artist: null, title: redir}, function(){
			location.reload();
		});
		return false;
	});

	$("#lyric_container").mouseup(function(){
		var string = getSelected();
		if (string != ""){
			var newString = $('<div>').append(wrap(string)).html()
			, newHtml = $("#lyric_container").html().replace(string, newString);
			$("#lyric_container").html(newHtml);
		};
	});

})