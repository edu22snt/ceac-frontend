import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoradorFormComponent } from './morador-form.component';

describe('MoradorFormComponent', () => {
  let component: MoradorFormComponent;
  let fixture: ComponentFixture<MoradorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoradorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoradorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
