import { mapHandlerByMethod } from "../../server/lib/request";
import { getRates } from "../../server/controllers/rates";

export default mapHandlerByMethod({
  GET: getRates,
});
