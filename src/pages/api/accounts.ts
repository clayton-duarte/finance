import { mapHandlerByMethod } from "../../server/lib/request";
import {
  deleteAccount,
  getAccounts,
  postAccount,
  putAccounts,
} from "../../server/controllers/accounts";

export default mapHandlerByMethod({
  DELETE: deleteAccount,
  POST: postAccount,
  PUT: putAccounts,
  GET: getAccounts,
});
