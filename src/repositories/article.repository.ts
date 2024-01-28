import { PipelineStage } from "mongoose";
import { ArticleModel } from "../dao/article.model";
import { FollowModel } from "../dao/follow.model";

export interface getFollowingArticlesOptions {
  limit?: number;
  after?: string;
  before?: string;
}

interface article {
  authorId: string;
  articleId: string;
  cratedAt: Date;
}

export async function getFollowingArticles(
  sub: string,
  option?: getFollowingArticlesOptions
) {
  let date: Date | undefined = undefined;
  let fillter: PipelineStage[] = [];

  if (
    (!option?.before || !option?.after) &&
    (!!option?.before || !!option?.after)
  ) {
    date = (
      await ArticleModel.aggregate([
        {
          $unwind: "$articles",
        },
        {
          $match: {
            "articles.PostID": option?.after || option?.before,
          },
        },
        {
          $project: {
            _id: 0,
            date: "$articles.CreatedAt",
          },
        },
      ]).exec()
    )[0].date;

    console.log(date);

    if (!!option?.before)
      fillter = [
        {
          $match: {
            "a.articles.CreatedAt": {
              $lt: date,
            },
          },
        },
      ];
    else
      fillter = [
        {
          $match: {
            "a.articles.CreatedAt": {
              $gt: date,
            },
          },
        },
      ];
  }

  const x = await FollowModel.aggregate<article>([
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
        from: "none-detail-articles",
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
    ...fillter,
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
