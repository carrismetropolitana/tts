/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const Papa = require('papaparse');
const makeTTS = require('./makeTTS');

const formatSchools = async () => {
  //

  //
  // 0. Get latest data from Intermodal

  console.log('• Parsing latest schools...');

  const schoolsData = fs.readFileSync('escolas_250m.txt', { encoding: 'utf8' });
  const stopTimesData = fs.readFileSync('stop_times.txt', { encoding: 'utf8' });
  const tripsDuEscData = fs.readFileSync('trips_du_esc.txt', { encoding: 'utf8' });

  const originalSchools = Papa.parse(schoolsData, { header: true, skipEmptyLines: 'greedy' });
  const originalStopTimes = Papa.parse(stopTimesData, { header: true, skipEmptyLines: 'greedy' });
  const originalTripsDuEsc = Papa.parse(tripsDuEscData, { header: true, skipEmptyLines: 'greedy' });

  //
  // 1. Format the raw data from Intermodal

  console.log('• Preparing ' + originalSchools.data.length + ' schools...');
  console.log();

  if (fs.existsSync('schools_stops_trips.txt')) fs.rmSync('schools_stops_trips.txt');

  for (const [index, school] of originalSchools.data.entries()) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Updating school ${school.school_id} (${index}/${originalSchools.data.length})`);
    //
    const tripsForEachSchool = [];
    //
    const stopForThisSchool = school.stop_id;
    //
    const tripsForThisStop = originalStopTimes.data.filter((item) => {
      if (item.stop_id === stopForThisSchool) return true;
    });
    //

    for (const stopTimesEntry of tripsForThisStop) {
      for (const tripWithService of originalTripsDuEsc.data) {
        if (stopTimesEntry.trip_id === tripWithService.trip_id) {
          tripsForEachSchool.push({
            school_id: school.school_id,
            school_name: school.school_nam,
            stop_id: stopTimesEntry.stop_id,
            pattern_id: tripWithService.pattern_id,
          });
        }
      }
    }
    //
    // DEDUPLICATE LINES
    const deduplicatedSchoolsService = tripsForEachSchool.filter((tag, index, array) => array.findIndex((t) => t.school_id == tag.school_id && t.stop_id == tag.stop_id && t.pattern_id && tag.pattern_id) == index);
    // SORT
    const sortedSchoolsService = deduplicatedSchoolsService.sort((a, b) => a.school_id - b.school_id);

    if (fs.existsSync('schools_stops_trips.txt')) {
      // Use papaparse to produce the CSV string
      const csvData = Papa.unparse(sortedSchoolsService, { header: false, skipEmptyLines: 'greedy', newline: '\n' });
      // Append the csv string to the file
      if (csvData) fs.appendFileSync(`schools_stops_trips.txt`, '\n' + csvData);
    } else {
      // Use papaparse to produce the CSV string
      const csvData = Papa.unparse(sortedSchoolsService, { header: true, skipEmptyLines: 'greedy' });
      // Write the csv string to the file
      fs.writeFileSync(`schools_stops_trips.txt`, csvData);
    }
    //
    // if (index > 20) break;
    //
  }

  //
  // 2. Save the formatted data into a JSON file

  console.log('• Saving data to CSV file.');

  //

  console.log('• Done! Updated ' + originalSchools.data.length + ' schools.');
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
  /* */ await formatSchools();
  /* * * * * * * * * * * * */

  const syncDuration = new Date() - start;
  console.log('> Operation took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
