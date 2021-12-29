/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { ReceivedArticle } from "../../ts_types/db_types";
import { get_article_by_slug } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[article_slug].module.css";
import { all_sections } from "../../globals/globals";
import ShareButton from "../../components/ShareButton";

interface Props {
  article: ReceivedArticle;
}

const Article = (props: Props) => {
  const {
    text,
    title,
    cover_image,
    section_id,
    contributors,
    cover_image_contributor,
  } = props.article;
  const section = all_sections[section_id];
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id={styles.main}>
        <h1>{title}</h1>
        <h3 className={styles.authors}>
          {section} | By {contributors.join(", ")}
        </h3>
        <ShareButton
          url={`https://stuyspec.com/article/${props.article.slug}`}
          provider="facebook"
        />
        <ShareButton
          url={`https://stuyspec.com/article/${props.article.slug}`}
          provider="twitter"
        />
        <ShareButton
          url={`https://stuyspec.com/article/${props.article.slug}`}
          provider="linkedin"
        />
        <div id={styles.cover_image_div}>
          <img
            width={"100%"}
            id={styles.cover_image}
            src={cover_image}
            alt="Cover Image"
          />
        </div>
        <p className={styles.cover_image_contributor}>
          By {cover_image_contributor}
        </p>

        <div
          id={styles.content}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </main>
    </div>
  );
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
  const article_slug: string = String(context.query.article_slug);

  let article = await get_article_by_slug(article_slug);
  if (article) {
    return {
      props: { article: JSON.parse(JSON.stringify(article)) },
    };
  } else {
    return {
      notFound: true,
      props: { attempted_identifier: article_slug },
    };
  }
}
