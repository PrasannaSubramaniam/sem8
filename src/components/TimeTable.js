import React from "react";

const TimeTable = ({ sem8, omitElective }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { subjects, timeTable, currentSatAlternative } = sem8;
  const generateRow = (name, i) => {
    if (subjects[name].code === omitElective)
      return (
        <tr>
          <td>{i + 1}</td>
          <td>{name}</td>
          <td>FREE</td>
        </tr>
      );
    else
      return (
        <tr>
          <td>{i + 1}</td>
          <td>{name}</td>
          <td>
            <a
              target="_blank"
              href={`https://meet.google.com/lookup/${subjects[name].lookupSlug}`}
            >
              Join Now
            </a>
          </td>
        </tr>
      );
  };
  const generateCard = (i, alt = null) => {
    let day = days[i];
    if (alt) day = days[alt];
    return (
      <div class="wrap-contact100" style={{ margin: "1vh", width: "400px" }}>
        <div class="contact100-form">
          <span class="contact100-form-title">{day}</span>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Course</th>
                  <th scope="col">Google Meet</th>
                </tr>
              </thead>
              {timeTable[i].map((el, index) => generateRow(el, index))}
            </table>
          </div>
        </div>
      </div>
    );
  };
  const generateTimeTable = () => {
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let result = [];
    let count = 7;
    for (let i = day - 1; count--; i = (i + 1) % 7) {
      if (i == 5) {
        if (currentSatAlternative)
          result.push(generateCard(currentSatAlternative, i));
      } else if (i == 6) continue;
      else result.push(generateCard(i));
    }
    return result;
  };
  return generateTimeTable();
};

export default TimeTable;
