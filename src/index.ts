/*
TODO LIST:
Produce a page to report the machine statuses of the last 24 hours in the database (e.g. January 7th).

    The total net production for the machine (gross output - scrap).
    The percentage of scrap vs gross production.
    The percentage of downtime for a machine.
    A graph/table showing the net production (gross production – scrap) for every hour. 

*/

import express from "express";
import path from "path";
import config from "../config.json";
import { index } from "./routes/index";
import bodyParser from "body-parser";

import "./db/index";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "../../views"));

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "../../static")));

app.use("/", index);

app.use("/api", index);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));