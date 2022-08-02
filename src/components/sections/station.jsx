import TransitCard from "../cards/transitCard.jsx";

export default function Station({ stationName, stationData, nameDict }) {

  return (
    <section className={"outerCard station"}>
      <h2>{stationName}</h2>
      {stationData.map((trip) => {
        return (
          <TransitCard
            trip={trip}
            nameDict={nameDict}
          />
        );
      })}
      {
        (stationData.length == 0) ? <div class="innerCard tripCard"><p>No upcoming trips</p></div> : null
      }
    </section>
  );
}
