import React, { useState, useEffect } from "react";
import SelectElective from "./components/SelectElective";
import TimeTable from "./components/TimeTable";
import "./App.css";

const App = () => {
  const sem8 = {
    subjects: {
      PE: {
        fullName: "Professional Ethics and Human Values",
        code: "14GET81",
        lookupSlug: "ehu3m24ml5",
      },
      BEA: {
        fullName: "Building Enterprise Applications",
        code: "14ITE12",
        lookupSlug: "apyadgmqrg",
      },
      SQA: {
        fullName: "Software Quality Assurance",
        code: "14CSE17",
        lookupSlug: "ggcfvem7mc",
      },
      ED: {
        fullName: "Entrepreneurship Development",
        code: "14GEE81",
        lookupSlug: "hsbor5i7ad",
      },
      SPM: {
        fullName: "Software Project Management",
        code: "14CSE16",
        lookupSlug: "hipagrhldb",
      },
      PROJ: {
        fullName: "Project",
        code: "14CSP81",
        lookupSlug: "dalqcz7rqx",
      },
    },
    timeTable: [
      ["PE", "BEA", "SQA", "ED", "SPM"], //0
      ["BEA", "SQA", "PE", "SPM", "ED"], //1
      ["SQA", "ED", "PE", "BEA", "SPM"], //2
      ["PE", "SPM", "SQA", "BEA", "ED"], //3
      ["SPM", "ED", "SQA", "PE", "BEA"], //4
      // ["PROJ(KTS)", "PROJ(CS)", "PROJ(VES)", "PROJ(SR)", "PROJ(DD)"], //5
    ],
    currentSatAlternative: 2, //Wednesday
  };
  const electiveList = [
    { name: "Building Enterprise Applications", code: "14ITE12" },
    { name: "Software Quality Assurance", code: "14CSE17" },
    { name: "Entrepreneurship Development", code: "14GEE81" },
    { name: "Software Project Management", code: "14CSE16" },
  ];
  const [hasElectives, sethasElectives] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("omitElective")) {
      sethasElectives(true);
    }
  });
  const handleSubmit = (electives) => {
    electives.map((el, i) => {
      if (el === "") {
        localStorage.setItem("omitElective", electiveList[i].code);
      }
    });
    sethasElectives(true);
  };
  return (
    <div className="app-content">
      {hasElectives ? (
        <TimeTable
          sem8={sem8}
          omitElective={localStorage.getItem("omitElective")}
        />
      ) : (
        <SelectElective
          electiveList={electiveList}
          handleSubmit={(electives) => handleSubmit(electives)}
        />
      )}
    </div>
  );
};

export default App;
