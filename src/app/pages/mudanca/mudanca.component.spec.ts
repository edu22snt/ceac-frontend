import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MudancaComponent } from './mudanca.component';

describe('MudancaComponent', () => {
  let component: MudancaComponent;
  let fixture: ComponentFixture<MudancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MudancaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MudancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
