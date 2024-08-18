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
  makeStop: makeStop, // Usage: tts.makeStops('stopString', {transferModes}) => Phonetic String
  makePattern: makePattern, // Usage: tts.makePatterns('string' ) => Phonetic String
  makeText: makeText, // same as makeStops - legacy alias
};

/* * */

module.exports = tts;
