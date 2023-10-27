import { DifficultType } from "./game.interface";

//basic datas to start to memory sound game
export interface MemorySoundSettingsModel {
  //In practice mode don't save any data to database
  isPracticeMode: boolean;
  //sound types
  SoundType: number;
  //opportunities before die
  opportunities: number;
}

//more information about sound
export interface MemorySoundModel {
  id: number;
  name: string;
  voices: Sound[];
}

export interface Sound {
  id: number;
  name: string;
}


