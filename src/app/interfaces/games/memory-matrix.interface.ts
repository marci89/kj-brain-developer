
//basic datas to start to memory matrix game
export interface MemoryMatrixSettingsModel {
  //In practice mode don't save any data to database
  isPracticeMode: boolean;
  //opportunities before die
  opportunities: number;
}

export interface MemoryMatrixItem {
  id: number;
  isMarked: boolean;
  ismarkedVisibility: boolean;
  size: number;
}
