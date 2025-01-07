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
							<span id={styles.logo_the}>The  </span>Spectator
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
				<span>
					<div className = {styles.main}>
					<Link href="/department/news">News</Link>
					</div>
					<div className={styles.subdepartment}>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/news/campaign-coverage">
								Campaign Coverage

							</Link>
						</span>
						<br></br>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/topic/israel-palestine">
								Israel-Hamas War
							</Link>
						</span>
						</div>
						
				</span>
				
				<span>
				<div className = {styles.main}>
					<Link href="/department/features">Features</Link>
					</div>
					<div className={styles.subdepartment}>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/features/voices">
								VOICES
							</Link>
						</span>
						<br></br>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/features/9-11">9/11</Link>
						</span>
					</div>
				</span>
				<span>
				<div className = {styles.main}>
					<Link href="/department/opinions">Opinions</Link>
					</div>
					<div className={styles.subdepartment}>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
				    />
					<Link href="/department/opinions/staff-editorials">
								StaffEdit
							</Link>
						</span>
						<br></br>
					</div>
				</span>
				<span>
				<div className = {styles.main}>
					<Link href="/department/science">Science</Link>
					</div>					
				</span>
				<span>
				<div className = {styles.main}>
					<Link href="/department/ae">AE</Link>
					</div>
					<div className={styles.subdepartment}>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/ae/Fashion">
								Fashion
							</Link>
						</span>
						
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/ae/art">Art</Link>
						</span>
						<br></br>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>  
					
							<Link href="/department/ae/culture">
								Culture
							</Link>
						</span>
						
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/ae/film">Film</Link>
						</span>
						<br></br>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>  
					
							<Link href="/department/ae/food">
								Food
							</Link>
						</span>
						
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/ae/literature">Literature</Link>
							<br></br>
							</span>
							<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/ae/music">Music</Link>
						</span>
						
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>  
					
							<Link href="/department/ae/television">
								TV
							</Link>
						</span>
						<br></br>
							<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/ae/theater">Theater</Link>
						</span>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>  
					
							<Link href="/department/ae/thinkpiece">
								TP
							</Link>
						</span>
						
					</div>
				</span>
				<span>
				<div className = {styles.main}>
					<Link href="/department/humor">Humor</Link>
					</div>
					<div className={styles.subdepartment}>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/features/disrespectator">
								dr
							</Link>
						</span>
						<br></br>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/features/spooktator">boo</Link>
						</span>
					</div>
				</span>
				<span>
				<div className = {styles.main}>
					<Link href="/department/sports">Sports</Link>
					</div>
					<div className={styles.subdepartment}>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/features/professional-sports">
								profSport
							</Link>
						</span>
						<br></br>
						<span>
						<Image
						src="/images/right-arrow.svg"
						width={10}
						alt="right-arrow"
						height={10}
						id={styles.right_arrow}
					/>
							<Link href="/department/features/sports-at-stuy">SportStuy</Link>
						</span>
					</div>
				</span>
			</div>
			<div>
				<Sidebar showSidebar={viewSubSection} />
			</div>
		</div>
	);
};

export default Navbar;
