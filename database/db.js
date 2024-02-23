import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://thevillas92:triviumtbs23@cluster0.yysdvzs.mongodb.net/proyect";

const db = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB en línea");
  } catch (error) {
    console.error(error);
  }
};

export default db;
