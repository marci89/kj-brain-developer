import { DifficultType } from "./game.interface";

//Create training statistics server request
export interface CreateTrainingStatisticsRequest {
  //score
  score: number;
  //training mode
  trainingMode: TrainingModeType;
}

//list training statistics for chart server request
export interface ListTrainingStatisticsChartRequest {
  //quantity
  quantity: number;
}

//Create memory card statistics server request
export interface CreateMemoryCardStatisticsRequest {
  //movd
  moved: number;
  //difficult
  difficult: DifficultType;
  //last pic id
  lastPictureTypeId: number;
}

//list memory card statistics for chart server request
export interface ListMemoryCardStatisticsChartRequest {
  //quantity
  quantity: number;
}



//training statistics response for chart
export interface TrainingStatisticsChart {
  chartLabel: string[];
  memorySoundChartData: string[];
  memoryNumberChartData: string[];
  memoryMatrixChartData: string[];
  mathChartData: string[];
}

//memory card statistics response for chart
export interface MemoryCardStatisticsChart {
  // Label list for chart diagram
  chartLabel: string[];
  easyChartData: string[];
  mediumChartData: string[];
  hardChartData: string[];
  nightmareChartData: string[];
}

//training statistics
export interface TrainingStatistics {
  //identifier
  id: number;
  //User id
  userId: number;
  //score
  score: number;
  //training mode
  trainingMode: TrainingModeType;
  //creation date
  created: Date;
}

//memory card statistics
export interface MemoryCardStatistics {
  //identifier
  id: number;
  //User id
  userId: number;
  //moved
  moved: number;
  //difficult
  difficult: DifficultType;
  //last pic id
  lastPictureTypeId: number;
  //creation date
  created: Date;
}

export enum TrainingModeType {
  MemorySound = 1,
  MemoryNumber = 2,
  MemoryMatrix = 3,
  Math = 4
}
