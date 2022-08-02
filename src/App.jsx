import "./App.css";

import "./components/sections/station.jsx";

import React, { useState, useEffect } from "react";
import Station from "./components/sections/station.jsx";

function App() {
  const [appData, setAppData] = useState({
    transit: {
      cta: {
        train: {},
        bus: {},
      },
      metra: {
        train: {},
      },
    },
    weather: {
      hourly: {},
      daily: {},
      meta: {},
    },
  });
  const [lastUpdated, setLastUpdated] = useState(
    new Date(new Date().valueOf() - 300000)
  );

  setInterval(() => {
    console.log(
      "Last updated: " +
        lastUpdated.toLocaleTimeString("en-US", { hour12: false })
    );
    setLastUpdated(new Date());
  }, 30000);

  useEffect(() => {
    console.log("checking for data clock");

    if (lastUpdated.valueOf() < new Date().valueOf() - 20000) {
      console.log("fetching data...");
      fetch("https://aptinfo.piemadd.repl.co/api")
        .then((res) => res.json())
        .then((data) => {
          setAppData(data);
        });
    }
  }, [lastUpdated]);

  return (
    <>
      <main>
        <h1>Weather:</h1>
      </main>
      <main id="weather">
        <section id="hourly" className={"outerCard"}>
          <h2>Hourly</h2>
          <div className={"innerCard foreCast"}>
            <span>
              <p>startTime</p>
              <p> | </p>
              <span className={"material-symbols-rounded icon"}>
                windDirection
              </span>
              <p>windSpeed</p>
            </span>
            <span>
              <h3>temperature°temperatureUnit shortForecast</h3>
            </span>
          </div>
        </section>
        <section id="daily" className={"outerCard"}>
          <h2>Daily</h2>
        </section>
      </main>
      <main>
        <h1>Transit:</h1>
      </main>
      <main id="transit">
        {Object.keys(appData.transit).map((agencyName) => {
          return Object.keys(appData.transit[agencyName]).map((modeName) => {
            if (modeName == "train" || modeName == "bus") {

              const stationIDs = Object.keys(appData.transit[agencyName][modeName]);
              const needToSpecifyDirectionOfStation = (stationIDs.length > 0) ? (stationIDs[0].split("-").length > 1) : false;

              return stationIDs.map(
                (stationID) => {

                  const stationData = appData.transit[agencyName][modeName][stationID];
                  let stationName = appData.transit[agencyName].meta[stationID.split("-")[0]].stopName;

                  stationName = (modeName == 'bus' && stationData.length > 0) ? `${stationData[0].routeID} Stop` : stationName;
                  stationName = (needToSpecifyDirectionOfStation && stationData.length > 0 && modeName != 'bus') ? `${stationName} to ${stationData[0].destination}`: stationName;

                  return (
                    <Station
                      stationName={stationName}
                      stationData={stationData}
                      nameDict={appData.transit[agencyName].nameDict}
                    />
                  );
                }
              );
            } else {
              return null;
            }
          });
        })}
      </main>
      <main>
        <p>
          Last Updated:{" "}
          {lastUpdated.toLocaleString("en-US", {
            timeZone: appData.weather.meta.tz,
          })}
        </p>
      </main>
    </>
  );
}

export default App;
