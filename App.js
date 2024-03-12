import express from "express";
import cors from "cors";
import db from "./database/db.js";
import route_log from "./routes/routes_login.js";
import route_crud from "./routes/routes_crud.js";
import route_prod from "./routes/products_routes.js";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import morgan from "morgan";


const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(cors());


const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
  db();
});


app.use("/api", route_crud);
app.use("/api/prod/", route_prod);
app.use("/log", route_log);

export default app;
