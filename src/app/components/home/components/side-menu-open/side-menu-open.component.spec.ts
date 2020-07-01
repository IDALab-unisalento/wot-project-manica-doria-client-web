import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuOpenComponent } from './side-menu-open.component';

describe('SideMenuOpenComponent', () => {
  let component: SideMenuOpenComponent;
  let fixture: ComponentFixture<SideMenuOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
