import { Component, OnInit } from '@angular/core';
import { Player } from '../models/Player';
import { scoreMap } from '../models/ScoreMap';
import { TennisScores } from '../models/TennisScores';

@Component({
  selector: 'app-tennis',
  templateUrl: './tennis.component.html',
  styleUrls: ['./tennis.component.scss'],
  preserveWhitespaces: true
})
export class TennisComponent implements OnInit {
  // Assume only ever 2 players
  players = [
    new Player(0, 'Player One'),
    new Player(1, 'Player Two')
  ]
  scores = new TennisScores();

  currentScore = ' 0 - 0 ';
  winMessage = '';

  ngOnInit(): void {
    this.players.forEach(player => {
      this.scores[player.id] = 0;
    })
  }

  /**
   * Called when a player scores.
   * 
   * Increments scoring and determines whether the game has been won by
   * the scoring player.
   * 
   * @param player 
   */
  onPointScore(player: Player) {
    // Game is over if win message set
    if(this.winMessage) {
      return;
    }

    // Check we aren't somehow trying to inc an invalid player
    if(isNaN(this.scores[player.id])) {
      throw new Error('Attempted to increment invalid player.');
    }

    // Increment score state, check score difference and if we are in deuce
    this.scores[player.id] += 1;
    const scoresDiff = Math.abs(this.scores[0] - this.scores[1]);
    const isDeuce = Object.values(this.scores).filter(x => x >= 3).length === 2;

    // If scoring player is still less than 3, display score
    if(this.scores[player.id] <= 3 && !isDeuce) {
      this.currentScore = `${scoreMap[this.scores[0]].padStart(2)} - ${scoreMap[this.scores[1]].padEnd(2)}`;
    }
    // If score diff is 0 and we are in deuce, display deuce
    else if (scoresDiff === 0 && isDeuce) {
      this.currentScore = 'Deuce';
    }
    // If score diff is 1 and we are in deuce, display adv.
    else if (scoresDiff === 1 && isDeuce) {
      this.currentScore = `${player.name} Advantage`;
    }
    // Otherwise, scoring player has won.
    else {
      this.winMessage = `${player.name} Wins!`;
    }
  }
}
