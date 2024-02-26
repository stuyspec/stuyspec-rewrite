import { ReceivedStaff } from "../ts_types/db_types";
import Link from "next/link";

export default function generate_contributors_jsx(
	contributors: ReceivedStaff[]
) {
	contributors.sort((a,b) => 0 - (a.name < b.name ? 1 : -1))
	return (
		<span>
			{contributors.map((contributor: ReceivedStaff, index: number) => {
				let separator = index === contributors.length - 1 ? "" : ", ";

				return (
					<span key={index}>
						<Link
							key={String(contributor._id)}
							href={"/staff/" + contributor.slug}
							passHref
						>
							<span className="discrete-link">
								{contributor.name}
								{separator}
							</span>
						</Link>
					</span>
				);
			})}
		</span>
	);
}
