import Head from "next/head";

const Sponsors = () => {
  return (
    <>
      <Head>
        <title>Sponsors | The Spectator</title>
      </Head>
      <div style={{
        margin: "2rem 8rem",
        textAlign: "left", 
        display: "flex",
      }}
        className="sponsors-page"
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
          <div style={{ textAlign: "center" }}>
            <iframe
              src="//e.issuu.com/embed.html#30896636/52588541"
              style={{ width: "450px", height: "600px", margin: "16px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
