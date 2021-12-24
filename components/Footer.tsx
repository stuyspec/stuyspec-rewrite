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
          <div id={styles.mediaButtons}>
            <Link href="https://open.spotify.com/show/1D0i5KdRFdMNNUwsKVfpYb"><i className="bi bi-spotify" id={styles.mediaButton} /></Link>
            <Link href="https://www.facebook.com/stuyspectator"><i className="bi bi-facebook" id={styles.mediaButton} /></Link>
            <Link href="https://www.instagram.com/stuyspectator/"><i className="bi bi-instagram" id={styles.mediaButton} /></Link>
            <Link href="https://www.linkedin.com/company/the-stuyvesant-spectator"><i className="bi bi-linkedin" id={styles.mediaButton} /></Link>
            <Link href="https://github.com/stuyspec"><i className="bi bi-github" id={styles.mediaButton} /></Link>
          </div>
        </div>
        <div id={styles.separator}></div>
        <div id={styles.grid}>
          <div id={styles.column}>
            <div id={styles.cell}>
              <h3 id={styles.department}>News</h3>
              <p id={styles.subdepartment}>Campaign Coverage</p>
              <p id={styles.subdepartment}>10/31 Terror Attack</p>
              <p id={styles.subdepartment}>Black Lives Matter</p>
            </div>
            <div id={styles.cell}>
              <h3 id={styles.department}>Features</h3>
              <p id={styles.subdepartment}>VOICES</p>
              <p id={styles.subdepartment}>9/11</p>
            </div>
            <div id={styles.cell}>
              <h3 id={styles.department}>Opinions</h3>
              <p id={styles.subdepartment}>#BlackLivesMatter</p>
              <p id={styles.subdepartment}>Staff Editorials</p>
              <p id={styles.subdepartment}>Writing Competition</p>
            </div>
          </div>
          <div id={styles.column}>
            <div id={styles.cell}>
              <h3 id={styles.department}>Science</h3>
              <p id={styles.subdepartment}>Science at Stuy</p>
              <p id={styles.subdepartment}>Coronavirus Pandemic</p>
            </div>
            <div id={styles.cell}>
              <h3 id={styles.department}>Humor</h3>
              <p id={styles.subdepartment}>Disrespectator</p>
              <p id={styles.subdepartment}>Spooktator</p>
            </div>
            <div id={styles.cell}>
              <h3 id={styles.department}>Sports</h3>
              <p id={styles.subdepartment}>Professional Sports</p>
              <p id={styles.subdepartment}>Sports At Stuy</p>
            </div>
          </div>
          <div id={styles.column}>
            <div id={styles.cell}>
              <h3 id={styles.department}>Arts and Entertainment</h3>
              <p id={styles.subdepartment}>Fashion</p>
              <p id={styles.subdepartment}>Art</p>
              <p id={styles.subdepartment}>Culture</p>
              <p id={styles.subdepartment}>Film</p>
              <p id={styles.subdepartment}>Food</p>
              <p id={styles.subdepartment}>Literature</p>
              <p id={styles.subdepartment}>Music</p>
              <p id={styles.subdepartment}>Television</p>
              <p id={styles.subdepartment}>Theater</p>
              <p id={styles.subdepartment}>Thinkpiece</p>
              <p id={styles.subdepartment}>SING!</p>
              <p id={styles.subdepartment}>STC</p>
            </div>
          </div>
          <div id={styles.column}>
            <div id={styles.cell}>
              <h3 id={styles.department}>Media</h3>
            </div>
            <div id={styles.cell}>
              <h3 id={styles.department}>Spec+</h3>
              <p id={styles.subdepartment}>Quarenzine</p>
              <p id={styles.subdepartment}>Undercurrents</p>
            </div>
            <div id={styles.cell}>
              <h3 id={styles.department}>About Us</h3>
              <p id={styles.subdepartment}>Our Charter</p>
              <p id={styles.subdepartment}>Advertise</p>
              <p id={styles.subdepartment}>Sponsors</p>
              <p id={styles.subdepartment}>Staff</p>
              <p id={styles.subdepartment}>Developers</p>
              <p id={styles.subdepartment}>Contact</p>
            </div>
          </div>
          <div id={styles.column}>
            <div id={styles.digitalArchives} className={styles.da1} />
          </div>
          <div id={styles.column}>
            <div id={styles.digitalArchives} className={styles.da2} />
          </div>
        </div>
        <div id={styles.declarations}>
          <p id={styles.left}>© 2022 Stuyvesant Spectator Web Department. All rights reserved.</p>
          <p id={styles.right}><Link href="/developers">Designed and developed by Ivan Chen and Leonid Metlitsky</Link> | <Link href="https://github.com/stuyspec/stuyspec.com/issues">Found a bug? Report it here.</Link></p>
        </div>
      </footer>
      </>
	);
};

export default Footer;
