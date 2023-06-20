import Head from "next/head";
import styles from "../styles/Trending.module.css";

const TrendingPage = () => {
    return(
        <><Head>
            <title>Trending | The Spectator</title>
        </Head>
        <h1 className={styles.main}>
            Trending
        </h1></>
    );
};
