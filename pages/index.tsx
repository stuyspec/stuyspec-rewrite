/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { get_articles } from "../db";
import { ReceivedArticle } from "../ts_types/db_types";
import { all_sections } from "../globals/globals";
import Separator from "../components/Separator";
interface Props {
	articles: [ReceivedArticle];
}

const Home = (props: Props) => {
  // console.log("Props: ", props);
  const displayArticles: any[] = []; // Any type because this element will change often
  const articles = props.articles;
  articles.forEach((i) => {
    var dateFromID = function (objectId: any) {
      return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toString().split(" ").slice(0, 4).join(" ");
    };    
    displayArticles.push(
      <div id={styles.article} key={String(i._id)}>
        <Link href={"/article/" + i.slug}>
          <h2 id={styles.title} className="discrete-link">{i.title}</h2>
        </Link>
        <div id={styles.inline} style={{fontFamily: "var(--secondary-font)"}}>
          <p id={styles.articleInfoWriters} style={{color: "var(--primary)"}} className="discrete-link">{ i.contributors.join(", ") }</p>
          <p id={styles.articleInfoDate} style={{marginLeft: "1rem"}}>{ dateFromID(i._id) }</p>
        </div>
        <p id={styles.summary}>{i.summary}</p>
        <Link href={`/department/${all_sections[i.section_id]}`} passHref>
          <p id={styles.articleInfo} className="discrete-link">{ all_sections[i.section_id] }</p>
        </Link>
      </div>
    );
  });

	const heroArticle = articles[0];

	return (
		<div>
			<Head>
				<title>The Stuyvesant Spectator</title>
				<meta name="description" content="The Stuyvesant Spectator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<div id={styles.landingScreen}>

            <div id={styles.heroStory}>
              <div id={styles.heroImageContainer}>
                <img id={styles.heroImage} src={heroArticle.cover_image} />
                <div id={styles.departmentBar}>{ all_sections[heroArticle.section_id] }</div>
              </div>

            <Link passHref href={"/article/" + heroArticle.slug}>
              <h1 className="discrete-link">{heroArticle.title}</h1>
            </Link>

              <p id={styles.writers}>{heroArticle.contributors.join(", ")}</p>
              <p id={styles.summary}>{heroArticle.summary}</p>
              <Image src="/images/down-arrow.svg" width="24px" height="24px" />
            </div>

					<div id={styles.infoBar}>
						<Separator />
						<div id={styles.announcements}>
							<div id={styles.countdown}>
								<p>
									<h1>h</h1>days until {"christmas break"}
								</p>
							</div>
						</div>
						<div style={{ transform: "rotate(90deg)" }}>
							<Separator />
						</div>
						<div id={styles.weather}>snow yay</div>
						<Separator />
					</div>

					<div id={styles.latestArticles}>
						<h1 id={styles.heading}>Latest</h1>
						<Separator />
						<div>{displayArticles.slice(1)}</div>
					</div>
				</div>
				<div id={styles.articles}></div>
				<div id={styles.articles}></div>
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	let articles = await get_articles();
	return {
		props: { articles: JSON.parse(JSON.stringify(articles)) },
	};
}
