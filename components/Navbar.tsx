import styles from "../styles/Navbar.module.css";
import subscribe_button_styles from "../styles/SubscribeButton.module.css";
import Link from "next/link";
import CollapsibleSearch from "./CollapsibleSearch";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Navbar = () => {
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

				<span
					id={styles.logo_container}
					className={styles.clickable_nav_element}
				>
					<Link passHref href="/">
						<div>
							<span id={styles.logo_the}>The </span>Spectator
						</div>
					</Link>
				</span>
				<div
					id={styles.subscribe_parent}
					className={styles.clickable_nav_element}
				>
					<Link href="/subscribe">
						<p id={subscribe_button_styles.subscribe_button_navbar}>
							Subscribe
						</p>
					</Link>
				</div>

				<div className={styles.clickable_nav_element}>
					<CollapsibleSearch />
				</div>
			</nav>
			<div id={styles.department_bar}>
				<div className={styles.department}>
					<span className={styles.maindepartment}>
						<Link href="/department/news">News</Link>
					</span>
					<div className={styles.subdepartment}>
						<span>
							<Link href="/department/news/campaign-coverage">
								Campaign Coverage
							</Link>
						</span>
						<span>
							<Link href="/department/news/israel-hamas-war">
								Israel-Hamas War
							</Link>
						</span>
					</div>
				</div>
				<div className={styles.department}>
					<span className={styles.maindepartment}>
						<Link href="/department/features">Features</Link>
					</span>
					<div className={styles.subdepartment}>
						<span>
							<Link href="/department/opinions/voices">
								VOICES
							</Link>
						</span>
						<span>
							<Link href="/department/opinions/9-11">9/11</Link>
						</span>
					</div>
				</div>
				<div className={styles.department}>
					<span className={styles.maindepartment}>
						<Link href="/department/opinions">Opinions</Link>
					</span>
					<div className={styles.subdepartment}>
						<span>
							<Link href="/department/opinions/staff-editorials">
								Staff Editorials
							</Link>
						</span>
					</div>
				</div>
				<span className={styles.maindepartment}>
					<Link href="/department/science">Science</Link>
				</span>
				<div className={styles.department}>
					<span className={styles.maindepartment}>
						<Link href="/department/ae">Arts & Entertainment</Link>
					</span>
					<div className={styles.subdepartment}>
						<span>
							<Link href="/department/ae/fashion">Fashion</Link>
						</span>
						<span>
							<Link href="/department/ae/art">Art</Link>
						</span>
						<span>
							<Link href="/department/ae/culture">Culture</Link>
						</span>
						<span>
							<Link href="/department/ae/film">Film</Link>
						</span>
						<span>
							<Link href="/department/ae/food">Food</Link>
						</span>
						<span>
							<Link href="/department/ae/literature">
								Literature
							</Link>
						</span>
						<span>
							<Link href="/department/ae/music">Music</Link>
						</span>
						<span>
							<Link href="/department/ae/television">
								Television
							</Link>
						</span>
						<span>
							<Link href="/department/ae/theater">Theater</Link>
						</span>
						<span>
							<Link href="/department/ae/thinkpiece">
								Thinkpiece
							</Link>
						</span>
						<span>
							<Link href="/department/ae/sing!">Sing!</Link>
						</span>
						<span>
							<Link href="/department/ae/stc">STC!</Link>
						</span>
					</div>
				</div>
				<div className={styles.department}>
					<span className={styles.maindepartment}>
						<Link href="/department/humor">Humor</Link>
					</span>
					<div className={styles.subdepartment}>
						<span>
							<Link href="/department/humor/disrespectator">
								Disrespectator
							</Link>
						</span>
						<span>
							<Link href="/department/humor/spooktator">
								Spooktator
							</Link>
						</span>
					</div>
				</div>
				<div className={styles.department}>
					<span className={styles.maindepartment}>
						<Link href="/department/sports">Sports</Link>
					</span>
					<div className={styles.subdepartment}>
						<span>
							<Link href="/department/sports/professional-sports">
								Professional Sports
							</Link>
						</span>
						<span>
							<Link href="/department/sports/sports-at-stuyvesant">
								Sports At Stuy
							</Link>
						</span>
					</div>
				</div>
				<span className={styles.maindepartment}>
					<Link href="/department/spec-plus">Spec+</Link>
				</span>
				<span className={styles.maindepartment}>
					<Link href="/about/recruitments">Recruitments</Link>
				</span>
			</div>
			<div>
				<Sidebar showSidebar={viewSubSection} />
			</div>
		</div>
	);
};

export default Navbar;