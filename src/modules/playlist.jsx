import Track from "./track";
export default function Playlist({ tracks, handleTrack }) {
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
        <input name="namePl" type="text" placeholder="e. g. Best songs" />
      </form>
      {tracksPlayslist}
      <div className="add">
        <button onClick={""}>add</button>
      </div>
    </div>
  );
}
