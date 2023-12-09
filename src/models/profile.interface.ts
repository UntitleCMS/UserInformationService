export interface IProfile {
  userId: string;
  displayName: string;
  shortBio: string;
  location: string;
}

export interface IUpdateProfile extends Partial<IProfile> {}