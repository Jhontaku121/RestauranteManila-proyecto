import { TestBed } from '@angular/core/testing';

import { EnviarCarrito } from './enviar-carrito';

describe('EnviarCarrito', () => {
  let service: EnviarCarrito;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarCarrito);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
