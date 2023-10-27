import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DropDownListModel } from 'src/app/common/interfaces/common.interface';
import { DifficultType } from 'src/app/interfaces/games/game.interface';
import { MemoryCardPictureType, MemoryCardSettingsModel, MemoryCardSizeType } from 'src/app/interfaces/games/memory-card.interface';
import { MemoryCardService } from 'src/app/services/games/memory-card.service';

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

  //Check hard cards
  isHardLabel(id: number) {
    const picturemodel = this.memoryCardService.readMemoryCardPictureModelById(id);
    if (picturemodel) {
      return picturemodel.isNightmare ? "HardLabel" : "";
    }
    return "";
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

  //start game
  start() {
    this.settings.pictureType = this.selectedPictureType;
    this.settings.sizeType = this.selectedSizeType;
    this.settings.difficultType = this.memoryCardService.setDifficult(this.selectedSizeType);

    this.memoryCardService.setSettings(this.settings);
    this.router.navigate(['memory-card']);
  }
}
