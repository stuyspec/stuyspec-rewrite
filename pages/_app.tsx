import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Script from "next/script";
import Head from "next/head";

function MyApp(props: AppProps) {
	let { Component, pageProps } = props;
	return (
		<div>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<Search />
				<div id="navbar">
					<Navbar />
				</div>
				<div id="main">
					<Component {...pageProps} />
				</div>
				<Footer />
				<Script
					async
					defer
					data-website-id="5e1e1ba5-caa7-45b6-b0e3-32770484ac70"
					src="https://umami-fork-alpha.vercel.app/umami.js"
				></Script>
			</div>
		</div>
	);
}

export default MyApp;
