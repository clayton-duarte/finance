import { withSession, mapHandlerByMethod } from "../../src/server/lib/request";
import { Account } from "../../src/types/interfaces";
import {
  deleteAccount,
  getAccounts,
  postAccount,
  putAccounts,
} from "../../src/server/controllers/accounts";

export default mapHandlerByMethod({
  DELETE: withSession<Account["_id"]>(deleteAccount),
  PUT: withSession<Account[]>(putAccounts),
  GET: withSession<Account[]>(getAccounts),
  POST: withSession<Account>(postAccount),
});
