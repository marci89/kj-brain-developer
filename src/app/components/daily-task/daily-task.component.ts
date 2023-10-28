import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  HasAnyTask: boolean = false;

  constructor(
    private statisticsService: StatisticsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private trainingService: TrainingService,
    private router: Router,
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
    if (this.dailyTrainingStatistics.memoryCard !== null || this.dailyTrainingStatistics.memoryCard !== undefined) {
      this.HasAnyTask = true;
    }

    if (this.dailyTrainingStatistics.memorySound !== null || this.dailyTrainingStatistics.memorySound !== undefined) {
      this.HasAnyTask = true;
    }

    if (this.dailyTrainingStatistics.whatDayIsIt !== null || this.dailyTrainingStatistics.whatDayIsIt !== undefined) {
      this.HasAnyTask = true;
    }

    if (this.dailyTrainingStatistics.memoryNumber !== null || this.dailyTrainingStatistics.memoryNumber !== undefined) {
      this.HasAnyTask = true;
    }

    if (this.dailyTrainingStatistics.math !== null || this.dailyTrainingStatistics.math !== undefined) {
      this.HasAnyTask = true;
    }

    if (this.dailyTrainingStatistics.memoryMatrix !== null || this.dailyTrainingStatistics.memoryMatrix !== undefined) {
      this.HasAnyTask = true;
    }
  }

  start() {
    debugger;
    if (this.dailyTrainingStatistics.memoryCard === null || this.dailyTrainingStatistics.memoryCard === undefined) {
      this.trainingService.startMemoryCardGame();
    }
    else if (this.dailyTrainingStatistics.memorySound === null || this.dailyTrainingStatistics.memorySound === undefined) {
      this.trainingService.startMemorySoundGame();
    }
    else if (this.dailyTrainingStatistics.whatDayIsIt === null || this.dailyTrainingStatistics.whatDayIsIt === undefined) {
      this.trainingService.startWhatDayIsItGame();
    }
    else if (this.dailyTrainingStatistics.memoryNumber === null || this.dailyTrainingStatistics.memoryNumber === undefined) {
      this.trainingService.startMemoryNumberGame();
    }
    else if (this.dailyTrainingStatistics.math === null || this.dailyTrainingStatistics.math === undefined) {
      this.trainingService.startMathGame();

    }
    else if (this.dailyTrainingStatistics.memoryMatrix === null || this.dailyTrainingStatistics.memoryMatrix === undefined) {
      this.trainingService.startMemoryMatrixGame();

    }
  }
}
