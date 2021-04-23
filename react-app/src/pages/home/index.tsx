import React, { Component, FormEvent } from "react";
import { Button, Box, Text, Checkbox, TextInput } from "react-desktop/macOs";
import RadioInput, { RadioInputValue } from "src/components/RadioInput";

import style from "./index.module.less";

interface Props {}

interface State {
  dirpath: string;
  treeText: string;
}

class Home extends Component<Props, State> {
  ignoreHidden = true;
  maxLevel = RadioInput.DEFAULT_VALUE;
  state = {
    dirpath: "",
    treeText: "",
  };

  componentDidMount() {
    window.ipc.on("fileDirGot", (e: any, payload: any) => {
      console.log("payload", payload);
      const dirpath = payload.dirpath;
      if (dirpath !== this.state.dirpath) {
        this.setState({
          treeText: "",
        });
      }
      this.setState({
        dirpath: payload.dirpath,
      });
    });

    window.ipc.on("fileTreeGot", (e: any, payload: any) => {
      this.setState({
        treeText: payload.treeText,
      });
    });
  }

  onClick = () => {
    window.ipc.send("openDir", {});
  };

  getTree = () => {
    const { dirpath } = this.state;
    if (!dirpath) {
      alert("请选取文件夹");
      return;
    }
    window.ipc.send("getFileTree", {
      dirpath,
      ignoreHidden: this.ignoreHidden,
      maxLevel: this.maxLevel
    });
  };

  onIgnoreChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const checked = target.checked;
    this.ignoreHidden = checked;
  };

  onMaxLevelChange = (values: RadioInputValue) => {
    const { value } = values;
    this.maxLevel = value;
  };

  render() {
    const { dirpath, treeText } = this.state;
    return (
      <div className={style.home}>
        <div className={style.menu}>
          <div className={style["menu-select"]}>
            <Button onClick={this.onClick} marginRight="20px">
              选择文件夹
            </Button>
            <Checkbox
              label="忽略隐藏文件（文件名以.开头）"
              defaultChecked={true}
              onChange={this.onIgnoreChange}
            />
            <RadioInput
              label={"限制层级"}
              defaultChecked={true}
              onChange={this.onMaxLevelChange}
            />
          </div>
          <Button onClick={this.getTree} color="blue">
            获取文件树
          </Button>
        </div>
        <div className={style.folder}>
          {dirpath && (
            <Box label="所选文件夹" padding="10px 30px">
              <Text>{dirpath}</Text>
            </Box>
          )}
        </div>
        <div className={style.tree}>
          {treeText && (
            <Box label="文件树" padding="10px 30px">
              <Text>
                <div dangerouslySetInnerHTML={{ __html: treeText }} />
              </Text>
            </Box>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
