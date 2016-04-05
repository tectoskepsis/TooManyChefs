var AudioPlayer = require('web-audio-player');

var _ = require('lodash');

var click1 = AudioPlayer('./audio/sounds/click1.wav');
var click2 = AudioPlayer('./audio/sounds/click2.wav');
var click3 = AudioPlayer('./audio/sounds/click3.wav');
const CLICKS = [click1, click2, click3];

var SoundEffects = {
  playRandomClick: function() {
    var click = _.sample(CLICKS);
    click.play();
    click.node.connect(click.context.destination);
  },
};

module.exports = SoundEffects;
