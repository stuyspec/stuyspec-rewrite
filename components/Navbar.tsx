import styles from "../styles/Navbar.module.css";
import Link from "next/link";
const Navbar = () => {
	return (
		<nav id={styles.nav}>
			<Link href="/">
				<a id={styles.title}>The Spectator</a>
			</Link>
		</nav>
	);
};

export default Navbar;
