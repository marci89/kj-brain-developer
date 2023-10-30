import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MemoryMatrixItem, MemoryMatrixSettingsModel } from 'src/app/interfaces/games/memory-matrix.interface';
import { CreateTrainingStatisticsRequest, TrainingModeType } from 'src/app/interfaces/training.interface';
import { MemoryMatrixService } from 'src/app/services/games/memory-matrix.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-memory-matrix-board',
  templateUrl: './memory-matrix-board.component.html',
  styleUrls: ['./memory-matrix-board.component.css']
})
export class MemoryMatrixBoardComponent implements OnInit {
  //is started or not
  isStarted: boolean = false;
  //is finished or not
  isFinished: boolean = false;
  //settings variable
  settings: MemoryMatrixSettingsModel = {} as MemoryMatrixSettingsModel;
  //message
  message: string = '';
  // check message is success or not
  isSuccesssMessage: boolean = false;
  //level
  level: number = 1;
  //opportunities before die
  opportunities: number = 2;
  //score
  score: number = 0;
  //best score
  bestScore: number = 0;

  //matrix css class
  matrixClass = "";
  //items
  matrixItems: MemoryMatrixItem[] = [];
  //items
  MyMatrixItemsId: number[] = [];

  // how many items you have to find
  foundableItemNumber: number = 0;
  // left number (how many foundableItemNumber left)
  left: number = 0;
  //freeze
  isFreeze: boolean = false;

  constructor(
    private memoryMatrixService: MemoryMatrixService,
    private statisticsService: StatisticsService,
    private trainingService: TrainingService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.settings = this.memoryMatrixService.readSettings();
    if (Object.keys(this.settings).length === 0) {
      this.router.navigate(['practice']);
    }

    this.init();
  }

  //Set labels
  init() {
    this.level = 1;
    this.opportunities = this.settings.opportunities;
    this.bestScore = this.trainingService?.dailyTrainingStatistics?.bestMemoryMatrixScore;
  }

  //create number
  createMatrix() {
    this.isFreeze = true;
    this.matrixItems = [];
    this.MyMatrixItemsId = []

    if (this.level <= 2) {
      this.createMatrixArray(9, 100);
      this.matrixClass = 'tiny-grid';
    } else if (this.level <= 6) {
      this.createMatrixArray(20, 80);
      this.matrixClass = 'small-grid';
    } else if (this.level <= 10) {
      this.createMatrixArray(25, 65);
      this.matrixClass = 'medium-grid';
    } else if (this.level <= 14) {
      this.createMatrixArray(30, 65);
      this.matrixClass = 'large-grid';
    } else if (this.level <= 24) {
      this.createMatrixArray(40, 65);
      this.matrixClass = 'huge-grid';
    } else if (this.level > 24) {
      this.createMatrixArray(63, 45);
      this.matrixClass = 'nightmare-grid';
    }

    this.setFoundableNumber();
    this.setmarkedItems();
    this.matrixItems = this.shuffleArray(this.matrixItems);

    setTimeout(() => {
      this.hidemarkedItems();
      this.isFreeze = false;
    }, 4000);
  }

  //Create matrix array
  createMatrixArray(number: number, size: number) {
    for (let i = 0; i < number; i++) {
      const item: MemoryMatrixItem = {
        id: i,
        size: size,
        isMarked: false,
        ismarkedVisibility: true
      };
      this.matrixItems.push(item);
    }
  }

  //mixing cards
  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  //set foundable number
  setFoundableNumber() {
    if (this.level <= 12) {
      this.foundableItemNumber = this.level;
      this.left = this.level;
    } else {
      this.foundableItemNumber = 12;
      this.left = 12;
    }
  }

  //marked items
  setmarkedItems() {
    for (let i = 0; i < this.foundableItemNumber; i++) {
      this.matrixItems[i].isMarked = true;
    }
  }

  //hide marked items
  hidemarkedItems() {
    for (let i = 0; i < this.matrixItems.length; i++) {
      this.matrixItems[i].ismarkedVisibility = false;
    }
  }

  // button click
  click(id: number) {
    if (!this.isFreeze) {
      const currentItem = this.matrixItems.find(x => x.id === id);
      const isContained = this.MyMatrixItemsId.find(x => x === id);
      if (isContained) {
        return;
      }
      this.MyMatrixItemsId.push(id);
      // if not the same
      if (!currentItem?.isMarked) {
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
      if (currentItem?.isMarked) {
        this.left--;
        currentItem.ismarkedVisibility = true;

        if (this.left === 0) {
          this.setMessage(true)
          this.level++;
          this.score++;
          this.nextLevel();
        }
      }
    }
  }

  //set next level
  nextLevel() {
    setTimeout(() => {
      this.message = "";
      this.createMatrix();
    }, 4000);
  }

  //Start the game
  start() {
    this.isStarted = true;
    this.createMatrix();
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
    this.matrixItems = [];
    this.MyMatrixItemsId = [];
    this.message = "";
    this.foundableItemNumber = 0;
    this.left = 0;
    this.start();
  }

  //if training mode
  endTraining(): void {
    this.router.navigate(['daily-task']);
  }

  // create statistics
  createStatistics() {
    // Initialize the serviceRequest object
    const serviceRequest: CreateTrainingStatisticsRequest = {
      score: this.score,
      trainingMode: TrainingModeType.MemoryMatrix,
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
