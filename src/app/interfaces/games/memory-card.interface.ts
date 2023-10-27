import { DifficultType } from "./game.interface";


//basic datas to start to memory card game
export interface MemoryCardSettingsModel {
  //In practice mode don't save any data to database
  isPracticeMode: boolean;
  //picture types
  pictureType: MemoryCardPictureType;
  //small, medium, large
  sizeType: MemoryCardSizeType;
  //difficult level
  difficultType: DifficultType;
}

//more information about picture card
export interface MemoryCardPictureModel {
  id: number;
  name: string;
  isNightmare: boolean;
}

//picture type
export enum MemoryCardPictureType {
  Animal = 1,
}

//Size
export enum MemoryCardSizeType {
   Small = 1,
   Medium = 2,
   Large = 3,
}

//memory card item
export interface MemorycardItem {
  imageId: string;
  state: "default" | "flipped" | "matched";
}
