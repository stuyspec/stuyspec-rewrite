import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import Head from "next/head";
import LoadingBar from "react-top-loading-bar";
import { generateMetaTags } from "../utils/generateMetaTags";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from 'next-themes'

function MyApp(props: AppProps) {
	let { Component, pageProps } = props;
	const [progress, setProgress] = useState(0);
	const router = useRouter();

	useEffect(() => {
		// Client side loading bar
		router.events.on("routeChangeStart", () => {
			setProgress(40); // just changed route
		});

		router.events.on("routeChangeComplete", () => {
			setProgress(100); // route loaded
		});
	}, []);

	// Variables for the (base) meta tags
	const title = "The Stuyvesant Spectator";
	const description =
		"The Stuyvesant Spectator is a student-run bi-weekly publication founded in 1915, serving as the pulse of the Stuyvesant student body.";
	const meta_url = "https://stuyspec.com";

	return (
		<ThemeProvider defaultTheme="light" enableSystem>
			<div>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png?v=1.0"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png?v=1.0"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png?v=1.0"
					/>
					<link rel="manifest" href="/site.webmanifest?v=1.0" />
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg?v=1.0"
						color="#5bbad5"
					/>
					<link rel="shortcut icon" href="/favicon.ico?v=1.0" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />

					{generateMetaTags(title, description, meta_url)}
				</Head>
				<LoadingBar
					color='#4283e4'
					progress={progress}
					onLoaderFinished={() => setProgress(0)}
					waitingTime={500}
				/>
				<div>
					<div id="navbar">
						<Navbar />
					</div>
					<div id="main">
						<Component {...pageProps} />
					</div>
					<Footer />
					<Script
						async
						src="https://umami.stuyspec.com/script.js"
						data-website-id="37284781-2b87-4063-8035-5a7f3e7ab6d3"
					></Script>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default MyApp;
