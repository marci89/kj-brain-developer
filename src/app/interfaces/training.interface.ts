import { DifficultType } from "./games/game.interface";
import { MemoryCardSizeType } from "./games/memory-card.interface";

//Create training statistics server request
export interface CreateTrainingStatisticsRequest {
  //score
  score: number;
  //training mode
  trainingMode: TrainingModeType;
  //sound type id
  soundTypeId: number;
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
  // pic id
  pictureTypeId: number;
  //practice or traning
  isPractice: boolean;
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
  //sound type id
  soundTypeId: number;
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
  // pic id
  pictureTypeId: number;
  //practice or traning
  isPractice: boolean;
  //creation date
  created: Date;
}

//daily training statistics
export interface DailyTrainingStatistics {
  memoryCard:MemoryCardStatistics;

  memorySound: TrainingStatistics;
  whatDayIsIt: TrainingStatistics;
  memoryNumber: TrainingStatistics;
  math: TrainingStatistics;
  memoryMatrix: TrainingStatistics;

  bestMemorySoundScore: number;
  bestWhatDayIsItScore: number;
  bestMemoryNumberScore: number;
  bestMathdScore: number;
  bestMemoryMatrixScore: number;

  lastPictureTypeId: number;
  lastSoundTypeId: number;
  memoryCardSizeType: MemoryCardSizeType
}


export enum TrainingModeType {
  MemorySound = 1,
  WhatDayIsIt = 2,
  MemoryNumber = 3,
  Math = 4,
  MemoryMatrix = 5,
}
