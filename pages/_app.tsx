import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const darkMode = localStorage.getItem("dark-mode");
		if (!darkMode) {
			document.documentElement.className = "light-mode";
		} else {
			document.documentElement.className = "dark-mode";
		}
	});
	return (
		<div>
			<div>
				<Search />
				<div id="navbar">
					<Navbar />
				</div>
				<div id="main">
					<Component {...pageProps} />
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default MyApp;
