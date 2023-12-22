import { ReceivedStaff } from "../ts_types/db_types";
import Link from "next/link";

export default function generate_contributors_jsx(
	contributors: ReceivedStaff[]
) {
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
                            </span>
                            {separator}
						</Link>
					</span>
				);
			})}
		</span>
	);
}
