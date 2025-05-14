export default function Search() {

  return (
    <div className="search">
      <h2>POP IT TWIN</h2>
      <form name="search-form" >
        <input type="text" placeholder="artist, song, album" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}