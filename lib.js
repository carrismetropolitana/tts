/**
 * Dependencies.
 */
const makeTTS = require("./services/makeTTS");

/**
 * Library tts
 * Usage:
 * require("@carrismetropolitana/tts");
 * tts.makeText()
 */
const tts = {
  makeText: makeTTS, // Usage: tts.makeText()
  makeAudio: null, // to be implemented
};

module.exports(tts);
