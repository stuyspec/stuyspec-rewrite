import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import Head from "next/head";

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
				<title>{title}</title>

				{/* Meta tags must have keys so that NextJS can override/remove duplicate meta tags */}
				<meta name="title" content={title} key="title" />
				<meta
					name="description"
					content={description}
					key="description"
				/>

				{/* Open Graph / Facebook  */}
				<meta property="og:type" content="website" key="og_website" />
				<meta property="og:url" content={meta_url} key="og_url" />
				<meta property="og:title" content={title} key="og_title" />
				<meta
					property="og:description"
					content={description}
					key="og_description"
				/>

				{/* Twitter */}
				<meta
					property="twitter:url"
					content={meta_url}
					key="twitter_url"
				/>
				<meta
					property="twitter:title"
					content={title}
					key="twitter_title"
				/>
				<meta
					property="twitter:description"
					content={description}
					key="twitter_description"
				/>
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
