import Head from "next/head";
import {
	defaultProps,
	mongoObjectId,
	ReceivedStaff,
	ReceivedArticle,
} from "../../ts_types/db_types";

import { NextPageContext } from "next";
import styles from "../../styles/[staff_id].module.css";
import {
	get_articles_by_author,
	get_staff_by_id,
	get_staff_by_slug,
} from "../../db";
import GridArticleDisplay from "../../components/GridArticleDisplay";

interface Props extends defaultProps {
	staff_identifier: mongoObjectId;
	staff: ReceivedStaff;
	staff_articles: ReceivedArticle[];
}

const StaffMember = (props: Props) => {
	const staff_member = props.staff;

	return (
		<div>
			<Head>
				<title>{staff_member.name}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<h1 id={styles.name}>
					{staff_member.name}{" "}
					<span id={styles.slug}>({staff_member.slug})</span>
				</h1>

				<a href={"mailto:" + staff_member.email} id={styles.email}>
					{staff_member.email}
				</a>
				<p id={styles.description}>{staff_member.description}</p>

				<GridArticleDisplay articles={props.staff_articles} />
			</main>
		</div>
	);
};

export default StaffMember;

export async function getServerSideProps(context: NextPageContext) {
	let staff_identifier = String(context.query.staff_identifier);

	let staff: ReceivedStaff;
	if (context.query.identifier_type == "id") {
		staff = await get_staff_by_id(staff_identifier);
	} else {
		staff = await get_staff_by_slug(staff_identifier); // Getting staff by slug is default, for legacy support
	}

	let staff_articles = await get_articles_by_author(staff._id);
	staff_articles = JSON.parse(JSON.stringify(staff_articles));

	console.log("ARTICLES BY THIS STAFF: ", staff_articles);

	if (staff) {
		return {
			props: {
				staff: JSON.parse(JSON.stringify(staff)),
				staff_identifier: staff_identifier,
				staff_articles: staff_articles,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: staff_identifier },
		};
	}
}
