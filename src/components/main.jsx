import React from "react";
import Search from "../modules/search";
import Results from "../modules/results";
import Playlist from "../modules/playlist";
import {
  searchRequest,
  addTracksToPlaylist,
  createPlaylist,
} from "../modules/api";
import { sample } from "../modules/sampleSearchResponse";
import { add, debounce } from "lodash";

export default function Main() {
  const [tracks, setTracks] = React.useState(() => generateTrack(sample));

  // Scroll to the element after 2 seconds
  const refScroll = React.useRef(null);
  React.useEffect(() => {
    const mainNode = refScroll.current;
    setTimeout(() => {
      if (mainNode) {
        mainNode.scrollIntoView({ behavior: "smooth" });
      }
    }, 3000);
  }, []);

  // generate track
  function generateTrack(data = sample) {
    const trackArr = [];
    for (let i = 0; i < data.tracks.items.length; i++) {
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
  function handleSearchRequest(event) {
    event.preventDefault();
    const query = event.target.value;
    if (query.trim().length === 0) return;
    debouncedSearchRequest(query);
  }

  //handle playlist
  const refPlaylist = React.useRef(null);
  const refPlaylistContainer = React.useRef(null);
  async function addPlaylist(tracks) {
    const playlistName = refPlaylist.current?.value;
    console.log("Playlist name:", playlistName);

    if (playlistName || playlistName.trim().length !== 0) {
      const playlist = await createPlaylist(playlistName);
      const addTracksResponse = await addTracksToPlaylist(tracks, playlist);
      console.log("Add tracks response:", addTracksResponse);
      console.log("create pl resp:", playlist);
      setTracks((prevTracks) =>
        prevTracks.map((track) => ({ ...track, added: false }))
      ); // Reset all tracks to not added

      playlist && addTracksResponse.snapshot_id
        ? refPlaylistContainer.current.classList.add("success-animation")
        : refPlaylistContainer.current.classList.add("error-animation");
    
      } else {
      refPlaylist.current.classList.remove("pop-animation");
      void refPlaylist.current.offsetWidth; // Trigger reflow
      refPlaylist.current.classList.add("pop-animation");
    }
    // Clear the input after reading
    if (refPlaylist.current) {
      refPlaylist.current.value = "";
    }
  }

  return (
    <main ref={refScroll}>
      <Search handleSearchRequest={handleSearchRequest} />
      <div className="main-section">
        <Results tracks={tracks} handleTrack={addRemoveTrack} />
        <Playlist
          refs={{refPlaylist, refPlaylistContainer}}
          handlePlaylist={addPlaylist}
          tracks={tracks}
          handleTrack={addRemoveTrack}
        />
      </div>
    </main>
  );
}
