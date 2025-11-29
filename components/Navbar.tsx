import styles from "../styles/Navbar.module.css";
import subscribe_button_styles from "../styles/SubscribeButton.module.css";
import Link from "next/link";
import CollapsibleSearch from "./CollapsibleSearch";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaSpotify,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

function currentDate() {
  const today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[today.getDay()];
  const month = months[today.getMonth()];
  const date = today.getDate();
  const year = today.getFullYear();

  return `${dayOfWeek}, ${month} ${date}, ${year}`;
}

const Navbar = () => {
  const [viewSubSection, setViewSubSection] = useState(false);
  const [viewSidebar, setViewSidebar] = useState(false);
  const [scroll, setScroll] = useState(0);

  const [weather, setWeather] = useState({
    temp: null,
    city: "Loading...",
    icon: "",
    isDay: true,
  });

  //FOR THE HOVER STATE OF THE NAV BAR
  //SHOWSECTION BAR DETERMINES IF SOMEONE IS HOVERING OVER
  // SHOWWHICHSECTION SHOWS SPECIFIC HOVERED SECTION
  const [showSectionBar, setShowSectionBar] = useState(false);
  const [showWhichSection, setShowWhichSection] = useState(0);

  const department = usePathname().split("/")[2];

  function toggleMenu() {
    setViewSubSection(!viewSubSection);
  }

  function handleScroll() {
    if (window.innerWidth > 1050) {
      const position = window.scrollY;
      setScroll(position);
    }
  }

  //CREATE A DICTIONARY FOR ALL THE SECTIONS AND THEIR APPROPRAITE SUBSECTIONS
  const subsectionToSections: any = [
    {
      name: "News",
      mainLink: 'news',
      subsectionTitles: ["Campaign Coverage", "10/31 Terrorist Attack", 'Black Lives Matters', 'Israel-Hamas War'],
      subsectionLinks: ['campaign-coverage', '1031-terror-attack', 'black-lives-matter', 'israel-palestine']
    },
    {
      name: "Features",
      mainLink: 'features',
      subsectionTitles: ['VOICES', '9/11'],
      subsectionLinks: ['voices', '9-11']
    },
    {
      name: "Opinions",
      mainLink: 'opinions',
      subsectionTitles: ['Staff Editorials', 'Writing Competition'],
      subsectionLinks: ['staff-editorials', 'writing-competition']
    },
    {
      name: "Science",
      mainLink: 'science',
      subsecitonTitles: null,
      subsectionLinks: null
    },
    {
      name: "Arts and Entertainment",
      mainLink: 'ae',
      subsectionTitles: ['Fashion', 'Art', 'Culture', 'Film', 'Food', 'Literature', 'Music', 'Television', 'Theater', 'Thinkpiece', 'SING!', 'STC'],
      subsectionLinks: ['fashion', 'art', 'culture', 'film', 'food', 'literature', 'music', 'television', 'theater', 'thinkpiece', 'sing!', 'stc']
    },
    {
      name: "Humor",
      mainLink: 'humor',
      subsectionTitles: ['Disrespectator', 'Spooktator'],
      subsectionLinks: ['disrespectator', 'spooktator']
    },
    {
      name: 'Sports',
      mainLink: 'sports',
      subsectionTitles: ['Professional Sports', 'Sports at Stuyvesant'],
      subsectionLinks: ['professional-sports', 'sports-at-stuyvesant']
    }
  ]

  function showSectionAndPiece(ss: number) {
    setShowSectionBar(true)
    setShowWhichSection(ss)
  }

  function Subsections() {
    return (
      <>
        <div id={styles.sectionID}>
          <Link href={`/department/${subsectionToSections[showWhichSection].mainLink}/`}>
            <h2>{subsectionToSections[showWhichSection].name}</h2>
          </Link>
        </div>
        <div id={styles.subsections} >
          <h3 id={styles.subsectionsHeader}>Subsections</h3>
          <div id={styles.subsectionList}>
            {
              subsectionToSections[showWhichSection].subsecitonTitles !== null ?
                subsectionToSections[showWhichSection].subsectionTitles.map((value: string, index: number) => {
                  return (value === 'Israel-Hamas War' ? <Link key={index} href='/topic/israel-palestine'>{value}</Link> :
                    <Link key={index} href={`/department/${subsectionToSections[showWhichSection].mainLink}/${subsectionToSections[showWhichSection].subsectionLinks[index]}`}>
                      {value}
                    </Link>)
                }) : null
            }
          </div>
        </div>
      </>
    )
  }


  // async function fetchWeather() {
  //   const apiKey = "a1ed29a92d2a434190f45751250803";
  //   const zipCode = 10282;

  //   try {
  //     const response = await fetch(
  //       `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}`
  //     );
  //     const data = await response.json();

  //     if (data.error) throw new Error(data.error.message);
  //     else
  //       setWeather({
  //         city: "STUYVESANT, NY",
  //         temp: data.current.temp_f,
  //         icon:
  //           data.current.is_day == 1
  //             ? "//cdn.weatherapi.com/weather/64x64/day/116.png"
  //             : "//cdn.weatherapi.com/weather/64x64/night/116.png",
  //         isDay: data.current.is_day,
  //       });
  //   } catch (error) {
  //     setWeather({
  //       city: "Error loading weather",
  //       temp: null,
  //       icon: "",
  //       isDay: true,
  //     });
  //   }
  // }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // fetchWeather();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id={styles.nav_parent}>
        <div id={styles.nav_parent_content}>
          <nav id={styles.nav}>
            <div id={styles.navbar_hero}>
              {
                //HAMBURGER MENU FOR MOBILE PURPOSES
              }
              <div
                id={styles.hamburgerMenu}
                className="button"
                onClick={toggleMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              </div>
              {
                // MAIN INFORMATION FOR THE DESKTOP WEBSITE
              }
              <div className={styles.social_media_and_date}>
                <div id={styles.media_buttons}>
                  <Link
                    href="https://open.spotify.com/show/40JaCJA0FvtZToAv81qVjz"
                    aria-label="The Lens Podcast on Spotify"
                  >
                    <FaSpotify id={styles.media_button} />
                  </Link>
                  <Link
                    href="https://www.facebook.com/stuyspectator"
                    aria-label="Facebook"
                  >
                    <FaFacebookF id={styles.media_button} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/stuyspectator/"
                    aria-label="Instagram"
                  >
                    <FaInstagram id={styles.media_button} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/the-stuyvesant-spectator"
                    aria-label="Linkedin"
                  >
                    <FaLinkedinIn id={styles.media_button} />
                  </Link>
                  <Link href="https://github.com/stuyspec" aria-label="GitHub">
                    <FaGithub id={styles.media_button} />
                  </Link>
                </div>
                <div className={styles.date}>{currentDate()}</div>
              </div>

              <div
                id={styles.logo_container}
                className={styles.clickable_nav_element}
              >
                <Link passHref href="/">
                  <div>
                    <span id={styles.logo_the}>The </span>Spectator
                  </div>
                </Link>
              </div>
              <div className={styles.right}>
                <div id={styles.subscribe_search}>
                  {
                    // SUBSCRIBE IS TEMPORARILY REMOVED BECAUSE THE MAILING DOES NOT EXIST ANYMORE
                    // WHEN IT IS REINSTATED, SUBSCRIBE WILL BE ACTIVE AGAIN.
                    // TODO: ADD SUBSCRIBE BUTTON BACK WHEN EVERYTHING IS FIXED PROPERLY.
                  }
                  {/* <div
                  id={styles.subscribe}
                  className={styles.clickable_nav_element}
                >
                  <Link href="/subscribe">
                    <p id={subscribe_button_styles.subscribe_button_navbar}>
                      Subscribe
                    </p>
                  </Link>
                </div> */}
                  <div id={styles.collapsibleSearch}>
                    <CollapsibleSearch />
                  </div>
                </div>
                {/* <div id={styles.weather_bar}>
                {weather.temp !== null ? (
                  <div className={styles.weatherTempBar}>
                    <img
                      src={weather.icon}
                      alt="Day/Night Icon"
                      className={styles.weatherIcon}
                    />
                    {`${weather.temp}°F ${weather.city}`}
                  </div>
                ) : (
                  <div className={styles.weatherTempBar}>{weather.city}</div>
                )}
              </div> */}
              </div>
            </div>

            <div className={styles.dialogContainer}>
              <dialog className={styles.navBarSideBar} open={viewSubSection}>
                <form method="dialog">
                  <button autoFocus onClick={toggleMenu} id={styles.closeButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </button>
                </form>
                <Sidebar
                  showSidebar={viewSubSection}
                  setShowSidebar={setViewSubSection}
                />
              </dialog>
            </div>
          </nav>

          <div
            style={
              scroll > 121.6
                ? {
                  position: "fixed",
                  top: 0,
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  right: 0,
                  left: 0,
                  zIndex: 3,
                  backgroundColor: "var(--secondary)",
                }
                : {}
            }
          >
            <div className={styles.department_bar_container} onMouseLeave={() => setShowSectionBar(false)}>
              <div id={styles.department_bar} >
                <span className={department === "news" ? styles.active : ""} onMouseEnter={() => showSectionAndPiece(0)}>
                  <Link href="/department/news">News</Link>
                </span>
                <span className={department === "features" ? styles.active : ""} onMouseEnter={() => showSectionAndPiece(1)} >
                  <Link href="/department/features">Features</Link>
                </span>
                <span className={department === "opinions" ? styles.active : ""} onMouseEnter={() => showSectionAndPiece(2)}>
                  <Link href="/department/opinions">Opinions</Link>
                </span>
                <span className={department === "science" ? styles.active : ""} onMouseEnter={() => showSectionAndPiece(3)} >
                  <Link href="/department/science">Science</Link>
                </span>
                <span className={department === "ae" ? styles.active : ""} onMouseEnter={() => showSectionAndPiece(4)}>
                  <Link href="/department/ae">Arts & Entertainment</Link>
                </span>
                <span className={department === "humor" ? styles.active : ""} onMouseEnter={() => showSectionAndPiece(5)} >
                  <Link href="/department/humor">Humor</Link>
                </span>
                <span className={department === "sports" ? styles.active : ""} onMouseEnter={() => showSectionAndPiece(6)} >
                  <Link href="/department/sports">Sports</Link>
                </span>
                {
                  // ! IMPORTANT READ BELOW
                  // SPEC+ AND RECRUITMENTS WILL BE REMOVED FROM THE NAV BAR
                  // THIS IS BECAUSE THEY TAKE UP SPACE AND ARE NOT CORE SECTIONS
                  // TO THE SPECTATOR.
                  // TODO: NOTE WHEN RECRUITMENTS COMES OUT. WHEN RECRUITMENTS
                  // TODO: COMES OUT, RECRUITMENTS SECTION SHOULD COME BACK.
                  // SPEC+ SHOULD NOT COME BACK ON THE NAVBAR. IT SHOULD
                  // STAY IN THE FOOTER.
                }
                {/* <span className={department === "spec-plus" ? styles.active : ""}>
              <Link href="/department/spec-plus">Spec+</Link>
            </span>
            <span
              className={department === "recruitments" ? styles.active : ""}
            >
              <Link href="/about/recruitments">Recruitments</Link>
            </span> */}
              </div>

              {
                //DETERMINE WHEATHER OR NOT TO SHOW TEMPORARY SECTION BAR
                // TODO: MAKE IT MORE SPECIFIC FOR WHAT IT IS BEING HOVERED
                showSectionBar ? (
                  <div className={styles.expanded_section} onMouseEnter={() => { setShowSectionBar(true) }} id={styles.visibleExpandedSection}>
                    <Subsections />
                  </div>
                ) : (
                  <div className={styles.expanded_section} onMouseEnter={() => { setShowSectionBar(true) }} id={styles.hiddenExpandedSection}>
                    <Subsections />
                  </div>
                )
              }
            </div>
          </div>
          <div id={styles.nav_parent_content_border}>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
