import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DropDownListModel } from 'src/app/common/interfaces/common.interface';
import { DifficultType } from 'src/app/interfaces/game.interface';
import { MemoryCardPictureType, MemoryCardSettingsModel, MemoryCardSizeType } from 'src/app/interfaces/memory-card.interface';
import { MemoryCardService } from 'src/app/services/memory-card.service';

@Component({
  selector: 'app-memory-card-settings',
  templateUrl: './memory-card-settings.component.html',
  styleUrls: ['./memory-card-settings.component.css']
})
export class MemoryCardSettingsComponent implements OnInit {

  //memory card picture dropdownlist
  memoryCardPictureTypes: DropDownListModel[] = [];
  selectedPictureType: number = 1;

  //size dropdownlist
  sizeTypes: DropDownListModel[] = [];
  selectedSizeType: number = 1;

  settings: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private memoryCardService: MemoryCardService,
  ) { }

  ngOnInit() {
    this.initMemoryCardPictureTypes();
    this.initSizeTypes();
    this.initSettingsModel();
  }

  //init memoryCardPictureTypes dropdown list
  initMemoryCardPictureTypes() {
    const memoryCardModels = this.memoryCardService.listMemoryCardPictureModel();

    memoryCardModels.forEach(element => {
      const label = this.translate.instant(element.name);
      this.memoryCardPictureTypes.push({
        label: element.name,
        value: element.id,
      });
    });
    }


  //init sizeTypes dropdown list
  initSizeTypes() {
    for (const key in MemoryCardSizeType) {
      if (!isNaN(Number(key))) {
        this.sizeTypes.push({
          label: MemoryCardSizeType[key],
          value: +key,
        });
      }
    }
  }

  //Settings model initalization
  initSettingsModel() {
    this.settings.isPracticeMode = true;
    this.settings.pictureType = MemoryCardPictureType.Animal;
    this.settings.sizeType = MemoryCardSizeType.Small;
    this.settings.difficultType = DifficultType.Easy;
  }

  //start learning
  start() {
    this.settings.pictureType = this.selectedPictureType;
    this.settings.sizeType = this.selectedSizeType;
    this.setDifficult(this.selectedSizeType);

    this.memoryCardService.setSettings(this.settings);
    this.router.navigate(['memory-card']);
  }


  //Routing depends on LearnModeType
  setDifficult(enumValue: MemoryCardSizeType) {

    const memoryCardPictureModel = this.memoryCardService.readMemoryCardPictureModelById(this.settings.pictureType);
    switch (enumValue) {
      case MemoryCardSizeType.Small:
        this.settings.difficultType = DifficultType.Easy;
        break;
      case MemoryCardSizeType.Medium:
        this.settings.difficultType = DifficultType.Medium;
        break;
      case MemoryCardSizeType.Large:
        this.settings.difficultType = DifficultType.Hard;
        break;
      default:
        this.settings.difficultType = DifficultType.Easy;
        break;
    }

    if (memoryCardPictureModel?.isNightmare && this.settings.difficultType === DifficultType.Hard)
      this.settings.difficultType = DifficultType.Nightmare;
  }
}
