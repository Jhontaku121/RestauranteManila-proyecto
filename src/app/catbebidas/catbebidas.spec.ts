import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catbebidas } from './catbebidas';

describe('Catbebidas', () => {
  let component: Catbebidas;
  let fixture: ComponentFixture<Catbebidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catbebidas],
    }).compileComponents();

    fixture = TestBed.createComponent(Catbebidas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
