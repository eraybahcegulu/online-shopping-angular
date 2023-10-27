import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCustomersComponent } from './viewCustomers.component';

describe('AppCustomersComponent', () => {
  let component: ViewCustomersComponent;
  let fixture: ComponentFixture<ViewCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCustomersComponent]
    });
    fixture = TestBed.createComponent(ViewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
