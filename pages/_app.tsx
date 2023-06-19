import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
				<div id="navbar">
					<Navbar />
				</div>
				<button className="btt"><a href="#">UP</a></button>
				<div id="main">
					<Component {...pageProps} />
				</div>
				<Footer />
				<Script
					async
					defer
					data-website-id="931a5d6e-f2d5-4caa-8370-b1389fbe2ff7"
					src="https://umami-fork-alpha.vercel.app/umami.js"
				></Script>
			</div>
		</div>
	);
}

export default MyApp;
