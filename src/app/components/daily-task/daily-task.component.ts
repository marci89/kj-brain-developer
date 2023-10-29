import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DailyTrainingStatistics } from 'src/app/interfaces/training.interface';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css']
})
export class DailyTaskComponent implements OnInit {
  dailyTrainingStatistics: DailyTrainingStatistics = {} as DailyTrainingStatistics;

  //Are there any tasks or not
  hasAnyTask: boolean = false;
  //Are there any tasks or not
  isServerResponseFinished: boolean = false;

  //has games
  memoryCardGame: string = "";
  memorySoundGame: string = "";
  whatDayIsItGame: string = "";
  memoryNumberGame: string = "";
  mathGame: string = "";
  memoryMatrixGame: string = "";

  constructor(
    private statisticsService: StatisticsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.readDailyTraining();
  }

  // read daily training statics
  readDailyTraining() {
    this.statisticsService.readDailyTraining().subscribe({
      next: dailyTraining => {
        this.dailyTrainingStatistics = dailyTraining;
        console.log(dailyTraining)
        this.trainingService.dailyTrainingStatistics = dailyTraining;
        this.checkTasks();
      },
      error: error => {
        this.toastr.error(this.translate.instant(error.error))
      }
    })
  }

  checkTasks() {
    if (this.isNullOrUndefined(this.dailyTrainingStatistics.memoryCard)) {
      this.hasAnyTask = true;
      this.memoryCardGame = this.translate.instant('MemoryCard');
    }
    if (this.isNullOrUndefined(this.dailyTrainingStatistics.memorySound)) {
      this.hasAnyTask = true;
      this.memorySoundGame = this.translate.instant('MemorySound');
    }
    if (this.isNullOrUndefined(this.dailyTrainingStatistics.whatDayIsIt)) {
      this.hasAnyTask = true;
      this.whatDayIsItGame = this.translate.instant('WhatDayIsIt');
    }
    if (this.isNullOrUndefined(this.dailyTrainingStatistics.memoryNumber)) {
      this.hasAnyTask = true;
      this.memoryNumberGame = this.translate.instant('MemoryNumber');
    }
    if (this.isNullOrUndefined(this.dailyTrainingStatistics.math)) {
      this.hasAnyTask = true;
      this.mathGame = this.translate.instant('Math');
    }
    if (this.isNullOrUndefined(this.dailyTrainingStatistics.memoryMatrix)) {
      this.hasAnyTask = true;
      this.memoryMatrixGame = this.translate.instant('MemoryMatrix');
    }

    this.isServerResponseFinished = true;
  }

  //start game
  start() {
    if (this.isNullOrUndefined(this.dailyTrainingStatistics.memoryCard)) {
      this.trainingService.startMemoryCardGame();
    }
    else if (this.isNullOrUndefined(this.dailyTrainingStatistics.memorySound)) {
      this.trainingService.startMemorySoundGame();
    }
    else if (this.isNullOrUndefined(this.dailyTrainingStatistics.whatDayIsIt)) {
      this.trainingService.startWhatDayIsItGame();
    }
    else if (this.isNullOrUndefined(this.dailyTrainingStatistics.memoryNumber)) {
      this.trainingService.startMemoryNumberGame();
    }
    else if (this.isNullOrUndefined(this.dailyTrainingStatistics.math)) {
      this.trainingService.startMathGame();

    }
    else if (this.isNullOrUndefined(this.dailyTrainingStatistics.memoryMatrix)) {
      this.trainingService.startMemoryMatrixGame();

    }
  }

  //check null or undefined
  private isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }
}
