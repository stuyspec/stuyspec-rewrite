import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

const ThemeToggle = () => {
	const [theme, setTheme] = useState(getTheme());

	function getTheme() {
		if (typeof window !== "undefined") {
			return localStorage.getItem("theme");
		}
	}

	useEffect(() => {
		if (theme === "light") {
			document.documentElement.className = "light-mode";
			localStorage.setItem("theme", `${theme}`);
		} else {
			document.documentElement.className = "dark-mode";
			localStorage.setItem("theme", `${theme}`);
		}
	});

	function toggleTheme() {
		if (theme === "dark") {
			document.documentElement.className = "light-mode";
			setTheme("light");
			localStorage.setItem("theme", `${theme}`);
		} else {
			document.documentElement.className = "dark-mode";
			setTheme("dark");
			localStorage.setItem("theme", `${theme}`);
		}
	}

	return (
		<>
			{theme === "dark" ? (
				<Image
					src="/images/light-mode-button.svg"
					width="36px"
					alt="dark mode button"
					height="36px"
					onClick={toggleTheme}
					id={styles.colorModeToggle}
					className="button"
				/>
			) : (
				<Image
					src="/images/dark-mode-button.svg"
					width="36px"
					alt="light mode button"
					height="36px"
					onClick={toggleTheme}
					id={styles.colorModeToggle}
					className="button"
				/>
			)}
		</>
	);
};

export default ThemeToggle;
