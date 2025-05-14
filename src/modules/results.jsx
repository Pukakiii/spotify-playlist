export default function Results({ tracks, tracksResult, addRemoveTrack }) {
  return (
    <div className="results">
      <div id="track">
        <h3>Tracks</h3>
      </div>
      {tracksResult}
    </div>
  );
}
