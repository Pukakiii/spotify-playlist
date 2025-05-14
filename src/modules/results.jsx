export default function Results({ tracks, trackElements, addRemoveTrack }) {
  console.log(trackElements)
  return (
    <div className="results">
      <div id="track">
        <h3>Tracks</h3>
      </div>
      {trackElements}
    </div>
    
  );
}
