import type { NextApiRequest, NextApiResponse } from "next";
import { ReceivedStaff } from "../../../ts_types/db_types";
import { get_staff_by_id } from "../../../db";

type ResponseStructure = {
  member: ReceivedStaff;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseStructure>
) {
  const { method, query } = req;

  if (method == "GET") {
    let id: string = String(query.staff);
    let member = await get_staff_by_id(id);
    res.json({ member: JSON.parse(JSON.stringify(member)) });
  } else {
    res.status(400);
  }
}
