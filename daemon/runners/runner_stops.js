/* * */

const tts = require('@carrismetropolitana/tts');
const settings = require('../config/settings');
const Tracker = require('../services/Tracker');
const GoogleCloudTTSAPI = require('../services/GoogleCloudTTSAPI');

/* * */

module.exports = async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('* TTS STOPS');
  const start = new Date();
  console.log(`* Run started on ${start.toISOString()}`);

  // Setup tracker
  const trackerData = Tracker.get('stops');
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

    const stopTts = tts.makeText(stopData.name, {
      subway: stopData.facilities.includes('subway'),
      light_rail: stopData.facilities.includes('light_rail'),
      train: stopData.facilities.includes('train'),
      boat: stopData.facilities.includes('boat'),
      airport: stopData.facilities.includes('airport'),
      bike_sharing: stopData.facilities.includes('bike_sharing'),
      bike_parking: stopData.facilities.includes('bike_parking'),
      car_parking: stopData.facilities.includes('car_parking'),
    });

    // Check if tracker already has this entry,
    // and if it differs from the given TTS.
    const trackerEntry = trackerData.find((item) => item.id === stopData.id);
    const ttsHasChanged = stopTts !== trackerEntry?.tts;

    if (ttsHasChanged && stopTts && stopTts !== '#N/A') {
      console.log(`* [${stopIndex}/${allStopsData.length}] Generating for Stop ${stopData.id} - ${stopTts}`);
      await GoogleCloudTTSAPI({ string: stopTts, filename: stopData.id, dirname: `${settings.OUTPUTS_DIRNAME}/stops`, replaceIfExists: true });
    }

    trackerDataUpdated.push({ id: stopData.id, tts: stopTts });

    //
  }

  // Save updated tracker
  Tracker.set('stops', trackerDataUpdated);

  // Clean directory
  Tracker.clean('stops');

  // Zip directory
  Tracker.zip('stops');

  //
  console.log();
  console.log(`* Processed ${trackerDataUpdated.length} stops.`);
  const syncDuration = new Date() - start;
  console.log(`* Run took ${syncDuration / 1000} seconds.`);
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
};
