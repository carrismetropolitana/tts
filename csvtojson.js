/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const Papa = require('papaparse');

const formatPatterns = async () => {
  //

  //
  // 0. Get latest data from Intermodal

  console.log('• Parsing latest stops...');

  const txtData = fs.readFileSync('patterns_velocities.txt', { encoding: 'utf8' });

  const patternsVelocities = Papa.parse(txtData, { header: true });

  //
  // 1. Format the raw data from Intermodal

  const updatedPatterns = [];

  console.log('• Preparing ' + patternsVelocities.data.length + ' patterns...');
  console.log();

  for (const [index, pattern] of patternsVelocities.data.entries()) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Updating pattern ${pattern.pattern_id} (${index}/${patternsVelocities.data.length})`);
    //
    updatedPatterns.push({
      pattern_id: pattern.pattern_id,
      velocity: parseInt(pattern.velocity),
    });
    //
  }

  //
  // 2. Save the formatted data into a JSON file

  console.log('• Saving data to CSV file.');

  // Use papaparse to produce the CSV string
  const jsonData = JSON.stringify(updatedPatterns);
  // Append the csv string to the file
  fs.writeFileSync(`patterns_velocities.json`, jsonData);

  //

  console.log('• Done! Updated ' + updatedPatterns.length + ' patterns.');
};

/* * *
 * ONE TIME EXECUTION
 */
(async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('> PARSER');
  const start = new Date();
  console.log('> Parsing started on ' + start.toISOString());

  /* * * * * * * * * * * * */
  /* */ await formatPatterns();
  /* * * * * * * * * * * * */

  const syncDuration = new Date() - start;
  console.log('> Operation took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
