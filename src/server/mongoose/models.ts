import mongoose, { Document } from 'mongoose'

import { AccountSchema, ProfileSchema } from './schemas'
import { Account, Profile } from '../../types'

function initializeModel<Type>(model, schema) {
  type Doc = Type & Document
  if (mongoose.models[model]) return mongoose.model<Doc>(model)
  return mongoose.model<Doc>(model, schema)
}

const AccountModel = initializeModel<Account[]>('Account', AccountSchema)
const ProfileModel = initializeModel<Profile>('Profile', ProfileSchema)

export { AccountModel, ProfileModel }
