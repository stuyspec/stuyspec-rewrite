import Head from "next/head";
import styles from "../../styles/Staff.module.css";
import cardStyles from "../../styles/Card.module.css";
import { generateMetaTags } from "../../utils/generateMetaTags";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import unknownPhoto from "../../public/images/SpectatorCollageUnknown.png";
import { StaticImageData } from "next/image";

interface CardProps {
  name: string;
  department:
    | "opinions"
    | "arts and entertainment"
    | "news"
    | "features"
    | "web"
    | "business"
    | "copy"
    | "layout"
    | "sports"
    | "humor"
    | "science"
    | "photos"
    | "art"
    | "faculty";
  //Department that the user is apart of.
  position: "EIT" | "E";
  /* 
	NOTES
	MB: Managing Board (NOT INCLUDED)
	EIT: Editors-in-training
	E: Editor
	*/
  photo?: StaticImageData | string;
  //This string will be the src of the image in the memory.
  //If the photo is not chosen, then a gradient will be set in the CSS
}
function Card(cardProps: CardProps) {
  const urlLink = "/staff/".concat(
    cardProps.name.toLowerCase().replace("-", " ").split(" ").join("-")
  );
  console.log(urlLink);
  let imageSrcComponent;
  if (cardProps.photo &&  typeof cardProps.photo === 'string') {
    imageSrcComponent = {
      backgroundImage: `url(${cardProps.photo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else{
    imageSrcComponent = null
  }

  return (
    <article className={cardStyles.cardArea}>
      {
        // If the photo exists from the imageSrcComponent, then there will be a abckground iamge
        // If it does not exist then a gradient will be chosen depending on the department
      }
      <Link href={urlLink}>
        <div className={cardStyles.imageArea}>
          {
            //Renders the image component
          }
          {imageSrcComponent !== null ? (
            <div style={imageSrcComponent} id={cardStyles.imagePhoto}></div>
          ) : cardProps.photo !== null ? (
            // TODO: WORK ON THE GRADIENT COLOR FOR EACH DEPARTMENT
            <div id={cardStyles.imageStatic}>
              <div id={cardStyles.overlay}></div>
              <Image src={unknownPhoto} alt="unknown" id={cardStyles.image}/>
            </div>
          ) : (
            <div id={cardStyles.imageGradient}></div>
          )}{" "}
        </div>
      </Link>
      <div className={cardStyles.textArea}>
        {
          //Creates the name and the description for the card
        }
        <p id={cardStyles.textName}>{cardProps.name}</p>
        <p id={cardStyles.textPosition}>
          {
            // PRINTS OUT THE POSITION OF THE MEMBER
            // FIRST UPPERCASES THEIR DEPARTMENT AND THEN APPENDS THEIR POSITION
            // web Department Editor -> Web Department Editor
          }
          {cardProps.department !== "faculty"
            ? cardProps.department.charAt(0).toUpperCase() +
              cardProps.department.substring(1).concat(`          Department
          ${cardProps.position === "E" ? "Editor" : "Editor-in-Training"}`)
            : "Faculty Advisor"}{" "}
        </p>
      </div>
    </article>
  );
}
function cardGen() {
  //! IMPORTANT TODO
  //TODO: MAKE SOMETHING THAT GRABS THIS INFORMATION FROM THE DATABASE RATHER THAN US HARD CODING IT
  //TODO: WILL SAVE A LOT OF TIME.
  const staff: CardProps[] = [
    {
      name: "Myles Vuong",
      position: "E",
      department: "news",
    },
    {
      name: "Hifza Kaleem",
      position: "E",
      department: "features",
    },
    {
      name: "Dinara Gargu",
      position: "E",
      department: "news",
    },
    {
      name: "Brendan Tan",
      position: "E",
      department: "news",
    },
    {
      name: "Lauren Yang",
      position: "E",
      department: "news",
    },
    {
      name: "William Chen",
      position: "EIT",
      department: "features",
    },
    {
      name: "Ada Gordon",
      position: "E",
      department: "features",
    },
    {
      name: "Grace Jung",
      position: "E",
      department: "features",
    },
    {
      name: "Leah Riegel",
      position: "E",
      department: "features",
    },
    {
      name: "Noa Salas Adam",
      position: "EIT",
      department: "features",
    },
    {
      name: "Dean Hevenstone",
      position: "E",
      department: "opinions",
    },
    {
      name: "Joanne Hwang",
      position: "E",
      department: "opinions",
    },
    {
      name: "Stella Krajka",
      position: "E",
      department: "opinions",
    },
    {
      name: "Evelyn Lifton",
      position: "EIT",
      department: "opinions",
    },
    {
      name: "Aarya Balakrishnan",
      position: "E",
      department: "science",
    },
    {
      name: "Isabel Cho",
      position: "EIT",
      department: "science",
    },
    {
      name: "Sonya Cisse",
      position: "E",
      department: "science",
    },
    {
      name: "Narnia Poddar",
      position: "EIT",
      department: "science",
    },
    {
      name: "Benson Chen",
      position: "E",
      department: "arts and entertainment",
    },
    {
      name: "Galen Jack",
      position: "E",
      department: "arts and entertainment",
    },
    {
      name: "Emile Lee-Suk",
      position: "E",
      department: "arts and entertainment",
    },
    {
      name: "Somerset Seidenberg",
      position: "E",
      department: "arts and entertainment",
    },
    {
      name: "Selina Lin",
      position: "E",
      department: "humor",
    },
    {
      name: "Alexis Qian",
      position: "E",
      department: "humor",
    },
    {
      name: "Nina Benson",
      position: "EIT",
      department: "sports",
    },
    {
      name: "Elijah Choi",
      position: "E",
      department: "sports",
    },
    {
      name: "Leonardo Guidi",
      position: "E",
      department: "sports",
    },
    {
      name: "Saif Iftikhar",
      position: "EIT",
      department: "sports",
    },
    {
      name: "Boone Ireland",
      position: "E",
      department: "sports",
    },
    {
      name: "Eva Kastoun",
      position: "E",
      department: "photos",
    },
    {
      name: "Emma Nakhle",
      position: "E",
      department: "photos",
    },
    {
      name: "Karina Huang",
      position: "E",
      department: "art",
    },
    {
      name: "Yuma Kono",
      position: "EIT",
      department: "art",
    },
    {
      name: "Rhea Malhorta",
      position: "E",
      department: "art",
    },
    {
      name: "Lixin Zhang",
      position: "E",
      department: "art",
    },
    {
      name: "Anjali Bechu",
      position: "E",
      department: "layout",
    },
    {
      name: "Elysia Chen",
      position: "E",
      department: "layout",
    },
    {
      name: "Isabel Noa",
      position: "E",
      department: "layout",
    },
    {
      name: "Karen Xu",
      position: "E",
      department: "layout",
    },
    {
      name: "Naomi Hsieh",
      position: "E",
      department: "copy",
    },
    {
      name: "Yuna Lee",
      position: "E",
      department: "copy",
    },
    {
      name: "Emma Lin",
      position: "E",
      department: "copy",
    },
    {
      name: "Fiona Cai",
      position: "E",
      department: "business",
    },
    {
      name: "Anderson Oh",
      position: "E",
      department: "business",
    },
    {
      name: "Everett Yu-Dawidowicz",
      position: "E",
      department: "business",
    },
    {
      name: "Arnav Malhorta",
      position: "EIT",
      department: "web",
    },
    {
      name: "Maximiliano Pettica",
      position: "E",
      department: "web",
    },
    {
      name: "Owen Shi",
      position: "E",
      department: "web",
    },
  ];
  return staff.map((e, _) => {
    return (
      <Card name={e.name} department={e.department} position={e.position} photo={unknownPhoto}/>
    );
  });
}
function StaffPage() {
  const page_title = "Staff - The Stuyvesant Spectator";
  const meta_url = `https://stuyspec.com/about/staff`;
  const meta_description = `The members of The Stuyvesant Spectator's 2024-2025 Editorial Board.`;

  const cards = cardGen()

  return (
    <>
      <Head>{generateMetaTags(page_title, meta_description, meta_url)}</Head>
      <main id={styles.main}>
        <div id={styles.headingText}>
          <h1>Members of the Spectator Editorial Board</h1>
        </div>
        <section id={styles.memberGrid}>{cards}</section>
      </main>
    </>
  );
}

export default StaffPage;
