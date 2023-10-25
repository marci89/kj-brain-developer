import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownListModel } from 'src/app/common/interfaces/common.interface';
import { DifficultType } from 'src/app/interfaces/game.interface';
import { MemoryCardPictureType, MemoryCardSettingsModel, MemoryCardSizeType } from 'src/app/interfaces/memory/memory-card.interface';
import { MemoryCardService } from 'src/app/services/memory/memory-card.service';

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

  model: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;

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
    for (const key in MemoryCardPictureType) {
      if (!isNaN(Number(key))) {
        this.memoryCardPictureTypes.push({
          label: MemoryCardPictureType[key],
          value: +key,
        });
      }
    }
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
    this.model.isPracticeMode = true;
    this.model.pictureType = MemoryCardPictureType.Animal;
    this.model.sizeType = MemoryCardSizeType.Small;
    this.model.difficultType = DifficultType.Easy;
  }

  //start learning
  start() {
    this.model.pictureType = this.selectedPictureType;
    this.model.sizeType = this.selectedSizeType;
    this.setDifficult(this.selectedSizeType);

    this.memoryCardService.setSettings(this.model);
    this.router.navigate(['memory-card']);
  }


  //Routing depends on LearnModeType
  setDifficult(enumValue: MemoryCardSizeType) {

    switch (enumValue) {
      case MemoryCardSizeType.Small:
        this.model.difficultType = DifficultType.Easy;
        break;
      case MemoryCardSizeType.Medium:
        this.model.difficultType = DifficultType.Medium;
        break;
      case MemoryCardSizeType.Large:
        this.model.difficultType = DifficultType.Hard;
        break;
      default:
        this.model.difficultType = DifficultType.Easy;
        break;
    }

    if (this.selectedPictureType > 3 && this.model.difficultType === DifficultType.Hard)
      this.model.difficultType = DifficultType.Hell;
  }
}
