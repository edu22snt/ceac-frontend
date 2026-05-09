import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MudancaFormComponent } from './mudanca-form.component';

describe('MudancaFormComponent', () => {
  let component: MudancaFormComponent;
  let fixture: ComponentFixture<MudancaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MudancaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MudancaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
