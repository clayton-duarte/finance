import { withSession, mapHandlerByMethod } from "../../server/lib/request";
import { Account } from "../../types";
import {
  deleteAccount,
  getAccounts,
  postAccount,
  putAccounts,
} from "../../server/controllers/accounts";

export default mapHandlerByMethod({
  DELETE: withSession<Account["_id"]>(deleteAccount),
  PUT: withSession<Account[]>(putAccounts),
  GET: withSession<Account[]>(getAccounts),
  POST: withSession<Account>(postAccount),
});
