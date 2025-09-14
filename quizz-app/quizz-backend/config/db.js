const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDb connected successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
connectDb();
