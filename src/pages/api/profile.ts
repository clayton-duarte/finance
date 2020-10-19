import { mapHandlerByMethod, withSession } from "../../server/lib/request";
import { getProfile, putProfile } from "../../server/controllers/profile";

export default withSession(
  mapHandlerByMethod({
    GET: getProfile,
    PUT: putProfile,
  })
);
