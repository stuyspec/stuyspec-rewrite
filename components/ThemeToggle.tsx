import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  function toggleMode() {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", `${!darkMode}`);
  }

  return (
    <>
      {darkMode ? (
        <Image
          src="/images/dark-mode-button.svg"
          width="36px"
          alt="dark mode button"
          height="36px"
          onClick={toggleMode}
          id={styles.colorModeToggle}
          className="button"
        />
      ) : (
        <Image
          src="/images/light-mode-button.svg"
          width="36px"
          alt="light mode button"
          height="36px"
          onClick={toggleMode}
          id={styles.colorModeToggle}
          className="button"
        />
      )}
    </>
  );
};

export default ThemeToggle;