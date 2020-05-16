import mongoose from "mongoose";

const uri = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`;
const options = {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  w: "majority",
};

async function dbConnect() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(uri, options);
  }
  return;
}

export default dbConnect;
