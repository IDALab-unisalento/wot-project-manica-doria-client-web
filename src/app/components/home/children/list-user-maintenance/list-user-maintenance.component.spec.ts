import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserMaintenanceComponent } from './list-user-maintenance.component';

describe('ListUserMaintenanceComponent', () => {
  let component: ListUserMaintenanceComponent;
  let fixture: ComponentFixture<ListUserMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
