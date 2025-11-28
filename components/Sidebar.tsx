import styles from "../styles/Sidebar.module.css";
import subscribe_button_styles from "../styles/SubscribeButton.module.css";
import Link from "next/link";
import Image from "next/image";
import LatestPreviewImage from "./LatestPreviewImage";
import ThemeToggle from "./ThemeToggle";
import {
	BsSpotify,
	BsFacebook,
	BsInstagram,
	BsLinkedin,
	BsGithub,
} from "react-icons/bs";
import CollapsibleSearch from "./CollapsibleSearch";

const Sidebar = (props: { showSidebar: boolean; setShowSidebar: (v: boolean) => void }) => {
	const { showSidebar, setShowSidebar } = props;
	const autoClose = () => window.innerWidth <= 940 && setShowSidebar(false);

	return (
		<div
			id={styles.sidebar_parent}
			className={props.showSidebar ? "" : styles.hide}
		>
			<ul id={styles.sidebar}>
				<li className={styles.department} id={styles.search}>
					<CollapsibleSearch setShowSidebar={setShowSidebar} />
				</li>
				<li className={styles.department}>
					<Link href="/" onClick={autoClose}>Home</Link>
				</li>
				<li className={styles.department}>
					<Link href="/department/news" onClick={autoClose}>News</Link>
				</li>

				<li className={styles.department}>
					<Link href="/department/features" onClick={autoClose}>Features</Link>
				</li>

				<li className={styles.department}>
					<Link href="/department/opinions" onClick={autoClose}>Opinions</Link>
				</li>

				<li className={styles.department}>
					<Link href="/department/science" onClick={autoClose}>Science</Link>
				</li>
				<li className={styles.department}>
					<Link href="/department/ae" onClick={autoClose}>Arts & Entertainment</Link>
				</li>

				<li className={styles.department}>
					<Link href="/department/humor" onClick={autoClose}>Humor</Link>
				</li>

				<li className={styles.department}>
					<Link href="/department/sports" onClick={autoClose}>Sports</Link>
				</li>

				<li className={styles.department}>
					<Link href="/department/spec-plus" onClick={autoClose}>Spec+</Link>
				</li>

				<li className={styles.department}>
					<Link href="/about/recruitments" onClick={autoClose}>Recruitments</Link>
				</li>

				<li className={styles.department}>
					<Link href="https://pdf.stuyspec.com" onClick={autoClose}>
						Virtual Archives
					</Link>
				</li>
				<li id={styles.socialsBar}>

					<div id={styles.mediaButtons}>
						<Link href="https://open.spotify.com/show/1D0i5KdRFdMNNUwsKVfpYb">
							<BsSpotify id={styles.mediaButton} />
						</Link>
						<Link href="https://www.facebook.com/stuyspectator">
							<BsFacebook id={styles.mediaButton} />
						</Link>
						<Link href="https://www.instagram.com/stuyspectator/">
							<BsInstagram id={styles.mediaButton} />
						</Link>
						<Link href="https://www.linkedin.com/company/the-stuyvesant-spectator">
							<BsLinkedin id={styles.mediaButton} />
						</Link>
						<Link href="https://github.com/stuyspec">
							<BsGithub id={styles.mediaButton} />
						</Link>
					</div>
				</li>
			</ul>



			<div id={styles.additional_features}>
				{/* <div className={styles.clickable_nav_element}>
            <Link href="/subscribe">
              <p id={subscribe_button_styles.subscribe}>Subscribe</p>
            </Link>
          </div> */}
				{
					// TODO: MAKE THE THEME TOGGLE COLORS BETTER -- NOT DOING THIS TODAY
					// TODO: WILL DO THIS LATER
				}
				{/* <div className={styles.clickable_nav_element}>
            <ThemeToggle />
          </div> */}
			</div>
		</div>

	);
};

export default Sidebar;