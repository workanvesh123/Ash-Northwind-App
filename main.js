const { app,BrowserWindow } = require('electron');
const { createWindow } = require('./electron/electron');

console.log("Main.js: App is starting...");

app.whenReady().then(() => {
    console.log("Main.js: App ready, launching window...");
    createWindow();

    app.on('activate', () => {
        console.log("Main.js: App activated");
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    console.log("Main.js: All windows closed, quitting app");
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
