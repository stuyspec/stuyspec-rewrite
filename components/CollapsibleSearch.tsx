import { useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";

const CollapsibleSearch = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searchBar, setSearchBar] = useState(false);
	const textInput = useRef<HTMLInputElement>(null);

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
	function submitSearchRequest() {
		Router.push(String("/search?query=" + searchValue));
	}

	return (
		<>
			<div className="field">
				<form className="control" onSubmit={submitSearchRequest}>
					<div
						style={{
							display: searchBar ? "none" : "block",
							transition: "visibility 0s, opacity 0.5s linear",
						}}
						className="search"
					>
						<Image
							alt="Search"
							src="/images/search-button.svg"
							width={32}
							height={32}
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
						autoFocus
						ref={textInput}
					/>
				</form>
			</div>
		</>
	);
};

export default CollapsibleSearch;
