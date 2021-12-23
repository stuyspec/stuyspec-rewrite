import styles from "../styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
const Footer = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link>
      </Head>

      <footer id={styles.footer}>
        <div id={styles.socialsBar}>
          <h1 id={styles.logo}>
            <Link href="/">
              The Spectator
            </Link>
          </h1>
            <Link href="https://open.spotify.com/show/1D0i5KdRFdMNNUwsKVfpYb"><i className="bi bi-spotify" id={styles.mediaButton} /></Link>
          <Link href="https://www.facebook.com/stuyspectator"><i className="bi bi-facebook" id={styles.mediaButton} /></Link>
          <Link href="https://www.instagram.com/stuyspectator/"><i className="bi bi-instagram" id={styles.mediaButton} /></Link>
          <Link href="https://www.linkedin.com/company/the-stuyvesant-spectator"><i className="bi bi-linkedin" id={styles.mediaButton} /></Link>
          <Link href="https://github.com/stuyspec"><i className="bi bi-github" id={styles.mediaButton} /></Link>
        </div>
        <div id={styles.separator}></div>
        {/* <div id={styles.grid}>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
          <div id={styles.cell}>
            <h3 id={styles.department}>News</h3>
            <p id={styles.subdepartment}>Campaign Coverage</p>
            <p id={styles.subdepartment}>10/31 Terror Attack</p>
            <p id={styles.subdepartment}>Black Lives Matter</p>
          </div>
        </div> */}
      </footer>
      </>
	);
};

export default Footer;
