import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	return (
		<>
			{theme === "dark" ? (
				<Image
					src="/images/light-mode-button.svg"
					width={36}
					alt="theme toggle button"
					height={36}
					onClick={() => setTheme('light')}
					id={styles.colorModeToggle}
					className="button"
				/>
			) : (
				<Image
					src="/images/dark-mode-button.svg"
					width={36}
					alt="theme toggle button"
					height={36}
					onClick={() => setTheme('dark')}
					id={styles.colorModeToggle}
					className="button"
				/>
			)}
		</>
	);
};

export default ThemeToggle;
