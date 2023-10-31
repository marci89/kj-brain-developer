import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { WhatDayIsItSettingsModel } from 'src/app/interfaces/games/what-day-is-it.interface';
import { WhatDayIsItService } from 'src/app/services/games/what-day-is-it.service';

@Component({
  selector: 'app-what-day-is-it-settings',
  templateUrl: './what-day-is-it-settings.component.html',
  styleUrls: ['./what-day-is-it-settings.component.css']
})
export class WhatDayIsItSettingsComponent implements OnInit {
  opportunities: number = 1;

  settings: WhatDayIsItSettingsModel = {} as WhatDayIsItSettingsModel;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private whatDayIsItService: WhatDayIsItService,
  ) { }

  ngOnInit() {
    this.initSettingsModel();
  }



  //Settings model initalization
  initSettingsModel() {
    this.settings.isPracticeMode = true;
    this.settings.opportunities = 1;
  }

  //start game
  start() {
    this.settings.opportunities = this.opportunities;

    this.whatDayIsItService.setSettings(this.settings);
    this.router.navigate(['what-day-is-it']);
  }
}

