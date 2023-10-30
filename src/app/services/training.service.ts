import { Injectable } from '@angular/core';
import { MemoryCardPictureType, MemoryCardSettingsModel, MemoryCardSizeType } from '../interfaces/games/memory-card.interface';
import { Router } from '@angular/router';
import { MemoryCardService } from './games/memory-card.service';
import { DailyTrainingStatistics } from '../interfaces/training.interface';
import { MemorySoundSettingsModel, Sound } from '../interfaces/games/memory-sound.interface';
import { MemorySoundService } from './games/memory-sound.service';
import { MemoryNumberSettingsModel } from '../interfaces/games/memory-number.interface';
import { MemoryNumberService } from './games/memory-number.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  //max values
   PICTURE_TYPE_MAX_VALUE : number = 1;
   SOUND_TYPE_MAX_VALUE : number = 5;

  //settings
  memoryCardSettings: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;
  memorySoundSettings: MemorySoundSettingsModel = {} as MemorySoundSettingsModel;
  memoryNumberSettings: MemoryNumberSettingsModel = {} as MemoryNumberSettingsModel;

  //daily training object
  dailyTrainingStatistics: DailyTrainingStatistics = {} as DailyTrainingStatistics;


  constructor(
    private router: Router,
    private memoryCardService: MemoryCardService,
    private memorySoundService: MemorySoundService,
    private memoryNumberService: MemoryNumberService,
  ) { }

  //start memory card game
  startMemoryCardGame(){
    const pictureType = this.generateNextTypeId(this.dailyTrainingStatistics.lastPictureTypeId, this.PICTURE_TYPE_MAX_VALUE);
    const cardSize = this.dailyTrainingStatistics.memoryCardSizeType;
    const difficult = this.memoryCardService.setDifficult(cardSize)

    this.memoryCardSettings.isPracticeMode = false;
    this.memoryCardSettings.pictureType = pictureType;
    this.memoryCardSettings.sizeType = cardSize;
    this.memoryCardSettings.difficultType = difficult;

    this.memoryCardService.setSettings(this.memoryCardSettings);
    this.router.navigate(['memory-card']);
  }

//start memory sound game
  startMemorySoundGame(){
    const soundType = this.generateNextTypeId(this.dailyTrainingStatistics.lastSoundTypeId, this.SOUND_TYPE_MAX_VALUE);

    this.memorySoundSettings.isPracticeMode = false;
    this.memorySoundSettings.SoundType = soundType;
    this.memorySoundSettings.opportunities = 2;

    this.memorySoundService.setSettings(this.memorySoundSettings);
    this.router.navigate(['memory-sound']);
  }

  //start memory card game
  startWhatDayIsItGame(){
  }

  //start memory number game
  startMemoryNumberGame(){
    this.memoryNumberSettings.isPracticeMode = false;
    this.memoryNumberSettings.startDigit = 3;
    this.memoryNumberSettings.opportunities = 1;

    this.memoryNumberService.setSettings(this.memoryNumberSettings);
    this.router.navigate(['memory-number']);
  }

  //start math game
  startMathGame(){
  }

  //start memory matrix game
  startMemoryMatrixGame(){
  }

  //calculate pictureTypeId and soundTypeId
  private generateNextTypeId(lastId: number, maxValue: number) : number{
    if(lastId === maxValue || lastId === 0){
      return 1;
    }

    if(lastId < maxValue){
      return ++lastId;
    }

    const randomNumber = Math.random() * (maxValue);
    return Math.floor(randomNumber) + 1;
  }
}
