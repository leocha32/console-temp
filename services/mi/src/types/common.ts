export interface IResearchReportFileUrl {
  year: string;
  half: string;
  category: string;
  fileUrl: string;
  updatedTimestamp: number;
}
export interface IUser {
  email: string;
}

export interface IAuth {
  token: string;
  user: IUser;
}
