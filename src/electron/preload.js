const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        // Whitelist allowed channels
        const validChannels = ['toMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, callback) => {
        // Whitelist allowed channels
        const validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }
    }
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('Preload script loaded');
});
