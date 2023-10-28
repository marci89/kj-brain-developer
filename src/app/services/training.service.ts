import { Injectable } from '@angular/core';
import { MemoryCardPictureType, MemoryCardSettingsModel, MemoryCardSizeType } from '../interfaces/games/memory-card.interface';
import { Router } from '@angular/router';
import { MemoryCardService } from './games/memory-card.service';
import { DailyTrainingStatistics } from '../interfaces/training.interface';
import { MemorySoundSettingsModel, Sound } from '../interfaces/games/memory-sound.interface';
import { MemorySoundService } from './games/memory-sound.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  memoryCardSettings: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;
  memorySoundSettings: MemorySoundSettingsModel = {} as MemorySoundSettingsModel;

  dailyTrainingStatistics: DailyTrainingStatistics = {} as DailyTrainingStatistics;


  constructor(
    private router: Router,
    private memoryCardService: MemoryCardService,
    private memorySoundService: MemorySoundService,
  ) { }

  startMemoryCardGame(){

    const pictureType = this.dailyTrainingStatistics.lastPictureTypeId;
    const cardSize = this.dailyTrainingStatistics.memoryCardSizeType;
    const difficult = this.memoryCardService.setDifficult(cardSize)

    this.memoryCardSettings.isPracticeMode = false;
    this.memoryCardSettings.pictureType = pictureType;
    this.memoryCardSettings.sizeType = cardSize;
    this.memoryCardSettings.difficultType = difficult;

    this.memoryCardService.setSettings(this.memoryCardSettings);
    this.router.navigate(['memory-card']);
  }

  startMemorySoundGame(){
    const soundType = this.dailyTrainingStatistics.lastSoundTypeId;

    this.memorySoundSettings.isPracticeMode = false;
    this.memorySoundSettings.SoundType = soundType;
    this.memorySoundSettings.opportunities = 2;

    this.memorySoundService.setSettings(this.memorySoundSettings);
    this.router.navigate(['memory-sound']);
  }

  startWhatDayIsItGame(){
  }

  startMemoryNumberGame(){
  }

  startMathGame(){
  }

  startMemoryMatrixGame(){
  }
}
