import Track from "./track";
export default function Playlist({ ref, tracks, handleTrack, handlePlaylist }) {
  const tracksPlayslist = tracks
    .filter((track) => track.added)
    .map((track) => {
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
    <div className="playlist">
      <form className="playlist-form">
        <label name="namePL">Playlist</label>
        <input
          ref={ref}
          name="namePl"
          type="text"
          placeholder="e. g. Best songs"
        />
      </form>
      {tracksPlayslist}
      <div className="add">
        <button onClick={() => handlePlaylist(tracks)}>add</button>
      </div>
    </div>
  );
}
