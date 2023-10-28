import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DifficultType } from 'src/app/interfaces/games/game.interface';
import { MemorySoundModel, MemorySoundSettingsModel, Sound } from 'src/app/interfaces/games/memory-sound.interface';
import { CreateTrainingStatisticsRequest, TrainingModeType } from 'src/app/interfaces/training.interface';
import { MemorySoundService } from 'src/app/services/games/memory-sound.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-memory-sound-board',
  templateUrl: './memory-sound-board.component.html',
  styleUrls: ['./memory-sound-board.component.css']
})
export class MemorySoundBoardComponent implements OnInit {
  //is started or not
  isStarted: boolean = false;
  //is finished or not
  isFinished: boolean = false;
  //settings variable
  settings: MemorySoundSettingsModel = {} as MemorySoundSettingsModel;
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
  //freeze sounds when they are used
  isFreeze: boolean = false;

  // memory sound object model
  memorySoundModel: MemorySoundModel = {} as MemorySoundModel;
  //voices
  sounds: number[] = [];
  //my sounds
  mySounds: number[] = [];
  //buttons
  buttons: Sound[] = [];
  //Analize the sound order was correct or not, because if it was bad, not create new sound to sounds array.
  isSoundCorrect: boolean = true;
  //sound type label
  soundType: string = "";
  //current sound index
  currentSoundIndex: number = 0;
  //sound play interval
  interval: any;


  constructor(
    private memorySoundService: MemorySoundService,
    private statisticsService: StatisticsService,
    private trainingService: TrainingService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.settings = this.memorySoundService.readSettings();
    if (Object.keys(this.settings).length === 0) {
      this.router.navigate(['practice']);
    }

    const soundModel = this.memorySoundService.readMemorySoundModelById(this.settings.SoundType);
    if (soundModel) {
      this.memorySoundModel = soundModel;
    }

    this.init();
    this.createButtons();
    this.createSound();
  }

  //Set labels
  init() {
    this.soundType = this.memorySoundModel.name;
    this.level = 1;
    this.opportunities = this.settings.opportunities;
  }

  //Create sound buttons
  createButtons() {
    this.memorySoundModel?.voices?.forEach(sound => {
      const button: Sound = {
        id: sound.id,
        name: sound.name
      };
      this.buttons.push({ ...button });
    });

  }

  //create sound
  createSound() {
    this.mySounds = [];
    const randomNumber = Math.random() * (3);
    const soundId = Math.floor(randomNumber) + 1;
    this.sounds.push(soundId);
  }

  //Play the next sound from sounds array
  private playNextSound() {
    if (this.currentSoundIndex < this.sounds.length) {
      this.playSound(this.sounds[this.currentSoundIndex]);
      this.currentSoundIndex++;
    } else {
      this.isFreeze = false;
      clearInterval(this.interval);
    }
  }

  //play all sound from sounds array
  playSounds() {
    this.isFreeze = true;
    this.currentSoundIndex = 0;
    const interval = 2000;

    this.playNextSound();

    this.interval = setInterval(() => {
      this.playNextSound();
    }, interval);
  }

  //play one sound
  playSound(id: number) {
    const sound = new Audio('assets/voices/' + this.soundType.toLowerCase() + '/' + id + '.mp3');
    sound.play();
  }

  // click one of sound buttons
  clickSoundButton(id: number) {
    if (!this.isFreeze) {
      this.playSound(id);
      this.mySounds.push(id);
      const index = this.mySounds.length - 1;

      // if not the same
      if (this.mySounds[index] !== this.sounds[index]) {
        this.isSoundCorrect = false;
        this.mySounds = [];
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
      if (this.mySounds.length === this.sounds.length) {
        this.isSoundCorrect = true;
        this.setMessage(true)
        this.level++;
        this.score++;
        this.nextLevel();
      }
    }
  }

  //set next level
  nextLevel() {
    this.isFreeze = true;
    setTimeout(() => {
      this.message = "";

      if (this.isSoundCorrect) {
        this.createSound();
      }

      this.playSounds();
    }, 4000);
  }

  //Start the game
  start() {
    this.playSounds();
    this.isStarted = true;
  }

  //game finish
  finished() {
    this.isFinished = true;
    if (!this.settings.isPracticeMode) {
      this.createStatistics();
    }
  }

  //Restart the game
  restart(): void {
    this.isSoundCorrect = true;
    this.score = 0;
    this.level = 1;
    this.opportunities = this.settings.opportunities;
    this.isFinished = false;
    this.sounds = [];
    this.mySounds = [];
    this.message = "";
    this.createSound();
    this.start();
  }

  //if training mode
  trainingContinue(): void {
    this.trainingService.startMemorySoundGame();
  }

  // create statistics
  createStatistics() {
    // Initialize the serviceRequest object
    const serviceRequest: CreateTrainingStatisticsRequest = {
      score: this.score,
      trainingMode: TrainingModeType.MemorySound,
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
