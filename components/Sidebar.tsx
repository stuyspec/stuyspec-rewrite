import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import LatestPreviewImage from "./LatestPreviewImage";

import {
	BsSpotify,
	BsFacebook,
	BsInstagram,
	BsLinkedin,
	BsGithub,
} from "react-icons/bs";

const Sidebar = (props: { showSidebar: boolean }) => {
	return (
		<div id={styles.sidebar_parent}>
			<div
				id={styles.department_bar}
				className={props.showSidebar ? "" : styles.hide}
			>
				<span className={styles.maindepartment}>
					<Link passHref href="/">
						Home
					</Link>
				</span>
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

				<div id={styles.socialsBar}>
					<div id={styles.column}>
						<LatestPreviewImage imageIndex={0} imageClass={styles.archiveImage1} />
					</div>

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
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
