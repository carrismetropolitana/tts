const fs = require('fs');
const textToSpeech = require('@google-cloud/text-to-speech');

let googleCloudTTSClient;

module.exports = async ({ string, filename, dirname, replaceIfExists = false }) => {
  //

  // Export settings
  const pathname = `${dirname}/${filename}.mp3`;

  // Create the output directory if it does not exist
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

  // If flag is set and file exists, skip this stop
  if (!replaceIfExists && fs.existsSync(pathname)) return;

  // Create a new Google TTS client
  if (!googleCloudTTSClient) googleCloudTTSClient = new textToSpeech.TextToSpeechClient();

  // This uses the paid Google Cloud TTS API, however with a generous free-tier
  const [response] = await googleCloudTTSClient.synthesizeSpeech({
    input: { text: string },
    voice: { languageCode: 'pt-PT', name: 'pt-PT-Standard-B' }, // Can go from 'pt-PT-Standard-A' to 'pt-PT-Standard-D'
    audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95, effectsProfileId: ['large-automotive-class-device'], pitch: 2, volumeGainDb: 3 },
  });

  // Write the binary audio content to a local file
  fs.writeFileSync(pathname, response.audioContent, { encoding: 'binary' });

  //
};
