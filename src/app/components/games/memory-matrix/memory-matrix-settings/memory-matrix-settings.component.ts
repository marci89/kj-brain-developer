import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MemoryMatrixSettingsModel } from 'src/app/interfaces/games/memory-matrix.interface';
import { MemoryMatrixService } from 'src/app/services/games/memory-matrix.service';

@Component({
  selector: 'app-memory-matrix-settings',
  templateUrl: './memory-matrix-settings.component.html',
  styleUrls: ['./memory-matrix-settings.component.css']
})
export class MemoryMatrixSettingsComponent implements OnInit {
  opportunities: number = 1;

  settings: MemoryMatrixSettingsModel = {} as MemoryMatrixSettingsModel;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private memoryMatrixService: MemoryMatrixService,
  ) { }

  ngOnInit() {
    this.initSettingsModel();
  }



  //Settings model initalization
  initSettingsModel() {
    this.settings.isPracticeMode = true;
    this.settings.opportunities = 2;
  }

  //start game
  start() {
    this.settings.opportunities = this.opportunities;
    this.memoryMatrixService.setSettings(this.settings);
    this.router.navigate(['memory-matrix']);
  }
}

