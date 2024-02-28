import express from "express";
import cors from "cors";
import db from "./database/db.js";
import route_log from "./routes/routes_login.js";
import route_crud from "./routes/routes_crud.js";
import bodyParser from "body-parser"
import corsOptions from "./controllers/corsOptions.js";
import verifyToken from "./middlewares/verifyToken.js";
// import cookieParser from 'cookie-parser'



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use((cookieParser))


app.use(cors());
app.use(cors(corsOptions), verifyToken);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
  db();
});


app.use("/api", route_crud);
app.use("/log", route_log);

export default app;
