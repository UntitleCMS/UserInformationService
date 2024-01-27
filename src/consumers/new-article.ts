import { HandlerConsumer } from "../config/queue.config";
import { ArticleModel } from "../dao/article.model";

interface x {
  PostID: string;
  AuthorID: string;
  CreatedAt: Date;
}

export const newArticle: HandlerConsumer = (msg: string) => {
  console.log("CONSUME EVENT");
  let data = JSON.parse(msg.toString());
  data.CreatedAt = new Date(data.CreatedAt);

  const a = ArticleModel.updateOne(
    {_id: data.AuthorID},
    { $push: { articles: {PostID: data.PostID, CreatedAt: data.CreatedAt} }},
    { upsert: true },
  ).then(console.log).catch(console.error);
  console.log(a);
  
  console.log(data);
  console.log(data.CreatedAt);
};
