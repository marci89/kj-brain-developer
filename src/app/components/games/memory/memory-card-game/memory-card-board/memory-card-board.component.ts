import { Component, OnInit } from '@angular/core';
import { MemoryCardPictureType, MemoryCardSettingsModel, MemoryCardSizeType, MemorycardItem } from 'src/app/interfaces/memory/memory-card.interface';
import { MemoryCardService } from 'src/app/services/memory/memory-card.service';

@Component({
  selector: 'app-memory-card-board',
  templateUrl: './memory-card-board.component.html',
  styleUrls: ['./memory-card-board.component.css']
})
export class MemoryCardBoardComponent implements OnInit {

  //is started or not
  isStarted: boolean = false;
  //is finished or not
  isFinished: boolean = false;
  //settings variable
  settings: MemoryCardSettingsModel = {} as MemoryCardSettingsModel;
  //card images
  cardImages: string[] = [];
  //cards
  cards: MemorycardItem[] = [];
  //flipped cards
  flippedCards: MemorycardItem[] = [];
  //matched count
  matchedCount = 0;
  //moves count
  movesCount = 0;

  constructor(private memoryCardService: MemoryCardService) { }

  ngOnInit(): void {
    this.settings = this.memoryCardService.readSettings();
  }

  //Start the game
  start() {
    this.setupCards();
    this.isStarted = true;
  }
  //mixing cards
  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  // set card images
  setCardImages() {
    const pictureTypeValue = this.settings.pictureType;
    const pictureTypeKey = MemoryCardPictureType[pictureTypeValue];
    const folderName = pictureTypeKey?.toLocaleLowerCase();
    const cardNumber = this.setCardNumber(this.settings.sizeType);

    if (folderName !== null && folderName !== undefined) {
      for (let i = 1; i <= cardNumber; i++) {
        this.cardImages.push(`${folderName}/${i}.png`);
      }
    }
  }

  //how many card pairs will be
  setCardNumber(enumValue: MemoryCardSizeType): number {
    switch (enumValue) {
      case MemoryCardSizeType.Small:
        return 5;
      case MemoryCardSizeType.Medium:
        return 10;
      case MemoryCardSizeType.Large:
        return 15;
      default:
        return 5;
    }
  }

  //setup
  setupCards(): void {

    this.setCardImages();

    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: MemorycardItem = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });

    this.cards = this.shuffleArray(this.cards);
  }

  //card click
  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  //check match
  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          this.isFinished = true;
        }
      }
      this.movesCount++;
    }, 1000);
  }

  //Restart the game
  restart(): void {
    this.matchedCount = 0;
    this.movesCount = 0;
    this.isFinished = false;
    this.start();
  }
}
