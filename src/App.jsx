import "./App.css";

import "./components/sections/station.jsx";

import React, { useState, useEffect } from "react";
import Station from "./components/sections/station.jsx";
import Forecast from "./components/sections/forecast.jsx";

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
    new Date()
  );

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    console.log("fetching data...");
    const res = await fetch("https://aptinfo.piemadd.repl.co/api");
    const data = await res.json();
    setAppData(data);
    setLastUpdated(new Date());
    setIsLoading(false);
    console.log("data fetched");
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 29000);

    return () => clearInterval(interval);
  }, []);

  return !isLoading ? (
    <>
      <main>
        <h1>Weather:</h1>
      </main>
      <main id="weather">
        {Object.keys(appData.weather).map((forecastType) => {
          if (forecastType != "meta") {
            return (
              <Forecast
                key={`${forecastType}-forecast`}
                forecastType={forecastType}
                forecastData={appData.weather[forecastType]}
                tz={appData.weather.meta.tz}
              />
            );
          } else {
            return null;
          }
        })}
      </main>
      <main>
        <h1>Transit:</h1>
      </main>
      <main id="transit">
        {Object.keys(appData.transit).map((agencyName) => {
          return Object.keys(appData.transit[agencyName]).map((modeName) => {
            if (modeName == "train" || modeName == "bus") {
              const stationIDs = Object.keys(
                appData.transit[agencyName][modeName]
              );
              const needToSpecifyDirectionOfStation =
                stationIDs.length > 0
                  ? stationIDs[0].split("-").length > 1
                  : false;

              return stationIDs.map((stationID) => {
                const stationData =
                  appData.transit[agencyName][modeName][stationID];
                let stationName =
                  appData.transit[agencyName].meta[stationID.split("-")[0]]
                    .stopName;

                stationName =
                  modeName == "bus" && stationData.length > 0
                    ? `${stationData[0].routeID} Stop`
                    : stationName;
                stationName =
                  needToSpecifyDirectionOfStation &&
                  stationData.length > 0 &&
                  modeName != "bus"
                    ? `${stationName} to ${stationData[0].destination}`
                    : stationName;

                return (
                  <Station
                    stationName={stationName}
                    stationData={stationData}
                    nameDict={appData.transit[agencyName].nameDict}
                  />
                );
              });
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
  ) : (
    <main>
      <h1>Loading...</h1>
    </main>
  );
}

export default App;
