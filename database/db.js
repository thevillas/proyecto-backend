const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://thevillas92:triviumtbs23@cluster0.yysdvzs.mongodb.net/proyect";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB en linea"))
    .catch((error) => console.error(error));
};

module.exports = db
