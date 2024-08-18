/* * */

const tts = require("@carrismetropolitana/tts");
const settings = require("../config/settings");
const Tracker = require("../services/Tracker");
const GoogleCloudTTSAPI = require("../services/GoogleCloudTTSAPI");

/* * */

module.exports = async () => {
  console.log();
  console.log("* * * * * * * * * * * * * * * * * * * * * * * * * *");
  console.log("* TTS PATTERNS");
  const start = new Date();
  console.log(`* Run started on ${start.toISOString()}`);

  // Setup tracker
  const trackerData = Tracker.get("patterns");
  const trackerDataUpdated = [];

  // Get all lines
  console.log("* Fetching all lines from API...");
  const allLinesResponse = await fetch(
    "https://api.carrismetropolitana.pt/lines",
  );
  const allLinesData = await allLinesResponse.json();

  // Log progress
  console.log(`* Preparing ${allLinesData.length} lines...`);
  console.log();

  // Iterate on each stop
  for (const [lineIndex, lineData] of allLinesData.entries()) {
    //

    // 1.
    // For each pattern of this line

    for (const [patternIndex, patternId] of lineData.patterns.entries()) {
      //

      const patternResponse = await fetch(
        `https://api.carrismetropolitana.pt/patterns/${patternId}`,
      );
      const patternData = await patternResponse.json();

      const patternTts = tts.makePattern(
        lineData.short_name,
        patternData.headsign,
      );

      // Check if tracker already has this entry,
      // and if it differs from the generated TTS.
      const trackerEntry = trackerData.find((item) => item.id === patternId);
      const ttsHasChanged = patternTts !== trackerEntry?.tts;

      if (ttsHasChanged) {
        await GoogleCloudTTSAPI({
          string: patternTts,
          filename: patternId,
          dirname: `${settings.OUTPUTS_DIRNAME}/patterns`,
          replaceIfExists: true,
        });
        console.log(
          `* [${lineIndex}/${allLinesData.length}] [${patternIndex}/${lineData.patterns.length}] Generated | Line ${lineData.id} | Pattern ${patternData.id} | ${patternTts}`,
        );
      }

      trackerDataUpdated.push({ id: patternId, tts: patternTts });

      //
    }
  }

  // Save updated tracker
  Tracker.set("patterns", trackerDataUpdated);

  // Clean directory
  Tracker.clean("patterns");

  // Zip directory
  Tracker.zip("patterns");

  //
  console.log();
  console.log(`* Processed ${trackerDataUpdated.length} patterns.`);
  const syncDuration = new Date() - start;
  console.log(`* Run took ${syncDuration / 1000} seconds.`);
  console.log("* * * * * * * * * * * * * * * * * * * * * * * * * *");
  console.log();
};

//
//
//
//
//
//
//
