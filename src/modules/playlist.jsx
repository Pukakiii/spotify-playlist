import Track from "./track";
export default function Playlist({
  response,
  refs,
  tracks,
  handleTrack,
  handlePlaylist,
}) {
  console.log("resp:", response);
  let spotifyResponse = "";
  if (response !== null) {
    spotifyResponse =
      response[0] && response[1].snapshot_id
        ? `Created`
        : "Something went wrong";
  }
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
          style={{
            borderBottom:
              !tracksPlayslist.length > 0
                ? "1px solid #000"
                : "2px solid rgb(1, 115, 15)",
          }}
        />
      </form>
      {tracksPlayslist}
      {tracksPlayslist.length > 0 && (
        <div className="add">
          <button onClick={() => handlePlaylist(tracks)}>add</button>
        </div>
      )}
      <div ref={refs.refPlaylistContainer}>{spotifyResponse}</div>
    </div>
  );
}
