import { isVisible } from "@testing-library/user-event/dist/utils"

export default function Playlist({ tracks, isVisible, setIsVisible }) {
  
  return (
    <div className="playlist">
      <form className="playlist-form">
        <label name="namePL">Playlist</label>
        <input name="namePl" type="text" placeholder="Playlist name..." />
      </form>
      
      <div className="add">
        <button>add</button>
      </div>
    </div>
  );
}
