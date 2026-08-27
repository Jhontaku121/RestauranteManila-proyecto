import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catcomida } from './catcomida';

describe('Catcomida', () => {
  let component: Catcomida;
  let fixture: ComponentFixture<Catcomida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catcomida],
    }).compileComponents();

    fixture = TestBed.createComponent(Catcomida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
