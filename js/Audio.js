var AudioPlayer = require('web-audio-player');

var _ = require('lodash');

var click1 = AudioPlayer('./audio/sounds/click1.wav');
var click2 = AudioPlayer('./audio/sounds/click2.wav');
var click3 = AudioPlayer('./audio/sounds/click3.wav');
var CLICKS = [click1, click2, click3];

var Audio = {
  playRandomClick: function() {
    var click = _.sample(CLICKS);
    click.play();
    click.node.connect(click.context.destination);
  },

  playBGM: function() {
    this.audio = AudioPlayer('./audio/Fortaleza.mp3', {loop: true, volume: 0.8});
    this.audio.on('load', () => {
      this.audio.play();
      this.audio.node.connect(this.audio.context.destination);
    });
  },

  setVolume: function(vol) {
    this.audio.volume = vol;
    _.forEach(CLICKS, (audio) => {
      audio.volume = vol;
    });
  },
};

module.exports = Audio;
