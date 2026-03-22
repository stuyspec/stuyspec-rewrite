import Head from "next/head";
import styles from "../../styles/Staff.module.css";
import cardStyles from "../../styles/Card.module.css";
import { generateMetaTags } from "../../utils/generateMetaTags";
import Link from "next/link";
import Image from "next/image";
import unknownPhoto from "../../public/images/SpectatorCollageUnknown.png";
import { StaticImageData } from "next/image";
import { get_editors } from "../../db";
import { ReceivedStaff, ReceivedEditor } from "../../ts_types/db_types";


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
  position: "EIT" | "E" | "EIC";
  /* 
	NOTES
	MB: Managing Board (NOT INCLUDED)
	EIT: Editors-in-training
  EIC: Editor-in-chief
	E: Editor
	*/
  photo?: StaticImageData | string;
  //This string will be the src of the image in the memory.
  //If the photo is not chosen, then a gradient will be set in the CSS
  slug: string;
}
function Card(cardProps: CardProps) {
  //RETIRED URL GENERATION MECHANISM. NOW FOUND IN CARDPROPS AS "slug"
  // const urlLink = "/staff/".concat(
  //   cardProps.name.toLowerCase().replace("-", " ").split(" ").join("-")
  // );
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
      <Link href={"/staff/".concat(cardProps.slug)}>
        <div className={cardStyles.imageArea}>
          {
            //Renders the image component
          }
          {imageSrcComponent !== null ? (
            <div style={imageSrcComponent} id={cardStyles.imagePhoto}>
            </div>
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
          {cardProps.department !== "faculty" && cardProps.position !== "EIC"
            ? cardProps.department.charAt(0).toUpperCase() +
              cardProps.department.substring(1).concat(` Department
          ${cardProps.position === "E" ? " Editor" : " Editor-in-training"}`)
            : cardProps.position === "EIC" ? "Editor-in-Chief" : "Faculty Advisor"}{" "}
        </p>
      </div>
    </article>
  );
}
function cardGen(staff:CardProps[]) {
  //Loop over the cardprops and automatically generate the cards.
  return staff.map((e, key) => {
    return (
      <Card key={key} name={e.name} department={e.department} position={e.position} photo={e.photo} slug={e.slug}/>
    );
  });
}

//The next page context allows for the StaffPage which takes in the props
// attribute to take in values from this function
// when it is done loading (note that this function is async).
export async function getServerSideProps(){
  //Get all the editors from the db.ts
  let editors = await get_editors();
  if(editors){
    return {
      //turn it into JSON and return the props.
      props: {
        editors: JSON.parse(JSON.stringify(editors))
      }
    }
  }

}

function StaffPage(props: any) {
  const page_title = "Staff - The Stuyvesant Spectator";
  const meta_url = `https://stuyspec.com/about/staff`;
  const meta_description = `The members of The Stuyvesant Spectator's 2024-2025 Editorial Board.`;


  //Take the information from the editors area and clean them to fit the interface of CardProps
  //After doing that feed it into the card gen.
  const cleaned_editors:CardProps[] = props.editors.map((value: ReceivedEditor) => {return {
    //Automatically cast the value.staff_details to Received to remove type warning since value.staff_details is ReceivedStaff[]
    name: (value.staff_details as ReceivedStaff[])[0].name,
    department: value.department,
    position: value.position,
    photo: value.image_src,
    slug: (value.staff_details as ReceivedStaff[])[0].slug
  }}
)
  const cards = cardGen(cleaned_editors)

  



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
