import Head from "next/head";
import about_styles from "../../styles/About.module.css";
import styles from "../../styles/Advertise.module.css";
import { ReceivedStaff } from "../../ts_types/db_types";
import { get_staff_by_position } from "../../db";
import { generateMetaTags } from "../../utils/generateMetaTags";


function Advertise() {
	const email = "business@stuyspec.com";
	const mailto = "mailto:" + email;

	const page_title = "Advertise - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/about/advertise`;
	const meta_description = `How to advertise in The Stuyvesant Spectator.`;

	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>
			<div id={about_styles.container}>
				<h1 className={styles.title}>Advertise</h1>
				<section className={styles.place_order + " " + styles.section}>
					<h3>In order to place an advertisement, please email <a href={mailto} className="link">{email}</a> with the following information:</h3>
					<ol>
						<li>Size/type of advertisement requested</li>
						<li>Number of issues</li>
						<li>The date or issue that you would like your advertisement to appear on</li>
						<li>A digital copy of the ad in JPG, PNG, or PDF format in the approriate dimensions</li>
						<li>For Web advertsiments: A link (preferrably with a referral/tracking code) for the advertsiment to take users to</li>
					</ol>
				</section>
				<section className={styles.section}>
					<h2>Print Pricing (Per Issue)</h2>
					<table className={styles.pricing_table}>
						<tr>
							<th>SIZES</th>
							<th>1 issue</th>
							<th>2-6 issues</th>
							<th>7+ issues</th>
							<th>Annual Lockout (16 Issues)</th>
						</tr>
						<tr>
							<td>Full Page (15.5in x 9.5in)</td>
							<td>$500</td>
							<td>$450</td>
							<td>$400</td>
							<td>$240</td>
						</tr>
						<tr>
							<td>Half Page (7.5in x 9.5in)</td>
							<td>$350</td>
							<td>$300</td>
							<td>$250</td>
							<td>$130</td>
						</tr>
						<tr>
							<td>Quarter Page (7.5in x 5in)</td>
							<td>$200</td>
							<td>$160</td>
							<td>$120</td>
							<td>$70</td>
						</tr>
						<tr>
							<td>Eighth Page (4in x 5in)</td>
							<td>$120</td>
							<td>$85</td>
							<td>$60</td>
							<td>$40</td>
						</tr>
					</table>
				</section>
				<section className={styles.section}>
					<h2>Web Pricing (Per Issue)</h2>
					<table className={styles.pricing_table}>
						<tr>
							<th>SIZES</th>
							<th>2 issues</th>
							<th>4-8 issues</th>
							<th>9-12 issues</th>
							<th>Annual Lockout (16 Issues)</th>
						</tr>
						<tr>
							<td>Box (375px x 500px)</td>
							<td>$150</td>
							<td>$135</td>
							<td>$120</td>
							<td>$90</td>
						</tr>
						<tr>
							<td>Banner* (900px x 200px)</td>
							<td>$125</td>
							<td>$115</td>
							<td>$100</td>
							<td>$75</td>
						</tr>
						<tr>
							<td>Both</td>
							<td>$240</td>
							<td>$215</td>
							<td>$185</td>
							<td>$140</td>
						</tr>
					</table>
					<p className={styles.asterisk}>*Banners appear on top of an article page 30% of the time.</p>
				</section>
				<section className={styles.section}>
					<h2>Student Groups</h2>
					<p>All Clubs and Pubs registered groups are offered discounted advertising rates in The Spectator! A president or cabinet member must email <a href={mailto} className="link">{email}</a> for more details.</p>
				</section>
			</div>
		</>
	);
};

// export async function getServerSideProps() {
// 	let manager = await get_staff_by_position("business manager");
// 	if (manager) {
// 		return {
// 			props: { manager: JSON.parse(JSON.stringify(manager)) },
// 		};
// 	} else
// 		return {
// 			props: {
// 				manager: {
// 					name: "Error: Not found",
// 					email: "Error: Not found",
// 				},
// 			},
// 		};
// }

export default Advertise;
