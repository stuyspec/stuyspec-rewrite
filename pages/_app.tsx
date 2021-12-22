import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div>
			<div>
				<Navbar />
				<div id="main">
					<Component {...pageProps} />
				</div>
			</div>
		</div>
	);
}

export default MyApp;
