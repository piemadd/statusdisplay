export default function TransitCard(lineName, runNum, runDest, arrEst) {
  return (
    <div class="innerCard tripCard">
      <span>
        <p>{lineName} {runNum} to</p>
      </span>
      <span>
        <h3>{runDest}</h3>
        <p></p>
        <b>{arrEst}</b>
      </span>
    </div>
  );
}
