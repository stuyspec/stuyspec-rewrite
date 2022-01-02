import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact | The Spectator</title>
      </Head>
      <div style={{
          textAlign: "center", 
          display: "flex",
          height: "calc(100vh - 172px)"
        }}
        className="contact-page"
      >
        <div style={{ margin: "auto" }}>
          <h1>Contact Us</h1>
          <p style={{ marginTop: "32px", fontFamily: "Georgia" }}>
            For website related questions: Contact{" "}
            <a
              className="link"
              href="mailto:web@stuyspec.com"
            >
              web@stuyspec.com
            </a>
            .
          </p>
          <p style={{marginTop: "8px", fontFamily: "Georgia"}}>
            For all other questions: Contact{" "}
            <a
              className="link"
              href="mailto:morriskaren2021@gmail.com"
            >
              morriskaren2021@gmail.com
            </a>
            .
          </p>
        </div>
        
      </div>
    </>
  );
};

export default ContactPage;
