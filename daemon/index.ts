/* * */

import { SETTINGS } from '@/config/settings.js';
import { runnerCommon } from '@/runners/runner_common.js';
import { runnerPatterns } from '@/runners/runner_patterns.js';
import { runnerStops } from '@/runners/runner_stops.js';
import LOGGER from '@helperkits/logger';

/* * */

(async function init() {
	//

	const runOnInterval = async () => {
		//

		await runnerCommon();
		await runnerStops();
		await runnerPatterns();

		//

		setTimeout(runOnInterval, SETTINGS.RUN_INTERVAL);

		LOGGER.divider();

		//
	};

	await runOnInterval();

	//
})();
