import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderplaceGreentingComponent } from './orderplace-greenting.component';

describe('OrderplaceGreentingComponent', () => {
  let component: OrderplaceGreentingComponent;
  let fixture: ComponentFixture<OrderplaceGreentingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderplaceGreentingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderplaceGreentingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
