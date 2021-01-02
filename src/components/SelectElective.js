import React, { useState, useEffect } from "react";

const SelectElective = ({ electiveList, handleSubmit }) => {
  const [showSubmit, setshowSubmit] = useState(false);
  const [checked, setchecked] = useState(
    new Array(electiveList.length).fill("")
  );
  const [disabled, setdisabled] = useState(
    new Array(electiveList.length).fill("")
  );
  const handleClick = (i) => {
    let checkedArray = [...checked];
    checkedArray[i] = checkedArray[i] ? "" : "checked";
    setchecked(checkedArray);
  };
  useEffect(() => {
    let checkedArray = [...checked];
    let disabledArray = [...disabled];
    let count = 0;
    checkedArray.forEach((el) => {
      if (el === "checked") count++;
    });
    if (count === 3) {
      checkedArray.forEach((el, i) => {
        if (el === "") disabledArray[i] = "disabled";
      });
      setshowSubmit(true);
    } else {
      disabledArray = new Array(electiveList.length).fill("");
      setshowSubmit(false);
    }
    setdisabled(disabledArray);
  }, [checked]);
  return (
    <div className="se-container">
      <div className="se-heading">Choose your electives</div>
      <div className="se-checkboxes">
        {electiveList.map((el, i) => (
          <p>
            <input
              type="checkbox"
              id={`check${i}`}
              checked={checked[i]}
              disabled={disabled[i]}
              onClick={() => {
                console.log(i + "clicked");
                handleClick(i);
              }}
            />
            <label
              className="se-label"
              for={`check${i}`}
            >{`${el.name} (${el.code})`}</label>
          </p>
        ))}
      </div>
      {showSubmit ? (
        <div
          className="se-submit-btn"
          onClick={() => {
            handleSubmit(checked);
          }}
        >
          <span>Submit</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectElective;
