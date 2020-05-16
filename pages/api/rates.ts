import { withSession, mapHandlerByMethod } from "../../src/server/lib/request";
import { ExchangeResponse } from "../../src/types/interfaces";
import { getRates } from "../../src/server/controllers/rates";

export default mapHandlerByMethod({
  GET: withSession<ExchangeResponse["rates"]>(getRates),
});
