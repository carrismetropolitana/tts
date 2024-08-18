/**
 * Dependencies.
 */

const makeText = require("./makeText");

/**
 * Library tts
 * Usage:
 * tts = require("@carrismetropolitana/tts");
 * tts.makeText()
 */

const tts = {
  makeStop: makeText.makeStop, // Usage: tts.makeStops('stopString', {transferModes}) => Phonetic String
  makePattern: makeText.makePattern, // Usage: tts.makePatterns('string' ) => Phonetic String
  makeText: makeText.makeText, // same as makeStops - legacy alias
};

/* * */

module.exports = tts;
