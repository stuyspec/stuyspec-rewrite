import Head from "next/head";
import styles from "../../styles/Staff.module.css"
import SideBar from "../../components/Sidebar";

const StaffPage = () => {
  return (
    <>
      <Head>
        <title>Staff | The Spectator</title>
      </Head>
      <div className="staff-page">
        <div id={styles.sidebar}><SideBar /></div>
      </div>
    </>
  );
};

export default StaffPage;
