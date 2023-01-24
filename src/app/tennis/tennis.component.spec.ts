import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TennisComponent } from './tennis.component';

describe('TennisComponent', () => {
  let component: TennisComponent;
  let fixture: ComponentFixture<TennisComponent>;
  let playerElements: DebugElement[];
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TennisComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    playerElements = fixture.debugElement.queryAll(By.css('app-player'));
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only have 2 players', () => {
    expect(component.players.length === 2).toBeTruthy();
  });

  it('winMessage should be empty', () => {
    expect(component.winMessage === '').toBeTruthy();
  });

  it('players should match player names defined in component', () => {
    const playerElements = fixture.debugElement.queryAll(By.css('app-player'));
    const players = playerElements.map(x => x.properties['player']);
    expect(component.players[0].name === players[0].name && 
      component.players[1].name === players[1].name).toBeTruthy();
  });

  it('players should match player names defined in component', () => {
    const players = playerElements.map(x => x.properties['player']);
    expect(component.players[0].name === players[0].name && 
      component.players[1].name === players[1].name).toBeTruthy();
  });

  it('check player 1 can score', () => {
    mockScore(0, playerElements, component);
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML.split('-')[0].trim() === '15').toBeTruthy();
  });

  it('check player 2 can score', () => {
    mockScore(1, playerElements, component);
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML.split('-')[1].trim() === '15').toBeTruthy();
  });

  it('check deuce', () => {
    Array.from({length: 3}, () => {
      mockScore(0, playerElements, component);
      mockScore(1, playerElements, component);
    });
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Deuce');
  });

  it('check adv player 1', () => {
    Array.from({length: 3}, () => {
      mockScore(0, playerElements, component);
      mockScore(1, playerElements, component);
    });
    mockScore(0, playerElements, component);
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Player One Advantage');
  });

  it('check adv player 2', () => {
    Array.from({length: 3}, () => {
      mockScore(0, playerElements, component);
      mockScore(1, playerElements, component);
    });
    mockScore(1, playerElements, component);
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Player Two Advantage');
  });

  it('check player 1 wins - clear', () => {
    Array.from({length: 4}, () => {
      mockScore(0, playerElements, component);
    });
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Player One Wins!');
  });

  it('check player 2 wins - clear', () => {
    Array.from({length: 4}, () => {
      mockScore(1, playerElements, component);
    });
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Player Two Wins!');
  });

  it('check player 1 wins - after deuce', () => {
    Array.from({length: 3}, () => {
      mockScore(0, playerElements, component);
      mockScore(1, playerElements, component);
    });
    mockScore(0, playerElements, component);
    mockScore(0, playerElements, component);
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Player One Wins!');
  });

  it('check player 2 wins - after deuce', () => {
    Array.from({length: 3}, () => {
      mockScore(0, playerElements, component);
      mockScore(1, playerElements, component);
    });
    mockScore(1, playerElements, component);
    mockScore(1, playerElements, component);
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Player Two Wins!');
  });

  it('no change after win', () => {
    Array.from({length: 3}, () => {
      mockScore(0, playerElements, component);
      mockScore(1, playerElements, component);
    });
    mockScore(1, playerElements, component);
    mockScore(1, playerElements, component);
    mockScore(0, playerElements, component);
    fixture.detectChanges();
    expect(el.querySelector('p')?.innerHTML).toContain('Player Two Wins!');
  });
});

// helper functions
export function mockScore(playerId: number, playerElements: DebugElement[], component: TennisComponent) {
  playerElements[playerId].triggerEventHandler('incEvent', component.players[playerId]);
}