import Head from "next/head";
import Image from "next/image";
import { Department, ReceivedArticle, mongoObjectId } from "../../ts_types/db_types";
import { get_articles_by_department } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[department].module.css";
import gridStyles from "../../styles/ItemGrid.module.css";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

interface Props {
	articles: ReceivedArticle[];
	department: string;
}

function dateFromID(objectId: mongoObjectId) {
	objectId = String(objectId);
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
		.toString()
		.split(" ")
		.slice(0, 4)
		.join(" ");
}

const Article = (props: Props) => {
	console.log("department props: ", props);
	return (
		<div>
			<Head>
				<title>{props.department}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <main id={styles.container}>
        <div id={styles.sidebar}>
          <Sidebar />
        </div>
        <h1 id={styles.department}>{props.department.charAt(0).toUpperCase() + props.department.slice(1)}</h1>
        <div className={gridStyles.container}>
            <div id={gridStyles.grid}>
              {props.articles.map((page, key) => (
                <div key={key}>
                  <img id={gridStyles.image} src={page.cover_image} />
                  <a href={`/article/${page.slug}`}>
                  <h2 id={styles.articleTitle} className="discrete-link">{page.title}</h2>
                  </a>
                  <div
                    id={styles.inline}
                    style={{ fontFamily: "var(--secondary-font)" }}
                  >
                    {page.contributors.map(
                      (contributor: string, index: number) => {
                        let separator =
                          index ===
                          page.contributors.length - 1
                            ? ""
                            : ",";
                          
                        return (
                          <div key={index}>
                            <p
                              id={styles.articleInfoWriters}
                              style={{
                                color: "var(--primary)",
                                fontFamily: "var(--secondary-font)",
                              }}
                              className="discrete-link"
                              key={contributor}
                            >
                              {contributor}
                              {separator}
                              &nbsp;
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <p id={styles.focusSentence}>{page.summary}</p>
                  <p id={styles.articleInfoDate}>
                      {dateFromID(page._id)}
                    </p>
              </div>
              ))}
            </div>
          </div>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	let department = String(
		context.query.department
	).toLowerCase() as Department;

	let articles = await get_articles_by_department(department);
	if (articles) {
		return {
			props: {
				articles: JSON.parse(JSON.stringify(articles)),
				department: department,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: department },
		};
	}
}
