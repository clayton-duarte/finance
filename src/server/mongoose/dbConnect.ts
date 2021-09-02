import mongoose from 'mongoose'

const uri = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`

async function dbConnect() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(uri, {
      w: 'majority',
    })
  }
  return
}

export default dbConnect
