import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import Head from "next/head";
import { generateMetaTags } from "../utils/generateMetaTags";

function MyApp(props: AppProps) {
	let { Component, pageProps } = props;

	// Variables for the (base) meta tags
	const title = "The Stuyvesant Spectator";
	const description =
		"The Stuyvesant Spectator is a student-run bi-weekly publication founded in 1915, serving as the pulse of the Stuyvesant student body.";
	const meta_url = "https://stuyspec.com";

	return (
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
	);
}

export default MyApp;
