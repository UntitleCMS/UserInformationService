import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDatabase from "./config/db.config";
import profileRoute from "./features/profile/profile.route";
import followRoute from "./features/follow/follow.route";
import communityRoute from "./features/community/article.rout";
import mqConnection from "./config/queue.config";
import { newArticle } from "./consumers/new-article";
import { followingArticleRequest } from "./consumers/following-article.request";
import { addSystemProfile } from "./workers/add-oficail-account";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

connectDatabase();
mqConnection.connect().then(()=>{
    mqConnection.consume("article/new", newArticle);
    mqConnection.consume("following/articles",followingArticleRequest);
});

app.use("/profiles", profileRoute);
app.use("/follows", followRoute);
app.use("/community", communityRoute);

addSystemProfile();

app.listen(port, () => console.log(`Application is running on port ${port}`));
