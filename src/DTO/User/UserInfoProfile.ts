export interface GetProfileInfoModel {
    owner: boolean;
    displayName: string;
    id: string;
    gender: string;
    hasAvatar: boolean;
    aboutMe:string;
    hasPoster: boolean;
    inConnection?: boolean;
    emailConfirm: boolean;
  }
  