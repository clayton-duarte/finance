import mongoose from "mongoose";

import { Account } from "../../types";
import { Currencies } from "../../types";

const AccountSchema = new mongoose.Schema<Account>({
  name: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  email: String,
  currency: {
    type: String,
    enum: Object.values(Currencies),
    default: Currencies.CAD,
  },
});

export { AccountSchema };
