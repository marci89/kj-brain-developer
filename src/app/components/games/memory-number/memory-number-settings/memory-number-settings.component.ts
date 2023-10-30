import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MemoryNumberSettingsModel } from 'src/app/interfaces/games/memory-number.interface';
import { MemoryNumberService } from 'src/app/services/games/memory-number.service';

@Component({
  selector: 'app-memory-number-settings',
  templateUrl: './memory-number-settings.component.html',
  styleUrls: ['./memory-number-settings.component.css']
})
export class MemoryNumberSettingsComponent implements OnInit {
  startDigit: number = 1;
  opportunities: number = 1;

  settings: MemoryNumberSettingsModel = {} as MemoryNumberSettingsModel;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private memoryNumberService: MemoryNumberService,
  ) { }

  ngOnInit() {
    this.initSettingsModel();
  }



  //Settings model initalization
  initSettingsModel() {
    this.settings.isPracticeMode = true;
    this.settings.startDigit = 1;
    this.settings.opportunities = 1;
  }

  //start game
  start() {
    this.settings.startDigit = this.startDigit;
    this.settings.opportunities = this.opportunities;

    this.memoryNumberService.setSettings(this.settings);
    this.router.navigate(['memory-number']);
  }
}

