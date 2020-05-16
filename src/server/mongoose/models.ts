import mongoose, { Document } from "mongoose";

import { Account } from "../../types";
import { AccountSchema } from "./schemas";

function initializeModel<Type>(model, schema) {
  type Doc = Type & Document;
  if (mongoose.models[model]) return mongoose.model<Doc>(model);
  return mongoose.model<Doc>(model, schema);
}

const AccountModel = initializeModel<Account[]>("Account", AccountSchema);

export { AccountModel };
