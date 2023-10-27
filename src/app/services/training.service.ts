import { Injectable } from '@angular/core';
import { MemoryCardPictureType, MemoryCardSettingsModel, MemoryCardSizeType } from '../interfaces/memory-card.interface';
import { Router } from '@angular/router';
import { MemoryCardService } from './memory-card.service';
import { DifficultType } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  memoryCardSettings: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;

  constructor(
    private router: Router,
    private memoryCardService: MemoryCardService,
  ) { }

  startMemoryCardGame(){
    this.memoryCardSettings.isPracticeMode = false;
    this.memoryCardSettings.pictureType = MemoryCardPictureType.Animal;
    this.memoryCardSettings.sizeType = MemoryCardSizeType.Small;
    this.memoryCardSettings.difficultType = DifficultType.Easy;
    this.memoryCardSettings.difficultType = this.memoryCardService.setDifficult(this.memoryCardSettings.sizeType);

    this.memoryCardService.setSettings(this.memoryCardSettings);
    this.router.navigate(['memory-card']);
  }

  startMemorySoundGame(){
  }
}
