import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {

  const [searchValue, setSearchValue] = useState("");

  function toggleMenu() {

  }

  function toggleMode() {

  }

  function enableSearch() {
    var buttons = document.getElementsByClassName("button");
    for (let ele of buttons) {
      ele.style.display = "none";
    }
    document.getElementsByClassName("search")[0].style.display = "inherit";
  }

  return (
    <nav id={styles.nav}>
      <Image src="/images/hamburger-menu.svg" width="24px" height="24px" onClick={toggleMenu} id={styles.hamburgerMenu} className="button" />
      
      <h1 id={styles.logo}>
        <Link href="/">
          The Spectator
        </Link>
      </h1>

      <div id={styles.subscribe}>
        <Link href="/">
          Subscribe
        </Link>
      </div>
      
      <Image src="/images/dark-mode-button.svg" width="36px" height="36px" onClick={toggleMode} id={styles.colorModeToggle} className="button" />
      <Image src="/images/search-button.svg" width="32px" height="32px" onClick={enableSearch} id={styles.searchButton} className="button" />
    </nav>
  );
};

export default Navbar;
