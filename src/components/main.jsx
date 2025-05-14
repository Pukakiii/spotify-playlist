import React, { act } from "react";
import Search from "../modules/search";
import Results from "../modules/results";
import Playlist from "../modules/playlist";
import Track from "../modules/track";
import { searchRequest, tokenRequest } from "../modules/api";
import { sample } from "../modules/sampleSearchResponse";

export default function Main() {
  const [tracks, setTracks] = React.useState(generateTrack());

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
  function generateTrack() {
    const trackArr = [];
    for (let i = 0; i < sample.tracks.items.length; i++) {
      const track = {
        name: sample.tracks.items[i].name,
        artist: sample.tracks.items[i].artists[0].name,
        album: sample.tracks.items[i].album.name,
        image: sample.tracks.items[i].album.images[0].url,
        id: sample.tracks.items[i].name,
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

  //add or remove track from playlist
  function addRemoveTrack(id) {
    setTracks((prevTracks) => {
      return prevTracks.map((track) => {
        return id === track.id ? { ...track, show: !track.show } : { ...track };
      });
    });
  }

  return (
    <main ref={ref}>
      <Search />
      <div className="main-section">
        <Results tracksResult={tracksResult} tracks={tracks} />
        <Playlist tracksPlayslist={tracksPlayslist} tracks={tracks} />
      </div>
    </main>
  );
}
