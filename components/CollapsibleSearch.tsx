import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import styles from "../styles/CollapsibleSearch.module.css";
import { get_articles_by_string_query } from "../db";

const CollapsibleSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const textInput = useRef<HTMLInputElement>(null);

  const onSearchBlur = () => {
    setSearchBar(false);
    setSuggestions([]);
  };

  const onSearchFocus = () => {
    setSearchBar(true);
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    
    const newSuggestions = await getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const onSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setSuggestions([]);
    setSearchBar(true); 
    textInput.current?.focus();


    Router.push({
      pathname: '/search',
      query: { query: encodeURIComponent(suggestion) },
    });
  };

  const submitSearchRequest = (e: React.FormEvent) => {
    e.preventDefault();
    Router.push(`/search?query=${searchValue}`);
  };

  const getSuggestionList = () => {
    return (
      <div className={styles.suggestionContainer}>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={styles.suggestionItem}
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchBar(false);
      setSuggestions([]);
    };

    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div id={styles.collapsible_search_parent}>
      <form onSubmit={submitSearchRequest}>
        <div
          style={{
            display: !searchBar ? "block" : "none",
            transition: "visibility 0s, opacity 0.2s linear",
          }}
          id={styles.search_button}
          onClick={onSearchFocus}
        >
          <Image alt="Search" src="/images/search-button.svg" width={32} height={32} />
        </div>
        <div className={styles.searchContainer}>
          <input
            id={styles.search_textbox}
            style={{
              marginRight: searchBar ? "0" : "-250px",
              opacity: searchBar ? "1" : "0",
              cursor: searchBar ? "auto" : "pointer",
              zIndex: searchBar ? 3 : -1,
            }}
            placeholder="Search"
            onFocus={onSearchFocus}
            onChange={onInputChange}
            onBlur={onSearchBlur}
            value={searchValue}
            ref={textInput}
          />
          {suggestions.length > 0 && getSuggestionList()}
        </div>
      </form>
    </div>
  );
};


const getSuggestions = async (input: string) => {

  const articles = await get_articles_by_string_query(input, 5);
  // .then((articles) => {

  //   console.log(articles);

 
  // })
  // .catch((error) => {

  //   console.error(error);
  // });
  // ;
  
  const suggestions = ["apple", "banana", "orange", "pineapple", "pear"];
  console.log()
  return suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(input.toLowerCase())
  );
};

export default CollapsibleSearch;
