const { app, BrowserWindow } = require("electron");
const path = require("path");
const registerIpc = require("./main/home");
// const { Menu, MenuItem } = require('electron')

const home = "http://localhost:3000";

// const menu = new Menu()
// menu.append(new MenuItem({
//   label: 'Electron11',
//   submenu: [{
//     role: 'help',
//     accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Alt+Shift+I',
//     click: () => { console.log('Electron rocks!') }
//   }]
// }))

// Menu.setApplicationMenu(menu)

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  registerIpc(win);

  // win.loadFile("./index.html");
  // if (env === "test") {
  win.loadURL(home);
  // }
  // if (env === "build") {
  //   win.loadFile("./react-app/dist/index.html");
  // }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
