import { mongoObjectId } from "../ts_types/db_types";

function dateFromID(objectId: mongoObjectId) {
	objectId = String(objectId);
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
		.toString()
		.split(" ")
		.slice(0, 4)
		.join(" ");
}

export default dateFromID;