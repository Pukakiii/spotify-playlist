export default function Track(props) {
  return (
    <div
      className="track-container"
      key={props.id}
      style={{
        backgroundImage: `url(${props.image}), linear-gradient(rgb(255, 255, 255), rgb(138, 138, 138), rgb(255, 255, 255))`,
      }}
    >
      <div className="track">
        <h4>{props.name}</h4>
        <div className="track-data">
          <p title={props.artist}>{props.artist}</p>
          <p >-</p>
          <p title={props.album} id="album" >{props.album}</p>
        </div>
      </div>
      <button
        onClick={() => {
          props.addRemoveTrack(props.id);
        }}
      >
        {props.added ? "-" : "+"}
      </button>
    </div>
  );
}
