import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DropDownListModel } from 'src/app/common/interfaces/common.interface';
import { MemorySoundSettingsModel } from 'src/app/interfaces/games/memory-sound.interface';
import { MemorySoundService } from 'src/app/services/games/memory-sound.service';

@Component({
  selector: 'app-memory-sound-settings',
  templateUrl: './memory-sound-settings.component.html',
  styleUrls: ['./memory-sound-settings.component.css']
})
export class MemorySoundSettingsComponent  implements OnInit {

  //memory sound dropdownlist
  memorySoundTypes: DropDownListModel[] = [];
  selectedSoundType: number = 1;
  opportunities: number = 2;



  settings: MemorySoundSettingsModel = {} as MemorySoundSettingsModel;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private memorySoundService: MemorySoundService,
  ) { }

  ngOnInit() {
    this.initMemorySoundTypes();
    this.initSettingsModel();
  }

  //init memorySoundTypes dropdown list
  initMemorySoundTypes() {
    const memorySoundModels = this.memorySoundService.listMemorySoundModel();

    memorySoundModels.forEach(element => {
      const label = this.translate.instant(element.name);
      this.memorySoundTypes.push({
        label: element.name,
        value: element.id,
      });
    });
  }


  //Settings model initalization
  initSettingsModel() {
    this.settings.isPracticeMode = true;
    this.settings.SoundType = 1;
    this.settings.opportunities = 2;
  }

  //start game
  start() {
    this.settings.SoundType = this.selectedSoundType;
    this.settings.opportunities = this.opportunities;

    this.memorySoundService.setSettings(this.settings);
    this.router.navigate(['memory-sound']);
  }
}
