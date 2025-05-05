export default function Playlist({ results }) {
  return (
    <div className="playlist">
      <form className="playlist-form">
        <label name="namePL">Playlist</label>
        <input name="namePl" type="text" placeholder="Playlist name..." />
      </form>
      <div className="result-container">
        <div className="result-item">
          <h4>songaapahcariii</h4>
          <div className="result">
            <p>bla artiss</p>
            <p id="album">album ble bla</p>
          </div>
        </div>
        <button>-</button>
      </div>
      <div className="result-container">
        <div className="result-item">
          <h4>songaapahcariii</h4>
          <div className="result">
            <p>bla artiss</p>
            <p id="album">album ble bla</p>
          </div>
        </div>
        <button>-</button>
      </div>
      <div className="result-container">
        <div className="result-item">
          <h4>songaapahcariii</h4>
          <div className="result">
            <p>bla artiss</p>
            <p id="album">album ble bla</p>
          </div>
        </div>
        <button>-</button>
      </div>
      <div className="add">
        <button>add</button>
      </div>
    </div>
  );
}
