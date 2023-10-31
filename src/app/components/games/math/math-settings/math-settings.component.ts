import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MathSettingsModel } from 'src/app/interfaces/games/math.interface';
import { MathService } from 'src/app/services/games/math.service';

@Component({
  selector: 'app-math-settings',
  templateUrl: './math-settings.component.html',
  styleUrls: ['./math-settings.component.css']
})
export class MathSettingsComponent implements OnInit {
  opportunities: number = 1;

  settings: MathSettingsModel = {} as MathSettingsModel;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private mathService: MathService,
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

    this.mathService.setSettings(this.settings);
    this.router.navigate(['math']);
  }
}


