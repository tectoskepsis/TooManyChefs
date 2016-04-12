var _ = require('lodash');

var Sound = createjs.Sound;

const AUDIO_PATH = './audio/sounds/';
const BGM = './audio/Fortaleza.mp3';
const CLICKS = ['click1', 'click2', 'click3'];
const SOUNDS = ['click1', 'click2', 'click3', 'blender', 'boop', 'cork', 'cupboard', 'cutlery', 'frying', 'mixer', 'pouring', 'sink', 'slice'];

var soundManifest = SOUNDS.map((se) => {
  return {id: se, src: AUDIO_PATH + se + '.wav'};
});
soundManifest.push({id: 'bgm', src: BGM});

var Audio = {
  audio: null,
  playing: {},

  // TODO: load only BGM first, then SE after game start
  loadAllSounds: function(onLoad, onError) {
    var queue = new createjs.LoadQueue(true);
    queue.installPlugin(Sound);
    queue.on('complete', onLoad, this);
    queue.on('error', onError, this);
    queue.loadManifest(soundManifest);
  },

  playRandomClick: function() {
    Sound.play(_.sample(CLICKS));
  },

  playBGM: function() {
    this.audio = Sound.play('bgm', {loop: -1});
  },

  // TODO: return _.uniqueId and map each new instance to different sound
  playSE: function(sound) {
    if (_.has(this.playing, sound)) {
      this.playing[sound].play();
      return;
    }
    this.playing[sound] = Sound.play.apply(this, arguments);
  },

  pauseSE: function(sound) {
    if (_.has(this.playing, sound)) {
      this.playing[sound].paused = true;
    }
  },

  stopSE: function(sound) {
    if (_.has(this.playing, sound)) {
      this.playing[sound].stop();
    }
  },

  stopAllSounds: function() {
    _.forEach(this.playing, (sound) => sound.stop());
  },

  setVolume: function(vol) {
    Sound.volume = vol;
    this.volume = vol;
  },
};

module.exports = Audio;
