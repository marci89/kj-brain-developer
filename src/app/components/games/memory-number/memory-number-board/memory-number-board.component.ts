import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MemoryNumberSettingsModel } from 'src/app/interfaces/games/memory-number.interface';
import { CreateTrainingStatisticsRequest, TrainingModeType } from 'src/app/interfaces/training.interface';
import { MemoryNumberService } from 'src/app/services/games/memory-number.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-memory-number-board',
  templateUrl: './memory-number-board.component.html',
  styleUrls: ['./memory-number-board.component.css']
})
export class MemoryNumberBoardComponent implements OnInit {
  //is started or not
  isStarted: boolean = false;
  //is finished or not
  isFinished: boolean = false;
  //settings variable
  settings: MemoryNumberSettingsModel = {} as MemoryNumberSettingsModel;
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

  // digit
  digit: number = 1;
  // targetnumber
  number: string = "";
  //my number
  myNumber: number | null = null;

  //visibles
  isNumberVisible: boolean = false;
  isMyNumberVisible: boolean = false;

  constructor(
    private memoryNumberService: MemoryNumberService,
    private statisticsService: StatisticsService,
    private trainingService: TrainingService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.settings = this.memoryNumberService.readSettings();
    if (Object.keys(this.settings).length === 0) {
      this.router.navigate(['practice']);
    }

    this.init();
  }

  //Set labels
  init() {
    this.digit = this.settings.startDigit;
    this.level = 1;
    this.opportunities = this.settings.opportunities;
    this.bestScore = this.trainingService?.dailyTrainingStatistics?.bestMemoryNumberScore;
  }


  //create number
  createNumber() {
    const interval = this.digit > 12 ? 7000 : 4000;
    this.number = "";
    this.myNumber = null;

    for (let i = 0; i < this.digit; i++) {
      const min = 1;
      const max = 9;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      this.number += randomNumber;
    }


    this.isNumberVisible = true;
    this.isMyNumberVisible = false;

    setTimeout(() => {
      this.isNumberVisible = false;
      this.isMyNumberVisible = true;
    }, interval);
  }


  // button click
  check() {
      const myNumberAsString: string = (this.myNumber ?? '').toString();
      // if not the same
      if (myNumberAsString !== this.number) {
        this.myNumber = null;
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
      if (myNumberAsString === this.number) {

        if(this.digit <= 25){
          this.digit++;
        }

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
      this.createNumber();
    }, 4000);
  }

  //Start the game
  start() {
    this.isStarted = true;
    this.createNumber();
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
    this.digit = this.settings.startDigit;
    this.isFinished = false;
    this.number = "";
    this.myNumber = null;
    this.message = "";
    this.start();
  }

  //if training mode
  continueTraining(): void {
    this.trainingService.startMathGame();
  }

  // create statistics
  createStatistics() {
    // Initialize the serviceRequest object
    const serviceRequest: CreateTrainingStatisticsRequest = {
      score: this.score,
      trainingMode: TrainingModeType.MemoryNumber,
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
