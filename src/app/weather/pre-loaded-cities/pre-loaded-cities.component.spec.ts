import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoadedCitiesComponent } from './pre-loaded-cities.component';

describe('PreLoadedCitiesComponent', () => {
  let component: PreLoadedCitiesComponent;
  let fixture: ComponentFixture<PreLoadedCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreLoadedCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoadedCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
