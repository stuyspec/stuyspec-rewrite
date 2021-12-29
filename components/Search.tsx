import styles from "../styles/Search.module.css";
import { useState } from "react";
import Image from "next/image";
const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  function disableSearch() {
    console.log("clicked");
    let buttons = Array.from(
      document.getElementsByClassName("button") as HTMLCollectionOf<HTMLElement>
    );
    for (let ele of buttons) {
      ele.style.display = "inherit";
    }
    Array.from(
      document.getElementsByClassName("search") as HTMLCollectionOf<HTMLElement>
    )[0].style.display = "none";
  }

  function submitSearchRequest() {}

  return (
    <>
      <div id={styles.search} className="search">
        <Image
          src="/images/exit-button.svg"
          alt="exit"
          width="48px"
          height="48px"
          onClick={disableSearch}
          id={styles.exitButton}
          className="exit-button"
        />
        <div id={styles.searchBar}>
          <input
            type={"text"}
            id={styles.searchBox}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search"}
            autoComplete={"off"}
          />
          <i id={styles.searchArrow} onClick={submitSearchRequest}>
            <Image
              alt="send search"
              src="/images/search-arrow.svg"
              width="32px"
              height="32px"
            />
          </i>
        </div>
      </div>
    </>
  );
};

export default Search;
