import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuCloseComponent } from './side-menu-close.component';

describe('SideMenuCloseComponent', () => {
  let component: SideMenuCloseComponent;
  let fixture: ComponentFixture<SideMenuCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
