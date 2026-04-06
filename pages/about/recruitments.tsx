import Head from "next/head";
import { generateMetaTags } from "../../utils/generateMetaTags";
import styles from "./../../styles/Recruitments.module.css";
import { Fragment, Suspense, useEffect, useState } from "react";
import { get_recruitment_materials } from "../../db";
import { ReceivedRecruitmentsArrayDisplay } from "../../ts_types/db_types";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  let recuritments_material = await get_recruitment_materials();
  if (recuritments_material) {
    return {
      props: {
        recuritments_material: JSON.parse(
          JSON.stringify(recuritments_material),
        ),
      },
    };
  }
}
interface Props {
  recuritments_material: ReceivedRecruitmentsArrayDisplay[];
}

function RecruitmentPage(props: Props) {
  const [videoHovered, setVideoHovered] = useState<boolean>(false);
  const page_title = "Recruitments";
  const meta_url = "http://stuyspec.com/about/recruitments";
  const meta_description =
    "The new recruitments page for the Stuyvesant Spectator";
    
  const departments: Array<{
    department: string;
    description: string;
    applicationForm?: string;
    applicationDueDate?: Date;
    stylesColor: string;
  }> = props.recuritments_material.map(
    (value: ReceivedRecruitmentsArrayDisplay) => {
      return {
        department: value.department.charAt(0).toUpperCase() + value.department.slice(1),
        description: value.description,
        applicationForm: value.link,
        applicationDueDate: new Date(value.date),
        stylesColor: styles.blackTheme,
      };
    },
  );
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
        <section className={styles.headingContainer}>
          <div className={styles.heading}>
            <section className={`${styles.headingText}`}>
              {videoHovered && windowWidth >= 1400 ? (
                <div id={styles.OVERLAY}></div>
              ) : null}
              <h1 id={styles.headingMainText}>
                {!videoHovered || windowWidth < 1400 ? (
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
                Spring Recruitments 2026  are now LIVE! Send in your applications
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
          </div>
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
          {departments.map((department, index) => (
            <Fragment key={index}>
              {department.applicationDueDate &&
              department.applicationDueDate >= new Date() ? (
                <div
                  className={`${styles.departmentCard} ${department.stylesColor}`}
                >
                  <div
                    className={styles.dateContainer}
                    // suppressHydrationWarning={true}
                  >
                    {department.applicationDueDate &&
                    department.applicationDueDate >= new Date() ? (
                      <p>
                        {Math.ceil(
                          (department.applicationDueDate.getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
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
                              fillRule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                          </svg>
                          <p>Apply Now!</p>
                          <svg
                            id={styles.rightArrow}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                          </svg>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </Fragment>
          ))}
        </section>
        <section className={styles.closedDepartmentsContainer}>
          {departments.map((department, index) => (
            <Fragment key={index}>
              {!department.applicationDueDate ||
              department.applicationDueDate < new Date() ? (
                <div
                  className={`${styles.departmentCard} ${department.stylesColor}`}
                >
                  <div id={styles.OVERLAY}></div>
                  <div
                    className={styles.dateContainer}
                    // suppressHydrationWarning={true}
                  >
                    {department.applicationDueDate &&
                    department.applicationDueDate >= new Date() ? (
                      <p>
                        {Math.ceil(
                          (department.applicationDueDate.getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
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
            </Fragment>
          ))}
        </section>
      </div>
    </div>
  );
}
export default RecruitmentPage;
