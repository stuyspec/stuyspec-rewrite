import Head from "next/head";
import { generateMetaTags } from "../../utils/generateMetaTags";
import styles from "./../../styles/newrecruitments.module.css";
import { Suspense, useEffect, useState } from "react";
import Banner from "../../components/Banner";

function newRecruitments() {
  const [videoHovered, setVideoHovered] = useState<boolean>(false);
  const page_title = "New Recruitments";
  const meta_url = "http://stuyspec.com/about/newrecruitments";
  const meta_description =
    "The new recruitments page for the Stuyvesant Spectator";

  const departments: Array<{
    department: string;
    description: string;
    applicationForm?: string;
    applicationDueDate?: Date;
    stylesColor: string;
  }> = [
    {
      department: "News",
      description:
        "The News Department covers school events, administrative changes, student organizations, school and student government policies, and out-of-school news. Besides traditional News articles, we also write mini-articles, graphs & surveys, and spreads. If you are interested in knowing Stuyvesant news before it is released, informing the student body, meeting students, teachers, and administrators, or seeing your work on the front page, apply to our department!",
      applicationForm:
        "https://docs.google.com/forms/d/e/1FAIpQLSelxypaeJpoJrkfNYUNpzpPCV0Ps4gBM1-5DuFGLeE3oV2POA/viewform?usp=dialog",
      applicationDueDate: new Date("April 27, 2025 23:59:59"),
      stylesColor: styles.newsTheme,
    },
    {
      department: "Features",
      description:
        "Features capture the spirit and mood of the school. At times, Features covers Stuyvesant’s evergreen topics, e.g. what is it about PE uniforms that gets everybody so hot and bothered? Other times, writers might profile a teacher. Other times, writers share creative narratives about experiences they have had in the “Voices” section. There is much to be found in Features, so come hither!",
      applicationForm:
        "https://docs.google.com/document/d/1Q7gcGhttCJ_wfn5C9FtjsRQjtmCjZZ1eJHH4B54nH1E/edit?tab=t.0",
      applicationDueDate: new Date("April 25, 2025 23:59:59"),
      stylesColor: styles.featuresTheme,
    },
    {
      department: "Humor",
      description:
        "Do you want to lowkey rant about your life and roast everything? Would you like to have a personality glow up? Do you want to join a low commitment and fun Spec department? Join Spec Humor! We write funny and satirical pieces for The Spec and unlike other departments, everything we publish is libel and slander which means that you'll be in control of what everyone says!",
      applicationForm: "https://forms.gle/tnaVju8WU7DFiryC6",
      applicationDueDate: new Date("April 25, 2025 23:59:59"),
      stylesColor: styles.humorTheme,
    },
    {
      department: "Arts & Ent.",
      description:
        "As the only department with more than three article categories, Arts and Entertainment is notable for its versatility and creative freedom. We review recent cultural topics such as art, fashion, film, food, literature, music, and more! A&E writers are also free to experiment with the thinkpiece category, where one can explore cultural phenomena or trends, gender standards, or race from a cultural standpoint. Whether you are an aspiring music enthusiast or cultural connoisseur, everyone can find (or create!) their own niche in A&E.",
      applicationForm: undefined,
      applicationDueDate: undefined,
      stylesColor: styles.aeTheme,
    },
    {
      department: "Opinions",
      description:
        "The Opinions section lets writers share their views on issues relevant within the country, Stuyvesant, and their personal lives. Writers across all grades give their opinions on subjects ranging from politics and economics to technology and culture and share their personal stories. We try to consistently create engaging, substantive, and relevant content to provide students with a closer look at the world and the Stuyvesant community.",
      applicationForm: undefined,
      applicationDueDate: undefined,
      stylesColor: styles.opinionsTheme,
    },
    {
      department: "Sports",
      description:
        "The Sports department covers all things sports, whether it be PSAL sports at Stuyvesant or professional sports. Articles pertaining to Stuyvesant sports range from championship articles and season updates to athlete and coach interviews and opinions. Writers also cover virtually any topic in the larger sports world, from debates on LeBron vs. MJ and college basketball to YouTube boxing and the Champions League. If that’s not enough to convince you to apply, we have an exclusive fantasy football league (with rewards).",
      applicationForm:
        "https://docs.google.com/document/d/1gW6x5hRCxo3l7-enLw5iaYW8VZ7RiUD7rq_J1PL9Qi0/edit?usp=sharing",
      applicationDueDate: new Date("April 25, 2025 23:59:59"),
      stylesColor: styles.sportsTheme,
    },
    {
      department: "Science",
      description:
        "The Science Department covers everything science-related, from pandemics and groundbreaking discoveries to Stuyvesant’s very own fascinating science clubs and events. Our department captures the complexity of science through analytical and often opinion-based writing, and we aim to convey the intricacies of the world around us and beyond to the student body.",
      applicationForm:
        "https://drive.google.com/file/d/1kXXTgsztcTnp1-XP7QGI6-RjkUiYyxz5/view?usp=drivesdk",
      applicationDueDate: new Date("May 5, 2025 23:59:59"),
      stylesColor: styles.scienceTheme,
    },
    {
      department: "Web",
      description:
        "The Web department is responsible for designing and updating The Spectator's website (aka this website), www.stuyspec.com. It also attempts to facilitate the learning of developing and maintaining a web applications. These real-world skills are a great resume builders and provide invaluable experience in working together as a team. This is the perfect department for both computer programming enthusiasts and novices who want to help The Spectator continue to storm the frontier of online journalism.",
      applicationForm: "https://forms.gle/ZwH67nqRGesLjd5g6",
      applicationDueDate: new Date("May 1, 2025 23:59:59"),
      stylesColor: styles.webTheme,
    },
    {
      department: "Copy",
      description:
        "Members of the Copy Department ensures that The Spectator produces clear, grammatically correct, and accurate articles. Did you notice both mistakes in the last sentence? If you did, you should join the Copy Department! Members gain early access to articles and sharpen their grammar skills while editing and fact-checking departments of their choice. We are committed to catching grammatical and factual mistakes in articles with attention to detail, and we look for members who want to contribute to maintaining The Spectator’s high-quality content.",
      applicationForm: "https://forms.gle/CBEJdJVFAKFmcUFPA",
      applicationDueDate: new Date("April 18, 2025 23:59:59"),
      stylesColor: styles.copyTheme,
    },
    {
      department: "Layout",
      description:
        "A good publication should interest readers before they even pick it up and read it; the Layout department does just that! We are responsible for formatting all of the articles, photos, art, and other media and make sure that the paper is aesthetically appealing and easy to read. After all, no one wants to read ugly and confusing blocks of text. With creativity and a certain magic called InDesign, we present to you what you know as The Spectator. As a staff member, you will be taught how to use InDesign and asked to critique the formatting of each issue as it is released.",
      applicationForm:
        "https://docs.google.com/forms/d/e/1FAIpQLSdYjnb52_T-cPP8PWvFVTHvM0HL2keoM0QZRBTURCK0rCTNmQ/viewform?usp=sharing",
      applicationDueDate: new Date("April 25, 2025 23:59:59"),
      stylesColor: styles.layoutTheme,
    },
    {
      department: "Photo",
      description:
        "Photo is dedicated to providing interesting and dynamic photographs to support the articles in The Spectator and spearhead photo essay projects. Typical assignments include portraits of students and teachers, photos at school events, and shots of fun things around the city. This department is a good fit for anyone interested in photography, whether you’re just starting out, or you’re an expert looking for a place to practice and refine your skills.",
      applicationForm:
        "https://docs.google.com/forms/d/e/1FAIpQLSemjRE6jgltjCJCjF7F_KVvG5n6xdV6xtTXDCzrvPKq6XiHNQ/viewform",
      applicationDueDate: new Date("April 21, 2025 23:59:59"),
      stylesColor: styles.photosTheme,
    },
    {
      department: "Art",
      description:
        "It is often difficult to read through dense blocks of text without something to rest your eyes on. In the Art Department, we strive to embellish the newspaper with our unique illustrations, each perfectly suited for its article. In a school where artistic abilities are not seen as a priority, you can easily find your niche as an artist for The Spectator, where your art will be displayed for all of its readers to admire. The limits of your creativity have no bounds; you can explore and develop your art skills by taking on cool and unique requests, from a portrait of Taylor Swift (A&E) to an oily stork (Humor), as well as the occasional thematic spread; the range is infinite. We encourage the use of all media!",
      applicationForm:
        "https://docs.google.com/forms/u/1/d/1x4KAUP1-4USt5DoAOKMcmLnIHXbAs6qamWcJIg728EU/edit?usp=drivesdk",
      applicationDueDate: new Date("April 28, 2025 23:59:59"),
      stylesColor: styles.artTheme,
    },
    {
      department: "Business",
      description:
        "The Business department is the backbone of The Spectator. Due to the efforts of this department, The Spectator is able to print all of its issues while still remaining independent. We negotiate and secure deals with businesses all over New York as well as handle the advertisements on the website and in the paper. Members learn skills that can be applied to real life, including talking in formal settings, learning how to negotiate and compromise, and understanding how to manage money.",
      applicationForm: undefined,
      applicationDueDate: undefined,
      stylesColor: styles.buisnessTheme,
    },
  ];

  //WINDOW DIMENSION CODE
  const getWindowDimensions = () => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(getWindowDimensions().width);
    const handleResize = () => {
      setWindowWidth(getWindowDimensions().width);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //END OF WINDOW DIMENSION CODE

  //TIME LEFT CODE

  return (
    <div>
      <Head>{generateMetaTags(page_title, meta_description, meta_url)}</Head>
      <div className={styles.mainBody}>
        <Banner
          type="welcome"
          message="Welcome to the new Recruitments Page!"
        />
        <section className={styles.headingContainer}>
          <article className={styles.heading}>
            <section className={`${styles.headingText}`}>
              {videoHovered && windowWidth >= 1000 ? (
                <div id={styles.OVERLAY}></div>
              ) : null}
              <h1 id={styles.headingMainText}>
                {!videoHovered || windowWidth < 1000 ? (
                  <span aria-hidden="true" id={styles.LIVE}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </span>
                ) : null}
                Recruitments
              </h1>
              <p id={styles.headingParagraph}>
                Spring Recruitments 2025 are now LIVE! Send in your applications
                before it is too late.
              </p>
            </section>
            <div id={styles.SEPERATORCONT}>
              <div id={styles.SEPERATOR}></div>
            </div>
            <section
              className={`${styles.recruitmentsVideo}`}
              onMouseEnter={() => {
                setVideoHovered(true);
              }}
              onMouseLeave={() => {
                setVideoHovered(false);
              }}
            >
              <iframe
                id={styles.VIDEO}
                src="https://www.youtube-nocookie.com/embed/X0kVU_fd6J0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </section>
          </article>
        </section>
        <section className={styles.aboutContainer}>
          <article className={styles.about}>
            <section className={styles.aboutImage} aria-hidden="true"></section>
            <div id={styles.SEPERATORCONT}>
              <div id={styles.SEPERATOR}></div>
            </div>
            <section className={styles.aboutText}>
              <h1>About The Spectator</h1>
              <p>
                The goal of The Spectator, the school newspaper of Stuyvesant
                High School, is to inform the Stuyvesant community of the
                significant events and issues about Stuyvesant High School.
                Established as a public forum for expression and as a voice in
                the free and open discussion of issues for all parties, The
                Spectator provides a full opportunity for all groups to inquire,
                question and exchange ideas, independent of the influence of the
                administration and other groups who may wish to use the
                newspaper to pursue their own interests.
              </p>
            </section>
          </article>
        </section>
        <section className={styles.departmentsContainer}>
          {departments.map((department, _) => (
            <>
              {department.applicationDueDate &&
              department.applicationDueDate >= new Date() ? (
                <div
                  className={`${styles.departmentCard} ${department.stylesColor}`}
                >
                  <div
                    className={styles.dateContainer}
                    suppressHydrationWarning={true}
                  >
                    {department.applicationDueDate &&
                    department.applicationDueDate >= new Date() ? (
                      <p>
                        {Math.ceil(
                          (department.applicationDueDate.getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) + " days left!"}
                      </p>
                    ) : null}

                    <div id={styles.dueDateContainer}>
                      <div id={styles.dueDateSvg} aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="bi bi-calendar-week"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                        </svg>
                      </div>
                      <p>
                        {department.applicationDueDate
                          ? new Intl.DateTimeFormat("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              timeZoneName: "short",
                            }).format(department.applicationDueDate)
                          : `No application posted`}
                      </p>
                    </div>
                  </div>
                  <div id={styles.departmentText}>
                    <h1>
                      <span id={styles.departmentName}>
                        {department.department}
                      </span>{" "}
                      Department
                    </h1>
                    <p>{department.description}</p>
                    {department.applicationForm ? (
                      <div id={styles.application}>
                        <a
                          id={styles.link}
                          href={department.applicationForm}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            id={styles.leftArrow}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                          </svg>
                          <button>Apply Now!</button>
                          <svg
                            id={styles.rightArrow}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                          </svg>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          ))}
        </section>
        <section className={styles.closedDepartmentsContainer}>
          {departments.map((department, _) => (
            <>
              {!department.applicationDueDate ||
              department.applicationDueDate < new Date() ? (
                <div
                  className={`${styles.departmentCard} ${department.stylesColor}`}
                >
                  <div id={styles.OVERLAY}></div>
                  <div
                    className={styles.dateContainer}
                    suppressHydrationWarning={true}
                  >
                    {department.applicationDueDate &&
                    department.applicationDueDate >= new Date() ? (
                      <p>
                        {Math.ceil(
                          (department.applicationDueDate.getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) + " days left!"}
                      </p>
                    ) : null}

                    <div id={styles.dueDateContainer}>
                      <div id={styles.dueDateSvg} aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="bi bi-calendar-week"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                        </svg>
                      </div>
                      <p>
                        {department.applicationDueDate
                          ? new Intl.DateTimeFormat("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              timeZoneName: "short",
                            }).format(department.applicationDueDate)
                          : `No application posted`}
                      </p>
                    </div>
                  </div>
                  <div id={styles.departmentText}>
                    <h1>
                      <span id={styles.departmentName}>
                        {department.department}
                      </span>{" "}
                      Department
                    </h1>
                    <p>{department.description}</p>
                  </div>
                </div>
              ) : null}
            </>
          ))}
        </section>
      </div>
    </div>
  );
}
export default newRecruitments;
