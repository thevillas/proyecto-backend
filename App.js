import express from "express";
import cors from "cors";
import route_log from "./routes/routes_login.js";
import route_crud from "./routes/routes_crud.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import sqlBase from "./database/mySql.js";

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const PORT = 4000;

app.locals.db = sqlBase;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});

app.use("/api", route_crud);
app.use("/log", route_log);

export default app;

