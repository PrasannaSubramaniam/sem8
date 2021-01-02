import React, { useState, useEffect } from "react";
import SelectElective from "./components/SelectElective";
import TimeTable from "./components/TimeTable";
import "./App.css";
import logo from "./img/icons/icon-192x192.png";

const App = () => {
  const sem8 = {
    subjects: {
      PEHV: {
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
      ["PEHV", "BEA", "SQA", "ED", "SPM"], //0
      ["BEA", "SQA", "PEHV", "SPM", "ED"], //1
      ["SQA", "ED", "PEHV", "BEA", "SPM"], //2
      ["PEHV", "SPM", "SQA", "BEA", "ED"], //3
      ["SPM", "ED", "SQA", "PEHV", "BEA"], //4
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
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">
          <img src={logo} style={{ width: "40px" }} />
          &nbsp;Crimepits
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
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
      <footer class="footer">
        <div class="row f-row">
          <div class="col-12">
            <p>
              Made with <i class="fa fa-heart f-love" aria-hidden="true"></i> in
              India
            </p>
          </div>
          <div class="col-6">
            Prasanna S&nbsp;
            <a
              href="https://www.linkedin.com/in/prasanna-subramaniam/"
              target="_blank"
            >
              <i class="fa fa-linkedin f-s-icon" aria-hidden="true"></i>
            </a>
            &nbsp;
            <a href="https://t.me/PrasannaSubramaniam" target="_blank">
              <i class="fa fa-telegram f-s-icon" aria-hidden="true"></i>
            </a>
          </div>
          <div class="col-6">
            Ranjith G &nbsp;
            <a
              href="https://www.linkedin.com/in/ranjith-g-68992984/"
              target="_blank"
            >
              <i class="fa fa-linkedin f-s-icon" aria-hidden="true"></i>
            </a>
            &nbsp;
            <a href="https://t.me/Ranjith_unplugged" target="_blank">
              <i class="fa fa-telegram f-s-icon" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
