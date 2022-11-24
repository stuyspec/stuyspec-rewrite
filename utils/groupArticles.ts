import { ReceivedArticle } from "../ts_types/db_types";

function groupByImageExists(articles: ReceivedArticle[]) {
	const articlesWithPhotos: ReceivedArticle[] = [];
	const articlesWithoutPhotos: ReceivedArticle[] = [];

	articles.forEach((article) => {
		if (article.cover_image) {
			articlesWithPhotos.push(article);
		} else {
			articlesWithoutPhotos.push(article);
		}
	});

	return {
		withPhotos: articlesWithPhotos,
		withoutPhotos: articlesWithoutPhotos,
	};
}

export default groupByImageExists;
