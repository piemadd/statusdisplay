export default function TransitCard({ trip, nameDict }) {
  const lineName = nameDict[trip.routeID]
    ? nameDict[trip.routeID]
    : trip.routeID;
  const runNum = trip.isSch == "1" ? "Scheduled" : "#" + trip.runNum;

  const totalMinutesTilArr = parseInt(
    (new Date(trip.estArr).getTime() - new Date().getTime()) / 60000
  );

  const hoursTilArr = Math.floor(totalMinutesTilArr / 60);
  const minutesTilArr = Math.floor(totalMinutesTilArr % 60);

  const arrEst = `${hoursTilArr > 0 ? hoursTilArr : ""} ${
    hoursTilArr > 0 ? " hr, " : ""
  }${Math.max(minutesTilArr, 0)} min`;

  return (
    <div class="innerCard tripCard">
      <span>
        <p>
          {lineName} {runNum} to
        </p>
      </span>
      <span>
        <h3>{trip.destination}</h3>
        <p></p>
        <b>{arrEst}</b>
      </span>
    </div>
  );
}
