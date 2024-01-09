import Image from "next/image";
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
	const { setTheme } = useTheme();

	return (
		<>
			<Image
				src="/images/light-mode-button.svg"
				data-hide-on-theme="light"
				width={36}
				alt="theme toggle button"
				height={36}
				onClick={() => setTheme('light')}
				className="button"
			/>
			<Image
				src="/images/dark-mode-button.svg"
				data-hide-on-theme="dark"
				width={36}
				alt="theme toggle button"
				height={36}
				onClick={() => setTheme('dark')}
				className="button"
			/>
		</>
	);
};

export default ThemeToggle;
