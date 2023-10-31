import { Injectable } from '@angular/core';
import { DayButtonModel, DayType, WhatDayIsItSettingsModel } from 'src/app/interfaces/games/what-day-is-it.interface';

@Injectable({
  providedIn: 'root'
})
export class WhatDayIsItService {

   //private settings model object
   private settings: WhatDayIsItSettingsModel = {} as WhatDayIsItSettingsModel;
   dayButtonModels: DayButtonModel[] = [];

   constructor() {
    this.initDayButtonModel();
   }

   //Read settings
   readSettings() {
     return this.settings;
   }

   //update settings
   setSettings(request: WhatDayIsItSettingsModel) {
     this.settings = request;
   }

    //Init day button models
  initDayButtonModel() {

    const monday: DayButtonModel = {
      id: DayType.Monday,
      name: "Monday",
    };

    const tuesday: DayButtonModel = {
      id: DayType.Tuesday,
      name: "Tuesday",
    };

    const wednesday: DayButtonModel = {
      id: DayType.Wednesday,
      name: "Wednesday",
    };

    const thursday: DayButtonModel = {
      id: DayType.Thursday,
      name: "Thursday",
    };

    const friday: DayButtonModel = {
      id: DayType.Friday,
      name: "Friday",
    };

    const saturday: DayButtonModel = {
      id: DayType.Saturday,
      name: "Saturday",
    };

    const sunday: DayButtonModel = {
      id: DayType.Sunday,
      name: "Sunday",
    };

    this.dayButtonModels.push(monday);
    this.dayButtonModels.push(tuesday);
    this.dayButtonModels.push(wednesday);
    this.dayButtonModels.push(thursday);
    this.dayButtonModels.push(friday);
    this.dayButtonModels.push(saturday);
    this.dayButtonModels.push(sunday);
  }
 }
