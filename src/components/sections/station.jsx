import "../cards/transitCard.jsx";

export default function Station(station) {
  return (
    <section className={"outerCard station"}>
      <h2>{station.stationName}</h2>
      {station.tripList.map((trip) => (
        <TransitCard
          lineName={trip.lineName}
          runNum={trip.runNum}
          runDest={trip.runDest}
          arrEst={trip.arrEst}
        />
      ))}
    </section>
  );
}
