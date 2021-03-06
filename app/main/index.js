const electron = require('electron');
const { app } = electron;
const isDev = require('electron-is-dev');
const BrowserManager = require('./browser-manager');
const DropManager = require('./drop-manager');
const FileSaveManager = require('./filesave-manager');
const SettingsManager = require('./settings-manager');
const {
	EVENT_ANALYTICS_APP_STARTED
} = require('../lib/events');

if (isDev) {
  require('electron-connect').client.create()
}

let mainWindow = null;

module.exports = {
	start: () => {
		global.analytics.send(EVENT_ANALYTICS_APP_STARTED);
		app.on('ready', function() {
      BrowserManager.start();
      DropManager.start();
      FileSaveManager.start();
      SettingsManager.start();
		});

		app.on('window-all-closed', (e) => {
			e.preventDefault();

			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		app.on('activate', (e) => {
			e.preventDefault();
			BrowserManager.start();
		});
	}
}



