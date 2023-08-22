const fs = require('fs');
const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech');

module.exports = async (stopData) => {
  //

  // Export settings
  const dirname = 'outputs/google-cloud-tts-api';
  const filename = `${stopData.stop_id}.mp3`;

  // Create the output directory if it does not exist
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

  // Create a new Google TTS client
  const googleCloudTTSClient = new textToSpeech.TextToSpeechClient();

  // This uses the paid Google Cloud TTS API, however with a generous free-tier
  const [response] = await googleCloudTTSClient.synthesizeSpeech({
    input: { text: stopData.stop_name },
    voice: { languageCode: 'pt-PT', name: 'pt-PT-Standard-D' }, // Can go from 'pt-PT-Standard-A' to 'pt-PT-Standard-D'
    audioConfig: { audioEncoding: 'MP3' },
  });

  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`${dirname}/${filename}`, response.audioContent, { encoding: 'binary' });

  //
};
