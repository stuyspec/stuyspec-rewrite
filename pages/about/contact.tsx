import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>The Spectator | Contact</title>
      </Head>
      <div style={{ textAlign: "center" }} className="contact-page">
        <p>
          For website related questions: Contact{" "}
          <a style={{ color: "#337ab7" }} href="mailto:web@stuyspec.com">
            web@stuyspec.com
          </a>
          .
        </p>
        <p>
          For all other questions: Contact{" "}
          <a
            style={{ color: "#337ab7" }}
            href="mailto:morriskaren2021@gmail.com"
          >
            morriskaren2021@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default ContactPage;
