import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial player id should be -1', () => {
    expect(component.player.id === -1).toBeTruthy();
  });

  it('initial player name should be Undefined', () => {
    expect(component.player.name === 'Undefined').toBeTruthy();
  });

  it('should emit inc score event on click', () => {
    spyOn(component.incEvent, 'emit');
 
    // trigger the click
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
 
    fixture.detectChanges();
 
    expect(component.incEvent.emit).toHaveBeenCalledWith(component.player);
 });
});
