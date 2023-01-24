import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../models/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() player = new Player();
  @Output() incEvent = new EventEmitter<Player>();
}
