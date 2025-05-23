import React from "react";
import Search from "../modules/search";
import Results from "../modules/results";
import Playlist from "../modules/playlist";
import Track from "../modules/track";
import { searchRequest } from "../modules/api";
import { sample } from "../modules/sampleSearchResponse";
import { debounce } from "lodash";

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
        added: false,
      };
      trackArr.push(track);
    }
    return trackArr;
  }

  //add or remove track from playlist
  function addRemoveTrack(id) {
    setTracks((prevTracks) => {
      return prevTracks.map((track) => {
        return id === track.id
          ? { ...track, added: !track.added }
          : { ...track };
      });
    });
  }

  //handle Search request
  const debouncedSearchRequest = React.useMemo(
    () =>
      debounce(async (query) => {
        const data = await searchRequest(query);
        setTracks(generateTrack(data));
      }, 1000),
    []
  );
  function handleRequest(event) {
    event.preventDefault();
    const query = event.target.value;
    if (query.trim().length === 0) return;
    debouncedSearchRequest(query);
  }

  //handle playlist
  function addPlaylist() {
    
  }

  return (
    <main ref={ref}>
      <Search handleRequest={handleRequest} />
      <div className="main-section">
        <Results tracks={tracks} handleTrack={addRemoveTrack} />
        <Playlist handlePlaylist={addPlaylist} tracks={tracks} handleTrack={addRemoveTrack} />
      </div>
    </main>
  );
}
