import React from "react";
import arrow from "../../assets/icon-arrow-down.svg";
import type { GroupButtonProps } from "../../types/type";

const GroupButton: React.FC<GroupButtonProps> = (props) => {
  const {
    hidden,
    disabled,
    disabledText,
    firstButtonText,
    secondButtonText,
    classes,
    firstButtonClick,
    secondButtonClick,
  } = props;

  // if hidden return nothing
  if (hidden) return <></>;

  // return component
  return (
    <div className={`button_group ${disabled && "disabled"} ${classes}`}>
      <button
        onClick={firstButtonClick}
        className="left_button"
        id="saveMatter"
      >
        <img className="arrow" src={arrow} alt="" />
        <p>{disabled ? disabledText : firstButtonText}</p>
      </button>

      <button
        onClick={secondButtonClick}
        className="right_button"
        id="saveMatterWithPriority"
      >
        <img className="arrow" src={arrow} alt="" />
        <p>{secondButtonText}</p>
      </button>
    </div>
  );
};

export default GroupButton;
