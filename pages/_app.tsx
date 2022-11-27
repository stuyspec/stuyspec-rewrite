import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";

interface MyAppProps extends AppProps {
	token: string | null;
}

function MyApp(props: MyAppProps) {
	let { Component, pageProps, token } = props;
	return (
		<div>
			<div>
				<Search />
				<div id="navbar">
					<Navbar token={token} />
				</div>
				<div id="main">
					<Component {...pageProps} token={token} />
				</div>
				<Footer />
			</div>
		</div>
	);
}

MyApp.getInitialProps = async (ctx: any) => {
	const token: string | null =
		ctx.ctx.req.headers.cookie?.split("token=")[1] || null;
	return {
		token,
	};
};

export default MyApp;
