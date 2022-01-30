import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoadedCityComponent } from './pre-loaded-city.component';

describe('PreLoadedCityComponent', () => {
  let component: PreLoadedCityComponent;
  let fixture: ComponentFixture<PreLoadedCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreLoadedCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoadedCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
