var echojs = require('echojs');

var echo = echojs({
  key: "NAJD5Y2HDK92QOSQ6"
});

// http://developer.echonest.com/docs/v4/song.html#search
echo('song/search').get({
  artist: 'Lady Gaga',
  title: 'Edge of Glory'
}, function (err, json) {
  console.log(json.response);
});