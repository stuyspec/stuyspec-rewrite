import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SubscribeButton from "./SubscribeButton";
import CollapsibleSearch from "./CollapsibleSearch";
import { defaultProps } from "../ts_types/db_types";

const Navbar = (props: defaultProps) => {
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

	console.log("Token inside of navbar: ", props.token);
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
				<SubscribeButton />
			</div>

			<div>
				{props.token ? (
					<Link href="/login">user icon</Link>
				) : (
					<Link href="/login">Log in</Link>
				)}
			</div>
			<ThemeToggle />
			<CollapsibleSearch />
		</nav>
	);
};

export default Navbar;
