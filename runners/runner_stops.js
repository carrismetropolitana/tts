const GoogleCloudTTSAPI = require('../services/GoogleCloudTTSAPI');
const Tracker = require('../services/Tracker');

/* * */

module.exports = async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('* TTS STOPS');
  const start = new Date();
  console.log(`* Run started on ${start.toISOString()}`);

  // Setup tracker
  const trackerData = Tracker.get({ name: 'stops' });
  const trackerDataUpdated = [];

  // Get all stops
  console.log('* Fetching all stops from API...');
  const allStopsResponse = await fetch('https://api.carrismetropolitana.pt/stops');
  const allStopsData = await allStopsResponse.json();

  // Log progress
  console.log(`* Preparing ${allStopsData.length} stops...`);
  console.log();

  // Iterate on each stop
  for (const [stopIndex, stopData] of allStopsData.entries()) {
    //

    // Check if tracker already has this entry,
    // and if it differs from the given TTS.
    const trackerEntry = trackerData.find((item) => item.id === stopData.id);
    const ttsHasChanged = stopData.tts_name !== trackerEntry?.tts;

    if (ttsHasChanged) {
      try {
        await GoogleCloudTTSAPI({ string: stopData.tts_name, filename: stopData.id, dirname: 'outputs/stops', replaceIfExists: true });
        console.log(`* [${stopIndex}/${allStopsData.length}] Generated | Stop ${stopData.id} | ${stopData.tts_name}`);
      } catch (error) {
        console.log(`* [${stopIndex}/${allStopsData.length}] ERROR | Stop ${stopData.id}`);
        console.log(error);
      }
    }

    trackerDataUpdated.push({ id: stopData.id, tts: stopData.tts_name });

    //
  }

  // Save updated tracker
  Tracker.set({ name: 'stops', data: trackerDataUpdated });

  // Clean directory
  Tracker.clean({ name: 'patterns' });

  //
  console.log();
  console.log(`* Processed ${allStopsData.length} stops.`);
  const syncDuration = new Date() - start;
  console.log(`* Run took ${syncDuration / 1000} seconds.`);
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
};
