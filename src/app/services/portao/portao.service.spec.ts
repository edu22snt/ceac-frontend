import { TestBed } from '@angular/core/testing';
import { PortaoService } from './portao.service';

describe('PortaoService', () => {
  let service: PortaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
