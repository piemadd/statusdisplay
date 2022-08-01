import logo from "./logo.svg";
import "./App.css";

import React, { useState } from 'react';

function App() {
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
              <span className={"material-symbols-rounded icon"}>windDirection</span>
              <p>windSpeed</p>
            </span>
            <span>
              <h3>
                temperature°temperatureUnit shortForecast
              </h3>
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
        <section className={"outerCard station"}>
          <h2>stationName</h2>
          <div className={"innerCard tripCard"}>
            <span>
              <p>
                lineName runNum to
              </p>
            </span>
            <span>
              <h3>runDest</h3>
              <p></p>
              <b>arrEst</b>
            </span>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
