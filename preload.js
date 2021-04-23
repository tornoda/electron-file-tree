const { contextBridge, ipcRenderer , dialog} = require("electron");

contextBridge.exposeInMainWorld("ipc", {
  send: (eventName, payload) => ipcRenderer.send(eventName, payload),
  on: (eventName, payload) => ipcRenderer.on(eventName, payload),
});

contextBridge.exposeInMainWorld("dialog", {
  open: (options) => {
    dialog.showOpenDialogSync(options);
  },
});
