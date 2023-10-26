import { Injectable, OnInit } from '@angular/core';
import { MemoryCardPictureModel, MemoryCardSettingsModel } from '../interfaces/memory-card.interface';

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

  //Init more complex card picture models
  initMemoryCardPictureModel() {

    const animal: MemoryCardPictureModel = {
      id: 1,
      name: "Animal",
      isNightmare: false
    };

    this.memoryCardPictureModels.push(animal);
  }

  //Get memory cards
  listMemoryCardPictureModel() {
    return this.memoryCardPictureModels;
  }

  //Get memory card model by id
  readMemoryCardPictureModelById(id: number) {
    return this.memoryCardPictureModels.find(x => x.id === id);
  }
}
