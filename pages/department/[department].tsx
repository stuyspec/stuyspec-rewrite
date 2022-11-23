/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import {
	Department,
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../../ts_types/db_types";
import { get_articles_by_department } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[department].module.css";
import Link from "next/link";
import generate_contributors_jsx from "../../components/GenerateContributorsJSX";

interface Props {
	articles: ReceivedArticle[];
	department_display: string;
}

const Article = (props: Props) => {
	console.log("department props: ", props);
    
    const articlesWithPhotos: ReceivedArticle[] = [];
    const articlesWithoutPhotos: ReceivedArticle[] = [];

    const splitArticles = () => {
        props.articles.forEach(article => {
            if (article.cover_image) {
                articlesWithPhotos.push(article);
            } else {
                articlesWithoutPhotos.push(article);
            }
        })
    }

    splitArticles();

    console.log(articlesWithPhotos);

	return (
		<div>
			<Head>
				<title>{props.department_display}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
                <h1 id={styles.departmentTitle}>{props.department_display}</h1>
                <div>
					{articlesWithPhotos.length > 0 ? (
						<div className={styles.grid}>
                            {articlesWithPhotos.map((article) => (
                                <div className={styles.item} key={article._id as any}>
                                    <Link
                                        href={"/article/" + article.slug}
                                        passHref
                                    >
                                        <div className={styles.item_text}>
                                            <Image
                                                id={styles.image}
                                                alt={article.cover_image_summary}
                                                src={article.cover_image}
                                                height="750"
                                                width="750"
                                            />
                                            <h2>{article.title}</h2>
                                            <div className={styles.authors}>
                                                {generate_contributors_jsx(
                                                    article.contributors
                                                )}
                                            </div>
                                            <p className={styles.summary}>{article.summary}</p>
                                            <p className={styles.article_volume_issue}>
                                                {"Volume " + article.volume + " Issue " + article.issue}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
							))}
						</div>
                        
					) : (
						<div>
							<h2>
								No articles were found under that department
							</h2>
						</div>
                    )}
                    </div>
                    
                    <div>
					{articlesWithoutPhotos.length > 0 ? (
						<div className={styles.grid}>
                            {articlesWithoutPhotos.map((article) => (
                                <div
                                    className={styles.item}
                                    key={article._id as any}
                                    style={{gridColumn: "span 2"}}
                                >
                                    <Link
                                        href={"/article/" + article.slug}
                                        passHref
                                    >
                                        <div className={styles.item_text}>
                                            <h2>{article.title}</h2>
                                            <div className={styles.authors}>
                                                {generate_contributors_jsx(
                                                    article.contributors
                                                )}
                                            </div>
                                            <p className={styles.summary}>{article.summary}</p>
                                            <p className={styles.article_volume_issue}>
                                                {"Volume " + article.volume + " Issue " + article.issue}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
							))}
						</div>
                        
					) : (
						<div>
							<h2>
								No articles were found under that department
							</h2>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	let department_param = String(
		context.query.department
	).toLowerCase() as Department;

	const department_id = DepartmentsArray.findIndex(
		(a) => a == department_param
	);
	if (department_id == -1) {
		// If there is no department found with that param, 404
		return {
			notFound: true,
			props: { attempted_identifier: department_param },
		};
	}

	const department_display = DepartmentsArrayDisplay[department_id];

	let articles = await get_articles_by_department(department_param, 30);
	if (articles) {
		return {
			props: {
				articles: JSON.parse(JSON.stringify(articles)),
				department_display: department_display,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: department_param },
		};
	}
}
