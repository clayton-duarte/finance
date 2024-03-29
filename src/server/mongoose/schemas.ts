import mongoose from "mongoose";
// import mongooseDouble from "mongoose-double";

import { Currencies, Account, Profile } from "../../types";

// const SchemaTypes = mongooseDouble(mongoose).Schema.Types;

export const AccountSchema = new mongoose.Schema<Account>({
  amount: { type: Number, default: 0 },
  name: { type: String, default: "" },
  email: String,
  currency: {
    type: String,
    enum: Object.values(Currencies),
    default: Currencies.CAD,
  },
});

export const ProfileSchema = new mongoose.Schema<Profile>({
  share: String,
  email: String,
  name: String,
});
