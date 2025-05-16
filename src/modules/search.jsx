export default function Search({handleRequest}) {
  // console.log(handleRequest)
  return (
    <div className="search">
      <h2>POP IT TWIN</h2>
      <form name="search-form" >
        <input onChange={handleRequest} name="search" type="text" placeholder="artist, song, album" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}