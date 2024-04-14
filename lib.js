/**
 * Dependencies.
 */
const makeTTS = require("./services/makeTTS");

/**
 * Library tts
 * Usage:
 * tts = require("@carrismetropolitana/tts");
 * tts.makeText()
 */
const tts = {
  makeText: makeTTS, // Usage: tts.makeText()
  makeAudio: null, // to be implemented
};

module.exports(tts);
