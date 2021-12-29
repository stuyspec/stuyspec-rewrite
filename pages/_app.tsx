import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";

function MyApp({ Component, pageProps }: AppProps) {
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

if (typeof window !== "undefined") {
  document.documentElement.className = "light-mode";
}

export default MyApp;
