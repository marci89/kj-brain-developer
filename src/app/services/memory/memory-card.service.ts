import { Injectable } from '@angular/core';
import { MemoryCardSettingsModel } from 'src/app/interfaces/memory/memory-card.interface';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService {

    //private settings model object
    private settings: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;

    constructor() {
    }

    //Read settings
    readSettings() {
      return this.settings;
    }

    //update settings
    setSettings(request: MemoryCardSettingsModel) {
      this.settings = request;
    }
}
