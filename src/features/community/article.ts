import { Request, Response } from "express";
import { getFollowingArticles } from "../../repositories/article.repository";

export async function articleEndpoint(req: Request, res: Response){
    const articles = await getFollowingArticles("C95KV0xhcUuD1s5HHWM4uA");

    res.json(articles);
    
}
