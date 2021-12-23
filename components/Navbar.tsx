import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
	return (
    <nav id={styles.nav}>
      <Image src="/images/hamburger-menu.svg" width="24px" height="24px" id={styles.hamburgerMenu} />
      <h1 id={styles.title}>
        <Link href="/">
          The Spectator
        </Link>
      </h1>
      <div id={styles.subscribe}>Subscribe</div>
      <Image src="/images/dark-mode-button.svg" width="36px" height="36px" id={styles.colorModeToggle} />
      <Image src="/images/search-button.svg" width="32px" height="32px" id={styles.searchButton} />
		</nav>
	);
};

export default Navbar;
