import { Schema } from "mongoose";

export const ArticleSchema = new Schema({
  _id: String, // Author ID
  articles: Array
  // Articles schema
  // [
  //   {
  //     PostID: String,
  //     CreatedAt: Date,
  //   }
  // ],
});
