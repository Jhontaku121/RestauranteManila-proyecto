import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInicio } from './info-inicio';

describe('InfoInicio', () => {
  let component: InfoInicio;
  let fixture: ComponentFixture<InfoInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoInicio],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoInicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
