var _ = require('lodash');

var Sound = createjs.Sound;

const AUDIO_PATH = './audio/sounds/';
const BGM = './audio/Fortaleza.mp3';
const CLICKS = ['click1', 'click2', 'click3'];
const SOUNDS = ['click1', 'click2', 'click3', 'blender', 'boop', 'cork', 'cupboard', 'cutlery1', 'cutlery2', 'frying', 'grinder', 'mixer', 'pouring', 'sink', 'slice', 'eggcrack', 'eggbeat1', 'eggbeat2', 'microwave', 'phone1', 'phone2', 'phone3', 'money', 'horsdoeuvre'];

var soundManifest = SOUNDS.map((se) => {
  return {id: se, src: AUDIO_PATH + se + '.mp3'};
});
soundManifest.push({id: 'bgm', src: BGM});

var Audio = {
  audio: null,
  playing: {},

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

  playSE: function(sound, opt) {
    var soundEffect = _.isArray(sound) ? _.sample(sound) : sound;
    this.playing[soundEffect] = Sound.play(soundEffect, opt);
  },

  unpauseSE: function(sound, opt) {
    // Play paused sound
    if (_.has(this.playing, sound)) {
      this.playing[sound].play();
    } else {
      this.playing[sound] = Sound.play(sound, opt);
    }
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
