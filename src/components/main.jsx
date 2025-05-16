import React, { act } from "react";
import Search from "../modules/search";
import Results from "../modules/results";
import Playlist from "../modules/playlist";
import Track from "../modules/track";
import { searchRequest, tokenRequest } from "../modules/api";
import { sample } from "../modules/sampleSearchResponse";

export default function Main() {
  const [tracks, setTracks] = React.useState(() => generateTrack(sample));

  // Scroll to the element after 2 seconds
  const ref = React.useRef(null);
  React.useEffect(() => {
    const mainNode = ref.current;
    setTimeout(() => {
      if (mainNode) {
        mainNode.scrollIntoView({ behavior: "smooth" });
      }
    }, 3000);
  }, []);

  // generate track
  function generateTrack(data = sample) {
    const trackArr = [];
    for (let i = 0; i < data.tracks?.items.length; i++) {
      const track = {
        name: data.tracks.items[i].name,
        artist: data.tracks.items[i].artists[0].name,
        album: data.tracks.items[i].album.name,
        image: data.tracks.items[i].album.images[0].url,
        id: data.tracks.items[i].id,
        show: true,
      };
      trackArr.push(track);
    }
    return trackArr;
  }

  const tracksResult = tracks
    .filter((track) => track.show) // Only include tracks where show is true
    .map((track, index) => {
      return (
        <Track
          name={track.name}
          artist={track.artist}
          album={track.album}
          image={track.image}
          id={track.id}
          key={track.id}
          show={track.show}
          addRemoveTrack={addRemoveTrack}
        />
      );
    });
  const tracksPlayslist = tracks
    .filter((track) => !track.show) // Only include tracks where show is not true
    .map(track => {
      return (
        <Track
          name={track.name}
          artist={track.artist}
          album={track.album}
          image={track.image}
          id={track.id}
          key={track.id}
          show={track.show}
          addRemoveTrack={addRemoveTrack}
        />
      );
    });

  //add or remove track from playlist
  function addRemoveTrack(id) {
    setTracks((prevTracks) => {
      return prevTracks.map((track) => {
        return id === track.id ? { ...track, show: !track.show } : { ...track };
      });
    });
  }

  //handle request
  async function handleRequest(event) {
    event.preventDefault();
    const query = event.target.value;
    const data = await searchRequest(query);
    setTracks(generateTrack(data))
  }

  return (
    <main ref={ref}>
      <Search handleRequest={handleRequest} />
      <div className="main-section">
        <Results tracksResult={tracksResult} tracks={tracks} />
        <Playlist tracksPlayslist={tracksPlayslist} tracks={tracks} />
      </div>
    </main>
  );
}
