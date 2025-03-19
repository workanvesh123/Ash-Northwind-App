const { BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    console.log("Electron.js: Creating window...");

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    const startURL = 'http://localhost:3000';
    console.log(`Electron.js: Loading URL: ${startURL}`);
    mainWindow.loadURL(startURL);

    mainWindow.webContents.on('did-finish-load', () => {
        console.log("Electron.js: Loaded URL successfully");
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error(`Electron.js: Failed to load URL: ${errorDescription} (Error Code: ${errorCode})`);
    });
}

module.exports = { createWindow };
