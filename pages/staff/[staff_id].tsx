import Head from "next/head";
import { mongoObjectId, ReceivedStaff } from "../../ts_types/db_types";

import { NextPageContext } from "next";
import styles from "../../styles/[staff_id].module.css";
import { get_staff_by_id } from "../../db";
interface Props {
	staff_id: mongoObjectId;
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
				<h1>Name: {staff_member.name}</h1>
				<h1>Email: {staff_member.email}</h1>
				<h2>Description: {staff_member.description}</h2>
				<h3>Slug (Legacy): {staff_member.slug}</h3>
			</main>
		</div>
	);
};

export default StaffMember;

export async function getServerSideProps(context: NextPageContext) {
	let staff_id = String(context.query.staff_id);

	let staff = await get_staff_by_id(staff_id);
	if (staff) {
		return {
			props: {
				staff: JSON.parse(JSON.stringify(staff)),
				staff_id: staff_id,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: staff_id },
		};
	}
}
