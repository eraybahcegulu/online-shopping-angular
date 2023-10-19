import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCustomersComponent } from './app-customers.component';

describe('AppCustomersComponent', () => {
  let component: AppCustomersComponent;
  let fixture: ComponentFixture<AppCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppCustomersComponent]
    });
    fixture = TestBed.createComponent(AppCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
