import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import Head from "next/head";
import Sidenav from "../components/Sidenav";

function MyApp(props: AppProps) {
	let { Component, pageProps } = props;
	return (
		<div>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<div id="navbar">
					<Navbar />
				</div>
				<div id="sidenav">
					<Sidenav />
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
