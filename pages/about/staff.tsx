import Head from "next/head";
import styles from "../../styles/Staff.module.css";
import { generateMetaTags } from "../../utils/generateMetaTags";
import React from "react";
import Button from "./button";

interface StaffPageSectionsProps {
  title: string;
  writers?: StaffCardsProps[];
}
interface StaffCardsProps {
  writerName: string;
  writerImage: string;
  writerTitle: string;
  writerDepartment: string;
  writerDescription: string;
}
interface BacgkroundWithTextProps {
  text: string;
  backgroundCSS: string;
  children?: React.ReactNode;
}
function StaffPageSections(props: StaffPageSectionsProps) {
  return (
    <section className={styles.sectionContainer}>
      <h1 id={styles.sectionTitle}>{props.title}</h1>
      <div className={styles.cardContainer}>
        {props.writers?.map((value, index) => {
          return (
            <StaffCards
              writerDepartment={value.writerDepartment}
              writerDescription={value.writerDescription}
              writerImage={value.writerImage}
              writerName={value.writerName}
              writerTitle={value.writerTitle}
            />
          );
        })}
      </div>
    </section>
  );
}

function StaffCards(props: StaffCardsProps) {
  return (
    <article className={styles.staffCard}>
      <div
        id={styles.image}
        style={{ backgroundImage: `url(${props.writerImage})` }}
      ></div>
      <div className={styles.text}>
        <h4>{props.writerName}</h4>
        <p>
          {props.writerDepartment} {props.writerTitle}
        </p>
      </div>
      <p>{props.writerDescription}</p>
    </article>
  );
}

function BackgroundWithText(props: BacgkroundWithTextProps) {
  return (
    <div
      className={styles.backgroundTextContainer}
      style={{ background: props.backgroundCSS }}
    >
      <div className={styles.overlayBackgroundText}>
        <div className={styles.textContainer}>
          <p id={styles.topText}>{props.text}</p>
          {props.children}
        </div>
      </div>
    </div>
  );
}

function StaffPage() {
  const page_title = "Staff - The Stuyvesant Spectator";
  const meta_url = `https://stuyspec.com/about/staff`;
  const meta_description = `The members of The Stuyvesant Spectator's 2024-2025 Editorial Board.`;

  const writers: StaffCardsProps[] = [
    {
      writerDepartment: "Web",
      writerDescription: "No Description Given",
      writerImage:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      writerName: "John Doe",
      writerTitle: "Member",
    },
    {
      writerDepartment: "Web",
      writerDescription: "No Description Given",
      writerImage:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      writerName: "John Doe",
      writerTitle: "Member",
    },
    {
      writerDepartment: "Web",
      writerDescription: "No Description Given",
      writerImage:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      writerName: "John Doe",
      writerTitle: "Member",
    },
    {
      writerDepartment: "Web",
      writerDescription: "No Description Given",
      writerImage:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      writerName: "John Doe",
      writerTitle: "Member",
    },
    {
      writerDepartment: "Web",
      writerDescription: "No Description Given",
      writerImage:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      writerName: "John Doe",
      writerTitle: "Member",
    },
    {
      writerDepartment: "Web",
      writerDescription: "No Description Given",
      writerImage:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      writerName: "John Doe",
      writerTitle: "Member",
    },
    {
      writerDepartment: "Web",
      writerDescription: "No Description Given",
      writerImage:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      writerName: "John Doe",
      writerTitle: "Member",
    },
  ];

  return (
    <>
      <Head>{generateMetaTags(page_title, meta_description, meta_url)}</Head>
      <main className={styles.main}>
        <section className={styles.backgroundText}>
          <h1 id={styles.titleText}>
            We Are The <span id={styles.italiziedSpectator}>Spectator</span>
          </h1>
          <BackgroundWithText
            text="Our editors are committed to preserving the whatever and more corny facts about our editors for one more line now. You get the it right."
            backgroundCSS="url('https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg') lightgray 50% / cover no-repeat"
          />
        </section>
        <div className={styles.mainSections}>
          <StaffPageSections title="Our Editors" writers={writers} />
          <StaffPageSections title="Our Writers" writers={writers} />
        </div>
        <BackgroundWithText
          text="Considering joining the Spectator?"
          backgroundCSS="var(--secondary)"
        >
          <Button text="Join Now" />
        </BackgroundWithText>
      </main>
    </>
  );
}

export default StaffPage;
