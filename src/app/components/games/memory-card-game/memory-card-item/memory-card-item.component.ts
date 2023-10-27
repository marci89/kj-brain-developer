import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemorycardItem } from 'src/app/interfaces/games/memory-card.interface';

@Component({
  selector: 'app-memory-card-item',
  templateUrl: './memory-card-item.component.html',
  styleUrls: ['./memory-card-item.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'hidden',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})

export class MemoryCardItemComponent {
  @Input() data!: MemorycardItem;

  @Output() cardClicked = new EventEmitter();
}
