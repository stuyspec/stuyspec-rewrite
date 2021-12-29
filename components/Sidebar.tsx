import { useRouter } from "next/router";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {

  let pageName = useRouter().pathname.split("/").pop();
  if (pageName != undefined) {
    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }

	return (
    <>
      <div id={styles.container}>
        <h1 id={styles.title}>{pageName}</h1>
        <div id={styles.scrollbar} />
      </div>
		</>
	);
};

export default Sidebar;
