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
  const [scroll, setScroll] = useState(0);
  const [weather, setWeather] = useState({
    temp: null,
    city: "Loading...",
    icon: "",
    isDay: true,
  });
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

  async function fetchWeather() {
    const apiKey = "a1ed29a92d2a434190f45751250803";
    const zipCode = 10282;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}`,
      );
      const data = await response.json();

      if (data.error) throw new Error(data.error.message);
      else
        setWeather({
          city: "STUYVESANT, NY",
          temp: data.current.temp_f,
          icon:
            data.current.is_day == 1
              ? "//cdn.weatherapi.com/weather/64x64/day/116.png"
              : "//cdn.weatherapi.com/weather/64x64/night/116.png",
          isDay: data.current.is_day,
        });
    } catch (error) {
      setWeather({
        city: "Error loading weather",
        temp: null,
        icon: "",
        isDay: true,
      });
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    fetchWeather();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id={styles.ghost} style={scroll > 121.6 ? { height: "40px" } : {}} />

      <div id={styles.nav_parent}>
        <nav id={styles.nav}>
          <div id={styles.navbar_hero}>
            <div
              id={styles.hamburgerMenu}
              className="button"
              onClick={toggleMenu}
            >
              <Image
                src="/images/hamburger-menu.svg"
                width={25}
                height={25}
                id={styles.hamburgerMenu}
                className="button"
                alt="Button to view the departments"
              />
            </div>

            <div>
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
              <span id={styles.date}>{currentDate()}</span>
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

            <div className={styles.right}>
              <div id={styles.subscribe_search}>
                <div
                  id={styles.subscribe}
                  className={styles.clickable_nav_element}
                >
                  <Link href="/subscribe">
                    <p id={subscribe_button_styles.subscribe_button_navbar}>
                      Subscribe
                    </p>
                  </Link>
                </div>
                <div>
                  <CollapsibleSearch />
                </div>
              </div>
              <div id={styles.weather_bar}>
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
              </div>
            </div>
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
                  backgroundColor: "var(--secondary-nav)",
                }
              : {}
          }
        >
          <div id={styles.department_bar}>
            <span className={department === "news" ? styles.active : ""}>
              <Link href="/department/news">News</Link>
            </span>
            <span className={department === "features" ? styles.active : ""}>
              <Link href="/department/features">Features</Link>
            </span>
            <span className={department === "opinions" ? styles.active : ""}>
              <Link href="/department/opinions">Opinions</Link>
            </span>
            <span className={department === "science" ? styles.active : ""}>
              <Link href="/department/science">Science</Link>
            </span>
            <span className={department === "ae" ? styles.active : ""}>
              <Link href="/department/ae">Arts & Entertainment</Link>
            </span>
            <span className={department === "humor" ? styles.active : ""}>
              <Link href="/department/humor">Humor</Link>
            </span>
            <span className={department === "sports" ? styles.active : ""}>
              <Link href="/department/sports">Sports</Link>
            </span>
            <span className={department === "spec-plus" ? styles.active : ""}>
              <Link href="/department/spec-plus">Spec+</Link>
            </span>
            <span
              className={department === "recruitments" ? styles.active : ""}
            >
              <Link href="/about/recruitments">Recruitments</Link>
            </span>
          </div>
        </div>

        <div  className={styles.navBarSideBar}>
          <Sidebar
           
            showSidebar={viewSubSection}
            setShowSidebar={setViewSubSection}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
