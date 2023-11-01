import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MathSettingsModel, MathType } from 'src/app/interfaces/games/math.interface';
import { CreateTrainingStatisticsRequest, TrainingModeType } from 'src/app/interfaces/training.interface';
import { MathService } from 'src/app/services/games/math.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-math-board',
  templateUrl: './math-board.component.html',
  styleUrls: ['./math-board.component.css']
})
export class MathBoardComponent implements OnInit {

  //is started or not
  isStarted: boolean = false;
  //is finished or not
  isFinished: boolean = false;
  //settings variable
  settings: MathSettingsModel = {} as MathSettingsModel;
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

  //first number
  a: number = 1;
  //second number
  b: number = 1;
  //result number
  result: number = 1;
  //my number
  myNumber: number | null = null;
  //operation sign
  operationSign: string = "";

  //max Summation value
  summationMaxValue: number = 10;
  //max Subtraction value
  subtractionMaxValue: number = 10;
  //max Division value
  divisionMaxValue: number = 100;
  //max Multiplication value
  multiplicationMaxValue: number = 10;





  constructor(
    private mathService: MathService,
    private statisticsService: StatisticsService,
    private trainingService: TrainingService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.settings = this.mathService.readSettings();
    if (Object.keys(this.settings).length === 0) {
      this.router.navigate(['practice']);
    }
    this.init();
  }

  //Set labels
  init() {
    this.level = 1;
    this.opportunities = this.settings.opportunities;
    this.bestScore = this.trainingService?.dailyTrainingStatistics?.bestMathScore;
  }


  //create number
  createMathExample() {
    const min = 1;
    const max = 4;

    const operation = Math.floor(Math.random() * (max - min + 1)) + min;

    if (MathType.Summation === operation) {
      this.createSummation();
    }
    if (MathType.Subtraction === operation) {
      this.createSubtraction();
    }

    if (MathType.Division === operation) {
      this.createDivision();
    }
    if (MathType.Multiplication === operation) {
      this.createMultiplication();
    }


    this.summationMaxValue += 20;
    this.subtractionMaxValue += 20;
    this.divisionMaxValue += 20;
    this.multiplicationMaxValue += 4;
  }

  createSummation() {
    this.a = Math.floor(Math.random() * (this.summationMaxValue - 1 + 1)) + 1;
    this.b = Math.floor(Math.random() * (this.summationMaxValue - 1 + 1)) + 1;
    this.result = this.a + this.b;
    this.operationSign = "+";
  }

  createSubtraction() {
    this.a = Math.floor(Math.random() * (this.subtractionMaxValue - 1 + 1)) + 1;
    this.b = Math.floor(Math.random() * (this.subtractionMaxValue - 1 + 1)) + 1;
    this.result = this.a - this.b;
    this.operationSign = "-";
  }

  createDivision() {
    do {
      this.b = Math.floor(Math.random() * (this.divisionMaxValue - 1)) + 1;
      this.a = this.b * Math.floor(Math.random() * (this.divisionMaxValue / this.b));
    } while (this.a === this.b || this.a === 0 || this.a % this.b !== 0);

    this.result = this.a / this.b;
    this.operationSign = "/";
  }

  createMultiplication() {
    this.a = Math.floor(Math.random() * (this.multiplicationMaxValue - 1 + 1)) + 1;

    if(this.level <= 20){
      this.b = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    } else if (this.level > 20){
      this.b = Math.floor(Math.random() * ((this.multiplicationMaxValue/2) - 1 + 1)) + 1;
    }

    this.result = this.a * this.b;
    this.operationSign = "*";
  }


  onEnterPressed(event: any) {
    if (event.keyCode === 13) {
      if(this.myNumber === null || this.myNumber === undefined){
        return;
      }
      this.check();
    }
  }

  // button click
  check() {

    // if not the same
    if (this.myNumber !== this.result) {
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
    if (this.myNumber === this.result) {

      this.setMessage(true)
      this.level++;
      this.score++;
      this.nextLevel();
    }
  }

  //set next level
  nextLevel() {
    this.myNumber = null;
    setTimeout(() => {
      this.message = "";
      this.createMathExample();
    }, 1500);
  }

  //Start the game
  start() {
    this.isStarted = true;
    this.createMathExample();
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
    this.summationMaxValue = 10;
    this.subtractionMaxValue = 10;
    this.divisionMaxValue = 100;
    this.multiplicationMaxValue = 10;
    this.myNumber = null;

    this.start();
  }

  //if training mode
  continueTraining(): void {
    this.trainingService.startMemoryMatrixGame();
  }

  // create statistics
  createStatistics() {
    // Initialize the serviceRequest object
    const serviceRequest: CreateTrainingStatisticsRequest = {
      score: this.score,
      trainingMode: TrainingModeType.Math,
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
