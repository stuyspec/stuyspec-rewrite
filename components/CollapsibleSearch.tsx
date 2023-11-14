import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import styles from "../styles/CollapsibleSearch.module.css";
import { ReceivedArticle } from "../ts_types/db_types";

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
    // TODO: FOR ABIDUR, MAKE SUGGESTIONS A LIST OF RECIEVEDARTICLE
    // setSuggestions(newSuggestions);

    // but for demo purposes
    setSuggestions(newSuggestions.map(v => v.title));
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

  const getSuggestions = async (input: string) => {
    if (!input){
      return [];
    }

    const request = await fetch(`/api/articles/search?q=${input}&max=5`);
    const rjson = await request.json()
    if (!rjson.articles){
      throw new Error("Articles were not returned from search");
    }
    const articles = rjson.articles as ReceivedArticle[];

    return articles;
  };
  

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


export default CollapsibleSearch;
