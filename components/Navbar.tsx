import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SubscribeButton from "./SubscribeButton";
import CollapsibleSearch from "./CollapsibleSearch";
import { defaultProps } from "../ts_types/db_types";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
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

			<span
				id={styles.logo_container}
				className={styles.clickable_nav_element}
			>
				<Link passHref href="/">
					<div>
						<span id={styles.logo_the}>The </span>Spectator
					</div>
				</Link>
			</span>
			<div
				id={styles.subscribe_parent}
				className={styles.clickable_nav_element}
			>
				<SubscribeButton />
			</div>

			<div className={styles.clickable_nav_element}>
				{props.token ? (
					<Link passHref href="/dash">
						<span>
							<FaUserCircle className={styles.user_icon} />
						</span>
					</Link>
				) : (
					<Link passHref href="/login">
						<span>
							<MdOutlineLogin className={styles.user_icon} />
						</span>
					</Link>
				)}
			</div>
			<div className={styles.clickable_nav_element}>
				<ThemeToggle />
			</div>
			<div className={styles.clickable_nav_element}>
				<CollapsibleSearch />
			</div>
		</nav>
	);
};

export default Navbar;
