import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const connectDatabase = async () => {
  let dbCon;
  try {
    dbCon = await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error.message);
  }

  console.log(`Connected to mongodb ${dbCon?.connection.host}`);
};

export default connectDatabase;
