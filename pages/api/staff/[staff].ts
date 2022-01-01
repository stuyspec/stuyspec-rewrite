import type { NextApiRequest, NextApiResponse } from "next";
import { RecievedStaff } from "../../../ts_types/db_types";
import { get_staff } from "../../../db";

type ResponseStructure = {
  staff: [RecievedStaff];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseStructure>
) {
  const { method, query } = req;

  if (method == "GET") {
    let slug: string = String(query.staff);
    let staff = await get_staff(slug);
    res.json({ staff: JSON.parse(JSON.stringify(staff)) });
  } else {
    res.status(400);
  }
}
