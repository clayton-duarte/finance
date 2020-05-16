import mongoose from "mongoose";

import { Account, User } from "../../types/interfaces";
import { Currencies } from "../../types/enums";

const AccountSchema = new mongoose.Schema<Account>({
  name: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  currency: {
    type: String,
    enum: Object.values(Currencies),
    default: Currencies.CAD,
  },
});

const UserSchema = new mongoose.Schema<User>({
  publicAddress: String,
  issuer: String,
  email: String,
});

export { AccountSchema, UserSchema };
