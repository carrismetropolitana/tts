const fs = require('fs');
const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech');

module.exports = async (stopData, skipIfExists = true) => {
  //

  // Export settings
  const dirname = 'outputs/google-cloud-tts-api-voice-b';
  const filename = `${stopData.stop_id} - ${stopData.tts_stop_name}.mp3`;
  const pathname = `${dirname}/${filename}`;

  // Create the output directory if it does not exist
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

  // If flag is set and file exists, skip this stop
  if (skipIfExists && fs.existsSync(pathname)) return;

  // Create a new Google TTS client
  const googleCloudTTSClient = new textToSpeech.TextToSpeechClient();

  // This uses the paid Google Cloud TTS API, however with a generous free-tier
  const [response] = await googleCloudTTSClient.synthesizeSpeech({
    input: { text: stopData.tts_stop_name },
    voice: { languageCode: 'pt-PT', name: 'pt-PT-Standard-B' }, // Can go from 'pt-PT-Standard-A' to 'pt-PT-Standard-D'
    audioConfig: { audioEncoding: 'MP3' , speakingRate: 0.95, effectsProfileId: ['large-automotive-class-device'], pitch: 2, volumeGainDb: 3},
  });

  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(pathname, response.audioContent, { encoding: 'binary' });

  //
};
