import mongoose from "mongoose";
import { ArticleSchema } from "./schemas/article.shema";

export const ArticleModel = mongoose.model("articles", ArticleSchema);
