var _ = require('lodash');

var Sound = createjs.Sound;

const AUDIO_PATH = './audio/sounds/';
const VOICE_PATH = './audio/sounds/voice/';
const BGM = './audio/Fortaleza.mp3';
const CLICKS = ['click1', 'click2', 'click3'];
const GOOD_VOICES = ['excellent', 'welldone', 'fantastic', 'brilliant', 'remarkable', 'terrific', 'sensational', 'sublime', 'wonderful', 'marvelous', 'firstclass', 'sterling', 'superb', 'delicious', 'dandy', 'peachy'];
const BAD_VOICES = ['disgraceful', 'no', 'oops', 'pathetic', 'sloppy', 'tsktsk', 'shoddy'];

// NOTE (unused sounds): cork, cutlery1, cutlery2, grinder
const SOUNDS = ['click1', 'click2', 'click3', 'blender', 'boop', /*'cork',*/ 'cupboard', /*'cutlery1', 'cutlery2',*/ 'frying', /*'grinder',*/ 'mixer', 'pouring', 'sink', 'slice', 'eggcrack', 'eggbeat1', 'eggbeat2', 'microwave', 'phone1', 'phone2', 'phone3', 'money'];
const VOICES = ['horsdoeuvre', 'excellent', 'welldone', 'fantastic', 'brilliant', 'remarkable', 'terrific', 'sensational', 'sublime', 'disgraceful', 'no', 'oops', 'failure', 'newrecord', 'pathetic', 'sloppy', 'tsktsk', 'shoddy', 'success', 'wonderful', 'marvelous', 'firstclass', 'sterling', 'superb', 'ready', 'begin', 'start', 'staff', 'loading', 'help', 'solo', 'party', 'yum', 'ouch', 'delicious', 'halibut', 'bacchetta', 'dandy', 'butyraceous', 'peachy', 'haha'];


function genManifest(path, se) {
  return {id: se, src: path + se + '.mp3'};
}
var soundManifest = SOUNDS.map(_.partial(genManifest, AUDIO_PATH))
            .concat(VOICES.map(_.partial(genManifest, VOICE_PATH)));
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

  playGoodVoice: function() {
    Sound.play(_.sample(GOOD_VOICES));
  },

  playBadVoice: function() {
    Sound.play(_.sample(BAD_VOICES));
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
    this.playing = {};
  },

  setVolume: function(vol) {
    Sound.volume = vol;
    this.volume = vol;
  },
};

module.exports = Audio;
