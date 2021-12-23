/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from 'next/image'
import { RecievedArticle } from "../../ts_types/db_types";
import { get_article_by_id } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[article_id].module.css";
interface Props {
	article: RecievedArticle;
}

const Article = (props: Props) => {
	const { _id, text, title, cover_image } = props.article;
	console.log(props.article)
	return (
		<div>
			<Head>
        		<title>{ title }</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
        		<h1>{ title }</h1>
				<div id={styles.cover_image_div}>
					
					<img width={"100%"} id={styles.cover_image} src={cover_image} alt={`The cover image of ${title}`}/>
				</div>
				
				<div id={styles.content} dangerouslySetInnerHTML={{__html : text}}></div>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	const article_id: string = String(context.query.article_id);

	let article = await get_article_by_id(article_id);

	return {
		props: { article: JSON.parse(JSON.stringify(article)) },
	};
}
