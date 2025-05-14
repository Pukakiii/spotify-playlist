import React, { act } from "react";
import Search from "../modules/search";
import Results from "../modules/results";
import Playlist from "../modules/playlist";
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
      // console.log(track);
    }
    return trackArr;
  }
  const trackElements = tracks.map((track, index) => {
    return (
      <div
        className="track-container"
        key={track.name}
        style={{
          backgroundImage: `url(${track.image}), linear-gradient(rgb(255, 255, 255), rgb(138, 138, 138), rgb(255, 255, 255))`,
        }}
      >
        <div className="track">
          <h4>{track.name}</h4>
          <div className="track-data">
            <p>{track.artist}</p>
            <p>-</p>
            <p id="album">{track.album}</p>
          </div>
        </div>
        <button
          onClick={() => {
            addRemoveTrack(track.id);
          }}
        >
          +
        </button>
      </div>
    );
  });
  // console.log("trackElements", trackElements);

  //add or remove track from playlist
  function addRemoveTrack(id) {
    setTracks((prevTracks) => {
      prevTracks.map((track) => {
        return id === id.track ? { ...track, show: !track.show } : { ...track };
      });
    });
  }

  return (
    <main ref={ref}>
      <Search />
      <div className="main-section">
        <Results
          trackElements={trackElements}
          tracks={tracks}
          // addRemoveTrack={addRemoveTrack(tracks.id)}
        />
        <Playlist tracks={tracks} />
      </div>
    </main>
  );
}
