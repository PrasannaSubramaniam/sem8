import React from "react";

const TimeTable = ({ sem8, omitElective }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const { subjects, timeTable, currentSatAlternative } = sem8;
  return (
    <div className="tt-container">
      <div className="tt-row col-heading">
        <div className="cell days">Days</div>
        <div className="cell">
          9.00 AM <div>-</div> 9.45 AM
        </div>
        <div className="cell">
          10.00 AM <div>-</div> 10.45 AM
        </div>
        <div className="cell">
          11.15 AM <div>-</div> 12.00 PM
        </div>
        <div className="cell">
          12.15 PM <div>-</div> 1.00 PM
        </div>
        <div className="cell">
          2.15 PM <div>-</div> 3.00 PM
        </div>
      </div>
      {timeTable.map((day, i) => (
        <div className="tt-row">
          <div className="cell row-heading">{days[i]}</div>
          {day.map((sub) => {
            if (subjects[sub].code === omitElective) {
              return <div className="cell">FREE</div>;
            }
            return (
              <div className="cell">
                <a
                  href={`https://meet.google.com/lookup/${subjects[sub].lookupSlug}`}
                >
                  {sub}
                </a>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TimeTable;
