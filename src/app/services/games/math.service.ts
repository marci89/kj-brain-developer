import { Injectable } from '@angular/core';
import { MathSettingsModel } from 'src/app/interfaces/games/math.interface';

@Injectable({
  providedIn: 'root'
})
export class MathService {

   //private settings model object
   private settings: MathSettingsModel = {} as MathSettingsModel;

   constructor() {
   }

   //Read settings
   readSettings() {
     return this.settings;
   }

   //update settings
   setSettings(request: MathSettingsModel) {
     this.settings = request;
   }
 }
