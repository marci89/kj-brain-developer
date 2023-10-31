//basic datas to start to math game
export interface MathSettingsModel {
  //In practice mode don't save any data to database
  isPracticeMode: boolean;
  //opportunities before die
  opportunities: number;
}

//math type
export enum MathType {
  Summation = 1,
  Subtraction = 2,
  Division = 3,
  Multiplication = 4,
}

