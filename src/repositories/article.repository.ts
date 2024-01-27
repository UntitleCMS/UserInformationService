import { ArticleModel } from "../dao/article.model";
import { FollowModel } from "../dao/follow.model";

export interface getFollowingArticlesOptions {}

interface article {
  authorId: string;
  articleId: string;
  cratedAt: Date;
}

export async function getFollowingArticles(
  sub: string,
  option?: getFollowingArticlesOptions
) {
  const x = await FollowModel.aggregate([
    {
      $match: {
        followerId: sub,
      },
    },
    {
      $group: {
        _id: "$followeeId",
      },
    },
    {
      $lookup: {
        from: "articles",
        localField: "_id",
        foreignField: "_id",
        as: "a",
      },
    },
    {
      $unwind: "$a",
    },
    {
      $unwind: "$a.articles",
    },
    {
      $match: {
        "a.articles.CreatedAt": {
          $gt: new Date("Thu, 12 Jan 2012 20:15:31 GMT"),
        },
      },
    },
    {
      $project: {
        _id: 0,
        authorId: "$_id",
        articleId: "$a.articles.PostID",
        cratedAt: "$a.articles.CreatedAt",
      },
    },
  ]);

  return x;
}
