
import Head from "next/head";
import { ReceivedStaff } from "../../ts_types/db_types";
import { get_staff_by_position } from "../../db";

interface Props {
  manager: ReceivedStaff;
}

const Advertise = (props: Props) => {

  const { name, email } = props.manager;
  
  return (
    <>
      <Head>
        <title>Advertise | The Spectator</title>
      </Head>
      <div style={{
        margin: "2rem 8rem",
        textAlign: "left", 
        display: "flex",
      }}
        className="advertise-page"
      >
        <div style={{ margin: "auto" }}>
          <h1 style={{ fontSize: "var(--large-text)" }}>Advertise</h1>
          
          <h2 style={{ fontSize: "var(--medium-text)" }}>Local Advertising</h2>
          <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
            Local advertisers are classified as all those companies
            either headquartered within New York City or whose New
            York City local branch is placing an advertisement. The
            best way to contact an advertising representative is to {" "}
            <a href="mainto:specbusiness@gmail.com" className="link">e-mail the business manager</a>.
            For information on rates and our publication schedule,
            please see the advertising forms below.
          </p>

          <h2 style={{ fontSize: "var(--medium-text)" }}>National Advertising</h2>
          <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
            Please direct all national advertising orders and
            questions to our business desk:
            <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
              Email: <a href="mainto:specbusiness@gmail.com" className="link">business@stuyspec.com</a>
            </p>
            <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
              Fax: 212-587-3874, attn. The Spectator
            </p>
            <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
              Phone: 212-312-4800 ext. 2601
            </p>
          </p>

          <h2 style={{ fontSize: "var(--medium-text)" }}>Student Groups</h2>
          <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
            All Clubs and Pubs are offered discounted advertising rates in
            The Spectator! In order to place an ad, a representative
            (a president or cabinet member) must email {" "}
            <a href="mainto:specbusiness@gmail.com" className="link">business@stuyspec.com</a>
            {" "} with the following things:
            <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
              Group Name
            </p>
            <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
              Size of ad requested
            </p>
            <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
              The date they would like the advertisement to appear
            </p>
            <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
              A digital copy of the ad in JPG or PDF format
            </p>
          </p>
          <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
            Large ad sizes are available. Please contact {" "}
            <a href="mainto:specbusiness@gmail.com" className="link">business@stuyspec.com</a>
            {" "} for more details.
          </p>

          <h2 style={{ fontSize: "var(--medium-text)" }}>Contact Business Directly</h2>
          <p style={{ marginTop: "1rem", marginLeft: "2rem", fontFamily: "Georgia" }}>
            Manager: {name}
            <div style={{margin: "4px"}} />
            Email: {email}
          </p>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {

  let manager = await get_staff_by_position("business manager");
  if (manager) {
    return {
      props: { manager: JSON.parse(JSON.stringify(manager)) }
    }
  } else { return { notFound: true } }
  
}

export default Advertise;
