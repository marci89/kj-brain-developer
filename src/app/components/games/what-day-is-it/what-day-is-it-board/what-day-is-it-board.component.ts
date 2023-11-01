import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DayButtonModel, DayType, WhatDayIsItSettingsModel } from 'src/app/interfaces/games/what-day-is-it.interface';
import { CreateTrainingStatisticsRequest, TrainingModeType } from 'src/app/interfaces/training.interface';
import { WhatDayIsItService } from 'src/app/services/games/what-day-is-it.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-what-day-is-it-board',
  templateUrl: './what-day-is-it-board.component.html',
  styleUrls: ['./what-day-is-it-board.component.css']
})
export class WhatDayIsItBoardComponent implements OnInit {
  //is started or not
  isStarted: boolean = false;
  //is finished or not
  isFinished: boolean = false;
  //settings variable
  settings: WhatDayIsItSettingsModel = {} as WhatDayIsItSettingsModel;
  //message
  message: string = '';
  // check message is success or not
  isSuccesssMessage: boolean = false;
  //level
  level: number = 1;
  //opportunities before die
  opportunities: number = 1;
  //score
  score: number = 0;
  //best score
  bestScore: number = 0;

  // day buttons
  dayButtondModels: DayButtonModel[] = {} as DayButtonModel[];

  //choosed day
  myDay: number = 1;
  //Current day
  currentDay: number = 1;
  //Current day label
  currentDayLabel: string = "";
  //Target day
  targetDay: number = 1;
  //Target day label
  targetDayLabel: string = "";

  //Actual day add interval
  daysToAdd: number = 1;
  //Actual day add interval
  daysToAddLabel: string = "";

  //question
  question: string = "";

  //minimum add
  daysToAddMin: number = -1;
  //maximum add
  daysToAddMax: number = 1;


  constructor(
    private whatdayisitService: WhatDayIsItService,
    private statisticsService: StatisticsService,
    private trainingService: TrainingService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.settings = this.whatdayisitService.readSettings();
    if (Object.keys(this.settings).length === 0) {
      this.router.navigate(['practice']);
    }

    const buttons = this.whatdayisitService.dayButtonModels;
    if (buttons) {
      this.dayButtondModels = buttons;
    }

    this.init();
  }

  //Set labels
  init() {
    this.level = 1;
    this.opportunities = this.settings.opportunities;
    this.bestScore = this.trainingService?.dailyTrainingStatistics?.bestWhatDayIsItScore;
  }


  //create number
  createDay() {
    const min = 1;
    const max = 7;
    this.currentDay = Math.floor(Math.random() * (max - min + 1)) + min;
    this.daysToAdd = Math.floor(Math.random() * (this.daysToAddMax - this.daysToAddMin + 1)) + this.daysToAddMin;

    if (this.daysToAdd < 0) {
      const positive = Math.abs(this.daysToAdd);
      this.daysToAddLabel = positive.toString();
      this.question = "WhatDayWas";
    } else {
      this.daysToAddLabel = this.daysToAdd.toString();
      this.question = "WhatDayWillBe"
    }

    this.currentDayLabel = this.getDayByValue(this.currentDay);
    this.calculateDay(this.currentDay, this.daysToAdd);

    this.daysToAddMin += 6;
    this.daysToAddMax -= 6;
  }


  calculateDay(baseDay: DayType, daysToAdd: number) {
    try {
      if (baseDay in DayType) {
        let newDay = (baseDay + daysToAdd - 1) % 7;
        if (newDay < 0) {
          newDay += 7;
        }
        this.targetDay = newDay + 1;
        this.targetDayLabel = this.getDayByValue(this.targetDay);
      } else {
        throw new Error("Invalid day format. Please use a valid day of the week (e.g., 'Monday').");
      }
    } catch (error) {
      this.targetDay = DayType.Monday;
    }
  }

  private getDayByValue(value: number): string {
    return DayType[value].toLowerCase();
  }


  // button click
  check(id: number) {
    this.myDay = id;

    // if not the same
    if (this.myDay !== this.targetDay) {
      this.setMessage(false)
      this.opportunities--;

      //if ending
      if (this.opportunities === 0) {
        this.isFinished = true;
        this.finished();
      } else {
        this.nextLevel();
      }

      return;
    }

    //if the round finsihed successful
    if (this.myDay === this.targetDay) {

      this.setMessage(true)
      this.level++;
      this.score++;
      this.nextLevel();
    }
  }

  //set next level
  nextLevel() {
    setTimeout(() => {
      this.message = "";
      this.createDay();
    }, 4000);
  }

  //Start the game
  start() {
    this.isStarted = true;
    this.createDay();
  }

  //game finish
  finished() {
    this.isFinished = true;

    if (this.bestScore < this.score) {
      this.bestScore = this.score;
    }

    if (!this.settings.isPracticeMode) {
      this.createStatistics();
    }
  }

  //Restart the game
  restart(): void {
    this.score = 0;
    this.level = 1;
    this.opportunities = this.settings.opportunities;
    this.isFinished = false;
    this.message = "";
    this.daysToAddMin = 1;
    this.daysToAddMax = 1;
    this.start();
  }

  //if training mode
  continueTraining(): void {
    this.trainingService.startMemoryNumberGame();
  }

  // create statistics
  createStatistics() {
    // Initialize the serviceRequest object
    const serviceRequest: CreateTrainingStatisticsRequest = {
      score: this.score,
      trainingMode: TrainingModeType.WhatDayIsIt,
      soundTypeId: 0
    };

    this.statisticsService.createTraining(serviceRequest).subscribe({})
  }

  //message handler
  setMessage(isSucces: boolean) {
    this.isSuccesssMessage = isSucces;
    if (isSucces) {
      this.message = this.translate.instant('CorrectSolution');
    } else {
      this.message = this.translate.instant('WrongSolution');
    }
  }
}
