const { BrowserWindow, app } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createWindow() {
    console.log("Electron.js: Creating splash window...");

    // Splash screen window
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false, // No window controls
        transparent: true,
        alwaysOnTop: true
    });

    splashWindow.loadFile(path.join(__dirname, '../src/assets/loading.html'));

    // Main window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    });

    const startURL = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build/index.html')}`;
    console.log(`Electron.js: Loading URL: ${startURL}`);
    mainWindow.loadURL(startURL);

    // When the main window finishes loading, close splash and show main window
    mainWindow.webContents.on('did-finish-load', () => {
        if (splashWindow) {
            splashWindow.close();
        }
        mainWindow.show();
        console.log("Electron.js: Loaded URL successfully");
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error(`Electron.js: Failed to load URL: ${errorDescription} (Error Code: ${errorCode})`);
    });
}

app.whenReady().then(createWindow);
