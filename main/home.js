const { ipcMain, dialog } = require("electron");
const FileTree = require("../utils/FileTree");

function registerIpc(browserWindow) {
  ipcMain.on("openDir", () => {
    const dir = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });

    if (dir?.[0]) {
      browserWindow.webContents.send("fileDirGot", {
        dirpath: dir[0],
      });
    }
  });

  ipcMain.on("getFileTree", (event, payload) => {
    const { dirpath, ignoreHidden, maxLevel } = payload;

    if (!dirpath) {
      throw new Error("dirpath can not be empty !!!");
    }
    const filetree = new FileTree({
      dirpath,
      ignoreHidden,
      maxLevel,
    });

    filetree.getTree();
    const fileTreeText = filetree.getTreeText({ indentCount: 6 });

    browserWindow.webContents.send("fileTreeGot", {
      treeText: fileTreeText,
    });
  });
}

module.exports = registerIpc;
