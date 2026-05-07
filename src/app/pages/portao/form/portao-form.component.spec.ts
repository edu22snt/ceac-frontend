import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortaoFormComponent } from './portao-form.component';

describe('PortaoFormComponent', () => {
  let component: PortaoFormComponent;
  let fixture: ComponentFixture<PortaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortaoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
