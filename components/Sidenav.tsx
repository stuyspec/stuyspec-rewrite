import styles from "../styles/Sidenav.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
	{label: 'News', path: '/department/news'}, 
	{label: 'Features', path: '/department/features'},
	{label: 'Opinions', path: '/department/opinions'},
	{label: 'Science', path: '/department/science'},
	{label: 'Arts & Entertainment', path: '/department/ae'},
	{label: 'Humor', path: '/department/humor'},
	{label: 'Sports', path: '/department/sports'},
	{label: 'Spec+', path: '/department/spec-plus'},
	{label: 'Recruitments', path: '/about/recruitments'},
  ];

const Sidenav = () => {
	const [viewSubSection, setViewSubSection] = useState(false);
	function toggleMenu() {
		setViewSubSection(!viewSubSection);
	}

	return (
		<div id={styles.nav_parent}>
			<nav id={styles.nav}>
				<div
					id={styles.hamburgerMenu}
					className="button"
					onClick={toggleMenu}
				>
					<Image
						src="/images/hamburger-menu.svg"
						width={30}
						height={30}
						id={styles.hamburgerMenu}
						className="button"
						alt="Button to view the departments"
					/>
				</div>
			</nav>
			<div
				id={styles.sidenav}
				className={viewSubSection ? "" : styles.hide}
			>

        {links.map ((i) => {return <Link href={i.path}> {i.label}</Link>})}	

			</div>
		</div>
	);
};

export default Sidenav;