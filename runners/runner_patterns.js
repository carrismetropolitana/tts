/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const GoogleCloudTTSAPI = require('../services/GoogleCloudTTSAPI');
const makeTTS = require('../services/makeTTS');
const Tracker = require('../services/Tracker');

/* * */

module.exports = async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('* TTS PATTERNS');
  const start = new Date();
  console.log(`* Run started on ${start.toISOString()}`);

  // Setup tracker
  const trackerData = Tracker.get({ name: 'patterns' });
  const trackerDataUpdated = [];

  // Get all lines
  console.log('* Fetching all lines from API...');
  const allLinesResponse = await fetch('https://api.carrismetropolitana.pt/lines');
  const allLinesData = await allLinesResponse.json();

  // Log progress
  console.log(`* Preparing ${allLinesData.length} lines...`);
  console.log();

  // Iterate on each stop
  for (const [lineIndex, lineData] of allLinesData.entries()) {
    //

    // 1.
    // Setup line short name TTS
    const lineShortNameTts = getLineShortNameTts(lineData.short_name);

    // 2.
    // For each pattern of this line

    for (const [patternIndex, patternId] of lineData.patterns.entries()) {
      //

      const patternResponse = await fetch(`https://api.carrismetropolitana.pt/patterns/${patternId}`);
      const patternData = await patternResponse.json();

      const headsignTts = makeTTS(patternData.headsign);

      const patternTTs = `Linha ${lineShortNameTts} com destino a ${headsignTts}`;

      // Check if tracker already has this entry,
      // and if it differs from the generated TTS.
      const trackerEntry = trackerData.find((item) => item.id === patternId);
      const ttsHasChanged = patternTTs !== trackerEntry?.tts;

      if (ttsHasChanged) {
        await GoogleCloudTTSAPI({ string: patternTTs, filename: patternId, dirname: 'outputs/patterns', replaceIfExists: true });
        console.log(`* [${lineIndex}/${allLinesData.length}] [${patternIndex}/${lineData.patterns.length}] Generated | Line ${lineData.id} | Pattern ${patternData.id} | ${patternTTs}`);
      }

      trackerDataUpdated.push({ id: patternId, tts: patternTTs });

      //
    }
  }

  // Save updated tracker
  Tracker.set({ name: 'patterns', data: trackerDataUpdated });

  // Clean directory
  Tracker.clean({ name: 'patterns' });

  //
  console.log();
  console.log(`* Processed ${allLinesData.length} lines and ${trackerDataUpdated.length} patterns.`);
  const syncDuration = new Date() - start;
  console.log(`* Run took ${syncDuration / 1000} seconds.`);
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
};

//
//
//
//
//
//
//

function getLineShortNameTts(lineShortName) {
  //

  // If line is not numeric, return as-is
  if (isNaN(lineShortName)) return lineShortName;

  // If line is numeric, and has 4 digits
  if (lineShortName.length === 4) {
    //
    // If digit 1 is zero also return as-is
    if (lineShortName[1] === '0') return lineShortName;

    // If digit 2 and digit 3 are both zero, also return as-is
    if (lineShortName[2] === '0' && lineShortName[3] === '0') return lineShortName;

    // Else, separate into two blocks (ex. [4238] -> [42] [38])
    return `${lineShortName[0]}${lineShortName[1]} ${lineShortName[2]}${lineShortName[3]}`;

    //
  }

  // Return as-is otherwise
  return lineShortName;

  //
}
