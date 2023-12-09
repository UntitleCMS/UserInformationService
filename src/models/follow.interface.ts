export interface IFollow {
  followerId: string;
  followeeId: string;
}

export interface IFollowers {
  followeeId: string;
  followerIds: string[];
}

export interface IFollowees {
  followerId: string;
  followeeIds: string[];
}