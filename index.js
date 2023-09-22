const settings = require('./config/settings');
const runnerCommon = require('./runners/runner_common');
const runnerStops = require('./runners/runner_stops');
const runnerPatterns = require('./runners/runner_patterns');

//

(async function init() {
  //

  let TASK_IS_RUNNING = false;

  await runnerCommon();
  await runnerStops();
  await runnerPatterns();

  setInterval(async () => {
    //
    // Check if task is already running
    if (TASK_IS_RUNNING) throw new Error('Force restart: Overlapping tasks.');

    TASK_IS_RUNNING = true;

    await runnerCommon();
    await runnerStops();
    await runnerPatterns();

    TASK_IS_RUNNING = false;

    //
  }, settings.RUN_INTERVAL);

  //
})();
