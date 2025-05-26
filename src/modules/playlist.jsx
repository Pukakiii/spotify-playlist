import Track from "./track";
export default function Playlist({ refs, tracks, handleTrack, handlePlaylist }) {
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
          ref={refs.refPlaylist}
          name="namePl"
          type="text"
          placeholder="e. g. Best songs"
          style={{borderBottom: !tracksPlayslist.length > 0 ? "1px solid #000": "2px solid rgb(1, 115, 15)"}}
        />
      </form>
      {tracksPlayslist}
      {tracksPlayslist.length > 0 && (
        <div className="add">
          <button onClick={() => handlePlaylist(tracks)}>add</button>
        </div>
      )}
      <div ref={refs.refPlaylistContainer}></div>
    </div>
  );
}
