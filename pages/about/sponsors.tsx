import Head from "next/head";
import styles from "../../styles/About.module.css"

const Sponsors = () => {
  return (
    <>
      <Head>
        <title>Sponsors | The Spectator</title>
      </Head>
      <div
        id={styles.container}
      >
        <div style={{ margin: "auto" }}>
          <h1 style={{ fontSize: "var(--large-text)"}}>Sponsors</h1>
          <h2>Become A Sponsor</h2>
          <p style={{ marginTop: "1rem", fontFamily: "Georgia" }}>
            If you are interested in sponsoring The Spectator
            to help preserve the tradition of excellence our
            publication has established heretofore, please
            contact the business managers at {" "}
            <a
              href="mailto:business@stuyspec.com"
              className="link"
            >
              business@stuyspec.com
            </a>.
            For benefits of sponsorship, please see the below
            document.
          </p>
          <div id={styles.issuu} style={{ textAlign: "center" }}>
            <iframe
              src="//e.issuu.com/embed.html#30896636/52588541"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
