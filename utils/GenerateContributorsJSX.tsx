import { ReceivedStaff } from "../ts_types/db_types";
import Link from "next/link";

export default function generate_contributors_jsx(
	contributors: ReceivedStaff[]
) {
	return contributors.map((contributor: ReceivedStaff, index: number) => {
		let separator = index === contributors.length - 1 ? "" : ",";

		return (
			<div key={index}>
				<Link
					style={{
						color: "var(--primary)",
						fontFamily: "var(--secondary-font)",
					}}
					key={String(contributor._id)}
					href={"/staff/" + contributor.slug}
					passHref
				>
					<span className="discrete-link">
						{contributor.name}
						{separator}
						&nbsp;
					</span>
				</Link>
			</div>
		);
	});
}
