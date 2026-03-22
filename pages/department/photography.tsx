import {
  ReceivedPhotoExtra,
  ReceivedCoverImage,
} from "../../ts_types/db_types";
import {
  get_photos_by_article_extra,
  get_photos_by_cover_image,
} from "../../db";
import Head from "next/head";
import Image from "next/image";
import { generateMetaTags } from "../../utils/generateMetaTags";

interface Props {
  cover_images: ReceivedCoverImage[];
  article_extras: ReceivedPhotoExtra[];
}

//Get the server side props from the backend
export async function getServerSideProps() {
  //Look for if photos is recieved from back
  let article_extras: ReceivedPhotoExtra[] =
    await get_photos_by_article_extra(0);
  let cover_images: ReceivedCoverImage[] = await get_photos_by_cover_image(100);
  //If photos is recieved, return the output
  if (cover_images && article_extras) {
    return {
      props: {
        cover_images: JSON.parse(JSON.stringify(cover_images)),
        article_extras: JSON.parse(JSON.stringify(article_extras)),
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default function Photos(props: Props) {
  const page_title = "Photography & Art - The Stuyvesant Spectator";
  const meta_url = `https://stuyspec.com/department/` + "photography";
  const meta_description = `The Photography & Art departments at The Stuyvesant Spectator.`;

  //get all the displayed photos
  let formatted_article_extras = props.article_extras.map((value, _) =>
    value.article[0]
      ? {
          _id: value._id,
          title: value.article[0].title,
          slug: value.article[0].slug,
          volume: value.article[0].volume,
          issue: value.article[0].issue,
          summary: value.article[0].summary,
          contributors: value.article[0].contributors,
          cover_image: value.image_src,
          cover_image_contributor: value.contributors,
        }
      : null,
  );

  //Merge all the images in one mass
  const combined_images = [...props.cover_images, ...formatted_article_extras];

  return (
    <div>
      <Head>{generateMetaTags(page_title, meta_description, meta_url)}</Head>
      <main style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
        <div
          style={{
            columns: "4",
          }}
        >
          {combined_images.map((value, index) => {
            if (value) {
              return (
                <Image
                  src={value.cover_image}
                  width={0}
                  height={0}
                  key={index}
                  alt={"Image"}
                  style={{ width: "100%", height: "100%" }}
                />
              );
            }
          })}
        </div>
      </main>
    </div>
  );
}
