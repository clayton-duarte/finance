import mongoose, { Document } from "mongoose";

import { Account, User } from "../../types/interfaces";
import { AccountSchema, UserSchema } from "./schemas";

function initializeModel<Type>(model, schema) {
  type Doc = Type & Document;
  if (mongoose.models[model]) return mongoose.model<Doc>(model);
  return mongoose.model<Doc>(model, schema);
}

const AccountModel = initializeModel<Account[]>("Account", AccountSchema);
const UserModel = initializeModel<User>("User", UserSchema);

export { AccountModel, UserModel };
