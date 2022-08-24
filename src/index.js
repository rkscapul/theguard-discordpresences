import { ConsoleLogging, WebLogging } from './managers/logging/index.js';
import { getSecrets } from './managers/values.cjs';

import { DBController } from './managers/database.js';

import { printHeader } from './helpers/display.js';

const logging = {
	console: new ConsoleLogging()
};

import { TheGuardDiscordPresences } from './TheGuardDiscordPresences.js';

import { TGDPViewer } from './interface/viewer/TGDPViewer.js';

printHeader();

getSecrets().then(values => {
	const database = new DBController({ connectionString: values.PRESENCE_DB })

	const tgdpViewer = new TGDPViewer(logging, database.getConfig());
	
	const theGuardDiscordPresences = new TheGuardDiscordPresences(logging, {
		tgdpViewer 
	});
	
	theGuardDiscordPresences.setup();
	theGuardDiscordPresences.start();
});