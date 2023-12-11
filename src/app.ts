import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDatabase from "./config/db.config";
import profileRoute from "./features/profile/profile.route";
import followRoute from "./features/follow/follow.route";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

connectDatabase();

app.use("/apis/profiles", profileRoute);
app.use("/apis/follows", followRoute);

app.listen(port, () => console.log(`Application is running on port ${port}`));
