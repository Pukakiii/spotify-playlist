import { isVisible } from "@testing-library/user-event/dist/utils";

export default function Playlist({ tracksPlayslist }) {
  return (
    <div className="playlist">
      <form className="playlist-form">
        <label name="namePL">Playlist</label>
        <input name="namePl" type="text" placeholder="e. g. Best songs" />
      </form>
      {tracksPlayslist}
      <div className="add">
        <button>add</button>
      </div>
    </div>
  );
}
