const makeTree = require("file-tree-maker");

class FileTree {
  dirpath = "";
  tree = null;
  treeText = "";
  ignoreHidden = true;
  maxLevel = null;

  constructor({ dirpath, ignoreHidden = true, maxLevel = null }) {
    this.dirpath = dirpath;
    this.ignoreHidden = ignoreHidden;
    this.maxLevel = maxLevel;
  }

  getTree() {
    const tree = makeTree({
      entry: this.dirpath,
    });
    this.tree = tree;
  }

  getTreeText({ indentCount }) {
    if (!this.tree) {
      throw new Error("Call getTree before getTreeText !!!");
    }
    this._getTreeText(this.tree, 0, indentCount);
    return this.treeText;
  }

  _getTreeText(tree, level, indentCount) {
    this._combineLines(tree.name, level, indentCount);
    if (this.maxLevel && level === this.maxLevel) {
      return;
    }
    if (tree.children) {
      const curLevel = level + 1;
      // 排序，文件夹排在最后一位
      const children = tree.children.sort((a, b) => {
        if (a.type === "dir") {
          return 1;
        } else {
          return -1;
        }
      });
      for (const i of children) {
        // 隐藏文件处理
        if (this.ignoreHidden) {
          if (!i.name.startsWith("."))
            if (i.type === "dir") {
              this._getTreeText(i, level + 1, indentCount);
            } else {
              this._combineLines(i.name, curLevel, indentCount);
            }
        } else {
          if (i.type === "dir") {
            this._getTreeText(i, level + 1);
          } else {
            this._combineLines(i.name, curLevel, indentCount);
          }
        }
      }
    }
  }

  // TODO 样式支持
  // MyApp.app/Contents
  // ├── Info.plist
  // ├── MacOS/
  // │   └── MyApp
  // └── Frameworks/
  //     └── MyApp Helper.app
  //         ├── Info.plist
  //         └── MacOS/
  //             └── MyApp Helper
  _combineLines(filename, level, indentCount = 8) {
    let res = "";
    const span = "&nbsp;".repeat(indentCount);
    res += span.repeat(level);
    res += filename;
    res += "<br />";
    this.treeText += res;
  }
}

module.exports = FileTree;
