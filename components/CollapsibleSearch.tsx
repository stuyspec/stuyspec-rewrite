import { useState } from "react";
import Image from "next/image";

const CollapsibleSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchBar, setSearchBar] = useState(false);

  const onSearchBlur = () => {
    setSearchBar(false);
  };

  const onSearchFocus = () => {
    setSearchBar(true);
  };
  function submitSearchRequest() {}

  return (
    <>
      <div className="field">
        <p className="control">
          <div
            style={{
              display: searchBar ? "none" : "block",
              transition: 'visibility 0s, opacity 0.5s linear'
            }}
            className="search"
          >
            <Image
              alt="Search"
              src="/images/search-button.svg"
              width="32px"
              height="32px"
              onClick={onSearchFocus}
              className="button"
            />
          </div>
          <input
            className="search"
            style={{
              borderRadius: "4px",
              width: searchBar ? "100%" : "0",
              display: searchBar ? "inherit" : "none",
              transition: "all 0.5s ease-in-out",
              padding: "0.5rem",
              fontSize: "1rem",
            }}
            placeholder="Search"
            onFocus={onSearchFocus}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={onSearchBlur}
            onSubmit={submitSearchRequest}
          />
        </p>
      </div>
    </>
  );
};

export default CollapsibleSearch;
