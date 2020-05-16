import { withSession, mapHandlerByMethod } from "../../server/lib/request";
import { ExchangeResponse } from "../../types";
import { getRates } from "../../server/controllers/rates";

export default mapHandlerByMethod({
  GET: withSession<ExchangeResponse["rates"]>(getRates),
});
