import { Injectable } from '@angular/core';
import { MemoryMatrixSettingsModel } from 'src/app/interfaces/games/memory-matrix.interface';

@Injectable({
  providedIn: 'root'
})
export class MemoryMatrixService {

   //private settings model object
   private settings: MemoryMatrixSettingsModel = {} as MemoryMatrixSettingsModel;

   constructor() {
   }

   //Read settings
   readSettings() {
     return this.settings;
   }

   //update settings
   setSettings(request: MemoryMatrixSettingsModel) {
     this.settings = request;
   }
 }
