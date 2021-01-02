import React, { useState, useEffect } from "react";

const TimeTable = ({ sem8, omitElective }) => {
  const [DATE, setDATE] = useState(new Date());
  const [DAY, setDAY] = useState(0);
  const [HOUR, setHOUR] = useState(0);
  const [MIN, setMIN] = useState(0);
  const [progressWidth, setprogressWidth] = useState(0);
  const [loaded, setloaded] = useState(true);
  const tick = () => {
    setDATE(new Date());
  };
  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);
    let date = new Date();
    setDAY(date.getDay());
    setHOUR(date.getHours());
    setMIN(date.getMinutes());
    setloaded(true);
    updateWidth();
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  const updateWidth = () => {
    let width = (HOUR - 9) * 60 + MIN;
    if (width < 360) {
      setprogressWidth((width / 360) * 100);
    } else if (width >= 360) {
      setprogressWidth(100);
    }
  };
  useEffect(() => {
    updateWidth();
  }, [MIN]);
  useEffect(() => {
    setHOUR(DATE.getHours());
    setMIN(DATE.getMinutes());
  }, [DATE]);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const {
    subjects,
    timeTable,
    currentSatAlternative,
    currentSunAlternative,
  } = sem8;
  const generateLink = (sub, link) => {
    if (sub === "FREE") {
      return sub;
    } else {
      return <a className="a-hover" href={link}>{sub}</a>;
    }
  };
  const generatePresentCard = () => {
    let i = DAY;
    if (i == 6 && currentSatAlternative) i = currentSatAlternative;
    if (i == 0 && currentSunAlternative) {
      i = currentSunAlternative;
    } else if (i == 0) {
      return;
    }
    let lookupArray = [];
    let subjectArray = [];
    timeTable[i].forEach((el) => {
      subjectArray.push(subjects[el].code === omitElective ? "FREE" : el);
      lookupArray.push(
        "https://meet.google.com/lookup/" + subjects[el].lookupSlug
      );
    });
    return (
      <div className="tt-progress-container">
        <div className="contact100-form-title">Today</div>
        <div className="tt-progress-parent">
          <div
            className="tt-progress"
            style={{ width: `${progressWidth}%` }}
          ></div>
          <div className="tt-progress-content">
            <div className="b45min hrbox">
              <div className="hrbox-tag">
                {generateLink(subjectArray[0], lookupArray[0])}
              </div>
              <span className="btime">9:00</span>
            </div>
            <div className="b15min hrbox">
              <div className="hrbox-tag break-hide">break</div>
              <span className="stime">9:45</span>
            </div>
            <div className="b45min hrbox">
              <div className="hrbox-tag">
                {generateLink(subjectArray[1], lookupArray[1])}
              </div>
              <span className="btime">10:00</span>
            </div>
            <div className="b30min hrbox">
              <div className="hrbox-tag break-hide">break</div>
              <span className="stime">10:45</span>
            </div>
            <div className="b45min hrbox">
              <div className="hrbox-tag">
                {generateLink(subjectArray[2], lookupArray[2])}
              </div>
              <span className="btime">11:15</span>
            </div>
            <div className="b15min hrbox">
              <div className="hrbox-tag break-hide">break</div>
              <span className="stime">12:00</span>
            </div>
            <div className="b45min hrbox">
              <div className="hrbox-tag">
                {generateLink(subjectArray[3], lookupArray[3])}
              </div>
              <span className="btime">12:15</span>
            </div>
            <div className="b75min hrbox">
              <div className="hrbox-tag">Lunch</div>
              <span className="btime">1:00</span>
            </div>
            <div className="b45min hrbox">
              <div className="hrbox-tag">
                {generateLink(subjectArray[4], lookupArray[4])}
              </div>
              <span className="btime">2:15</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const generateRow = (name, i) => {
    if (subjects[name].code === omitElective)
      return (
        <tr>
          <td>{i}</td>
          <td>{name}</td>
          <td>FREE</td>
        </tr>
      );
    else
      return (
        <tr>
          <td>{i}</td>
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
    let result = [];
    let count = 7;
    for (let i = DAY; count--; i = (i + 1) % 7) {
      if (i == 0)
        if (currentSunAlternative) {
          result.push(generateCard(currentSunAlternative, i));
          continue;
        } else continue;
      if (i == 6)
        if (currentSatAlternative) {
          result.push(generateCard(currentSatAlternative, i));
          continue;
        }
      result.push(generateCard(i));
    }
    return <div className="tt-cards-parent">{result}</div>;
  };
  return (
    <div className="tt-container">
      {loaded ? (
        <>
          {generatePresentCard()}
          {generateTimeTable()}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TimeTable;
