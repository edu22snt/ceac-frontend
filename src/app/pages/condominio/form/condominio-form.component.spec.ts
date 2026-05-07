import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondominioFormComponent } from './condominio-form.component';


describe('CondominioFormComponent', () => {
  let component: CondominioFormComponent;
  let fixture: ComponentFixture<CondominioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondominioFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondominioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
