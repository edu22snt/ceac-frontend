import { TestBed } from '@angular/core/testing';
import { MudancaService } from './mudanca.service';


describe('MudancaService', () => {
  let service: MudancaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MudancaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
