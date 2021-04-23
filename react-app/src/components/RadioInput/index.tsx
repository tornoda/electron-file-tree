import React, { FormEvent } from "react";
import style from "./index.module.less";
import { Checkbox } from "react-desktop/macOs";

interface Props {
  label: string | undefined;
  onChange?: ({ checked, value }: { checked: boolean; value: number }) => void;
  defaultChecked?: boolean;
  defaultValue?: number;
}

interface State {
  checked: boolean;
  value: number;
}

export type RadioInputValue = {
  checked: boolean;
  value: number;
};

class RadioInput extends React.PureComponent<Props, State> {
  static DEFAULT_VALUE = 8;
  constructor(props: Props) {
    super(props);
    this.state = {
      checked: Boolean(props.defaultChecked),
      value: Number(props.defaultValue),
    };
  }

  onCheckBoxChange = (e: FormEvent<HTMLFormElement>) => {
    const checked = e.currentTarget.checked;
    this.setState({ checked }, this.triggerPropsChangeEvent);
  };

  onInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    this.setState(
      {
        value,
      },
      this.triggerPropsChangeEvent
    );
  };

  triggerPropsChangeEvent = () => {
    const { onChange } = this.props;
    const { checked, value } = this.state;
    onChange &&
      onChange({
        checked,
        value,
      });
  };

  render() {
    const { defaultValue, defaultChecked = true, label } = this.props;
    const { checked } = this.state;
    return (
      <div className={style.radioInput}>
        <Checkbox
          label={
            <div>
              <span>{label}</span>
              <input
                min={1}
                disabled={!checked}
                type="number"
                className={style["radioInput-input"]}
                defaultValue={defaultValue || RadioInput.DEFAULT_VALUE}
                onChange={this.onInputChange}
              />
            </div>
          }
          defaultChecked={defaultChecked}
          onChange={this.onCheckBoxChange}
        />
      </div>
    );
  }
}

export default RadioInput;
