export default function Search({ handleSearchRequest }) {
  return (
    <div className="search">
      <h2>POP IT TWIN</h2>
      <form name="search-form">
        <input
          onChange={handleSearchRequest}
          name="search"
          type="text"
          placeholder="artist, song, album"
        />
      </form>
    </div>
  );
}
