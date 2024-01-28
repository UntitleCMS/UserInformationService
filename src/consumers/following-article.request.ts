import mqConnection, { HandlerConsumer } from "../config/queue.config";
import { getFollowingArticles } from "../repositories/article.repository";

interface x {
  Sub: string;
  Take: number;
  Before?: string;
  After?: string;
}

export const followingArticleRequest: HandlerConsumer = (msg) => {
  var data: x = JSON.parse(msg.content.toString());
  console.log("Find following article : " ,data);

  getFollowingArticles(data.Sub, {
    limit: data.Take,
    after: data.After
  }).then(a=>{
    mqConnection.channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(a)),
      {
        correlationId: msg.properties.correlationId,
      }
    );
  });

};
