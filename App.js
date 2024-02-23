import express from "express";
import cors from "cors";
import db from "./database/db.js";
import router from "./routes/routes_login.js";




const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
  db();
});


app.use("/log", router);

export default app;
