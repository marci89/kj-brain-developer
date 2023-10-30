import { Injectable } from '@angular/core';
import { MemoryNumberSettingsModel } from 'src/app/interfaces/games/memory-number.interface';

@Injectable({
  providedIn: 'root'
})
export class MemoryNumberService {
  //private settings model object
  private settings: MemoryNumberSettingsModel = {} as MemoryNumberSettingsModel;

  constructor() {
  }

  //Read settings
  readSettings() {
    return this.settings;
  }

  //update settings
  setSettings(request: MemoryNumberSettingsModel) {
    this.settings = request;
  }
}
