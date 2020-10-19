import { mapHandlerByMethod, withSession } from "../../server/lib/request";
import { putProfile } from "../../server/controllers/profile";

export default withSession(
  mapHandlerByMethod({
    PUT: putProfile,
  })
);
