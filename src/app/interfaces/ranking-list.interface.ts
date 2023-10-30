import { TrainingModeType } from "./training.interface";

//RankedUser
export interface RankedUser {
  //user identifier
  userId: number;
  //User name
  username: string;
  //avatar id
  avatarId: number;
  //trainingModeType
  trainingModeType: TrainingModeType;
  //creation date
  score: number;
}

//RankedUser
export interface ListRankingRequest {
  //trainingModeType
  trainingModeType: TrainingModeType;
}
