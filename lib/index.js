/**
 * Dependencies.
 */

const makeText = require('./makeText');

/**
 * Library tts
 * Usage:
 * tts = require("@carrismetropolitana/tts");
 * tts.makeText()
 */

const tts = {
  makeText: makeText, // Usage: tts.makeText('string', {modes}) => Phonetic String
  makeAudio: null, // to be implemented
};

/* * */

module.exports = tts;
