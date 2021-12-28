import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
	function toggleMenu() {}

	function enableSearch() {
		var buttons = Array.from(
			document.getElementsByClassName(
				"button"
			) as HTMLCollectionOf<HTMLElement>
		);
		for (let ele of buttons) {
			ele.style.display = "none";
		}

		Array.from(
			document.getElementsByClassName(
				"search"
			) as HTMLCollectionOf<HTMLElement>
		)[0].style.display = "inherit";
	}

	return (
		<nav id={styles.nav}>
			<Image
				src="/images/hamburger-menu.svg"
				width="24px"
				height="24px"
				onClick={toggleMenu}
				id={styles.hamburgerMenu}
				className="button"
				alt="More options menu button"
			/>

			<h1 id={styles.logo}>
				<Link href="/">The Spectator</Link>
			</h1>

			<div id={styles.subscribe}>
				<Link href="/">Subscribe</Link>
			</div>

			<ThemeToggle />
			<Image
				alt="Search"
				src="/images/search-button.svg"
				width="32px"
				height="32px"
				onClick={enableSearch}
				id={styles.searchButton}
				className="button"
			/>
		</nav>
	);
};

export default Navbar;
