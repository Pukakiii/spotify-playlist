import Track from "./track";
export default function Results({ tracks, handleTrack }) {
  const tracksResult = tracks
    .filter((track) => !track.added) // Only include tracks where add is true
    .map((track, index) => {
      return (
        <Track
          name={track.name}
          artist={track.artist}
          album={track.album}
          image={track.image}
          id={track.id}
          key={track.id}
          added={track.added}
          addRemoveTrack={handleTrack}
        />
      );
    });
  return (
    <div className="results">
      <div id="track">
        <h3>Tracks</h3>
      </div>
      {tracksResult}
    </div>
  );
}
