
//basic datas to start to memory number game
export interface MemoryNumberSettingsModel {
  //In practice mode don't save any data to database
  isPracticeMode: boolean;
  //Start digit
  startDigit: number;
  //opportunities before die
  opportunities: number;
}

