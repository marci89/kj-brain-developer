import { Injectable, OnInit } from '@angular/core';
import { MemoryCardPictureModel, MemoryCardSettingsModel, MemoryCardSizeType } from '../../interfaces/games/memory-card.interface';
import { DifficultType } from '../../interfaces/games/game.interface';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService {

  //private settings model object
  private settings: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;
  memoryCardPictureModels: MemoryCardPictureModel[] = [];

  constructor() {
    this.initMemoryCardPictureModel()
  }

  //Read settings
  readSettings() {
    return this.settings;
  }

  //update settings
  setSettings(request: MemoryCardSettingsModel) {
    this.settings = request;
  }

  //Get memory cards
  listMemoryCardPictureModel() {
    return this.memoryCardPictureModels;
  }

  //Get memory card model by id
  readMemoryCardPictureModelById(id: number) {
    return this.memoryCardPictureModels.find(x => x.id === id);
  }

  //set difficult
  setDifficult(enumValue: MemoryCardSizeType) : DifficultType {

    const memoryCardPictureModel = this.readMemoryCardPictureModelById(this.settings.pictureType);
    switch (enumValue) {
      case MemoryCardSizeType.Small:
        this.settings.difficultType = DifficultType.Easy;
        break;
      case MemoryCardSizeType.Medium:
        this.settings.difficultType = DifficultType.Medium;
        break;
      case MemoryCardSizeType.Large:
        this.settings.difficultType = DifficultType.Hard;
        break;
      default:
        this.settings.difficultType = DifficultType.Easy;
        break;
    }

    if (memoryCardPictureModel?.isNightmare && this.settings.difficultType === DifficultType.Hard)
      this.settings.difficultType = DifficultType.Nightmare;
    return this.settings.difficultType;
  }

    //Init more complex card picture models
    initMemoryCardPictureModel() {

      const animal: MemoryCardPictureModel = {
        id: 1,
        name: "Animal",
        isNightmare: false
      };

      this.memoryCardPictureModels.push(animal);
    }
}
