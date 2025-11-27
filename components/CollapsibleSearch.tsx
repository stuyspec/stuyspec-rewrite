import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import styles from "../styles/CollapsibleSearch.module.css";
import { useRouter } from "next/navigation";

const CollapsibleSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSearchBlur = () => {
    setSearchBar(false);
  };

  const onSearchFocus = () => {
    setSearchBar(true);

    // Set timeout for 1ms to focus text input AFTER it renders
    setTimeout(() => {
      textInput.current?.focus();
    }, 1);
  };
  function submitSearchRequest(e: FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      Router.push(String("/search?query=" + searchValue));
    }
    //router.refresh();
  }

  return (
    <div id={styles.collapsible_search_parent}>
      <form onSubmit={submitSearchRequest} className={styles.formContainer}>
        <div
          className={styles.magnifyingGlassContainer}
          onClick={onSearchFocus}
          style={{
            visibility: searchBar ? "hidden" : "visible"
          }}
        >
          <span id={styles.magnifying_glass} aria-label="search button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
        </div>

        <div className={styles.seachBoxContainer}>
          <input
            style={{
              // visibility: searchBar ? "visible" : "hidden",
              transform: searchBar ? "translateX(0%)" : "translateX(150%)"
            }}
            id={styles.search_textbox}
            placeholder="Search"
            onFocus={onSearchFocus}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={onSearchBlur}
            ref={textInput}
          />
        </div>
      </form>
    </div>
  );
};

export default CollapsibleSearch;
