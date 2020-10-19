import mongoose from "mongoose";

import { Currencies, Account, Profile } from "../../types";

const AccountSchema = new mongoose.Schema<Account>({
  amount: { type: Number, default: 0 },
  name: { type: String, default: "" },
  email: String,
  currency: {
    type: String,
    enum: Object.values(Currencies),
    default: Currencies.CAD,
  },
});

const ProfileSchema = new mongoose.Schema<Profile>({
  share: String,
  email: String,
  name: String,
});

export { AccountSchema, ProfileSchema };
