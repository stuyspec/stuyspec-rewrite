import Head from "next/head";
import { mongoObjectId, ReceivedStaff } from "../../ts_types/db_types";

import { NextPageContext } from "next";
import styles from "../../styles/[staff_id].module.css";
import { get_staff_by_id, get_staff_by_slug } from "../../db";

interface Props {
	staff_identifier: mongoObjectId;
	staff: ReceivedStaff;
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
				<h1>Staff ID: {staff_member._id}</h1>
				<h1>Slug (Legacy): {staff_member.slug}</h1>
				<h1>Name: {staff_member.name}</h1>
				<h1>Email: {staff_member.email}</h1>
				<h2>Description: {staff_member.description}</h2>
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
	if (staff) {
		return {
			props: {
				staff: JSON.parse(JSON.stringify(staff)),
				staff_identifier: staff_identifier,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: staff_identifier },
		};
	}
}
