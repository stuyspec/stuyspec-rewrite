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
			{/* <div id={styles.hamburgerMenu} className="button">
				<Image
					src="/images/hamburger-menu.svg"
					width="24px"
					height="24px"
					onClick={toggleMenu}
					id={styles.hamburgerMenu}
					className="button"
					alt="More options menu button"
				/>
			</div> */}

			<span id={styles.logo_container}>
				<Link passHref href="/">
					<div>
						<span id={styles.logo_the}>The </span>Spectator
					</div>
				</Link>
			</span>
			<div id={styles.subscribe_parent}>
				<Link passHref href="/subscribe">
					<div id={styles.subscribe}>Subscribe</div>
				</Link>
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
