//basic datas to start to WhatDayIsIt game
export interface WhatDayIsItSettingsModel {
  //In practice mode don't save any data to database
  isPracticeMode: boolean;
  //opportunities before die
  opportunities: number;
}

//day type
export enum DayType {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export interface DayButtonModel {
  id: DayType;
  name: string;
}

