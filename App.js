import express from "express";
import cors from "cors";
import db from "./database/db.js";
import route_log from "./routes/routes_login.js";
import route_crud from "./routes/router_UserCrud.js";
import route_prod from "./routes/products_routes.js";
import route_cart from "./routes/Cart_routes.js";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import route_galery from "./routes/galery_route.js";


const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());





const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
  db();
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use("/api/", route_crud);
app.use("/prod/", route_prod);
app.use("/log", route_log);
app.use("/cart/", route_cart);
app.use("/img/", route_galery);

export default app;
