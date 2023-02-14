import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Script from "next/script";
import Head from "next/head";

interface MyAppProps extends AppProps {
	token: string | null;
}

function MyApp(props: MyAppProps) {
	let { Component, pageProps, token } = props;
	return (
		<div>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<Search />
				<div id="navbar">
					<Navbar token={token} />
				</div>
				<div id="main">
					<Component {...pageProps} token={token} />
				</div>
				<Footer token={token} />
				<Script
					async
					defer
					data-website-id="a620d392-1679-4bc0-947b-2c0b32974fc3"
					src="https://umami-fork-alpha.vercel.app/umami.js"
				></Script>
			</div>
		</div>
	);
}

MyApp.getInitialProps = async (ctx: any) => {
	let token: string | null = null;
	try {
		token = ctx.ctx.req.headers.cookie?.split("token=")[1] || null;
	} catch (e: any) {
		if (typeof window !== "undefined") {
			console.log(
				"Client! Get cookies by JS from document cookie storage"
			);
			token = window.document.cookie?.split("token=")[1];
		}
	}

	return {
		token,
	};
};

export default MyApp;
