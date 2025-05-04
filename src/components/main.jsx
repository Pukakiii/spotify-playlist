import React from "react";
import Search from "../modules/search";
import Results from "../modules/results";
import Playlist from "../modules/playlist";

export default function Main() {
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

  return (
    <main ref={ref}>
      <Search />
      <div className="main-section">
        <Results />
        <Playlist />
      </div>
    </main>
  );
}
