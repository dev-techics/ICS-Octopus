import React from "react";
import arrow from "../../assets/icon-arrow-down.svg";
import type { GroupButtonProps } from "../../types/type";
import { BarLoader } from "react-spinners";

const GroupButton: React.FC<GroupButtonProps> = (props) => {
  const {
    hidden,
    loading,
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
        <p>
          {loading ? (
            <BarLoader width={40} color="#26848E" />
          ) : disabled ? (
            disabledText
          ) : (
            firstButtonText
          )}
        </p>
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
