import mongoose from "mongoose";
import { ArticleSchema } from "./schemas/article.shema";

export const ArticleModel = mongoose.model("none-detail-articles", ArticleSchema);
