import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DropDownListModel } from 'src/app/common/interfaces/common.interface';
import { ListRankingRequest, RankedUser } from 'src/app/interfaces/ranking-list.interface';
import { TrainingModeType } from 'src/app/interfaces/training.interface';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {
  rankingList: RankedUser[] = [];
  //game dropdownlist
  gameTypes: DropDownListModel[] = [];
  selectedGameType: number = 1;

  constructor(
    private statisticsService: StatisticsService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.initGameTypes();
    this.list();
  }

  // list ranking-list from server
  list() {
        // Initialize the serviceRequest object
        const serviceRequest: ListRankingRequest = {
          trainingModeType: this.selectedGameType
        };

    this.statisticsService.listRanking(serviceRequest).subscribe({
      next: rankingList => {
        this.rankingList = rankingList;
      },
      error: error => {
        this.toastr.error(this.translate.instant(error.error))
      }
    })
  }

  //init game types dropdown list
  initGameTypes() {
    for (const key in TrainingModeType) {
      if (!isNaN(Number(key))) {
        this.gameTypes.push({
          label: TrainingModeType[key],
          value: +key,
        });
      }
    }
  }

   //dropdown change detector
   onChangeType(event: any) {
    const value = event.value;
    this.selectedGameType = value;
    this.list();
  }
}
