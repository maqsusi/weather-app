import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  FormGroup,
} from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { City } from './city';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { Store } from '@ngrx/store';
import { cityClick } from '../store/city/city.actions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cityForm = new UntypedFormControl();
  cities: City[] = [];
  options: string[] = ['One', 'Two', 'Three'];
  constructor(
    private fb: UntypedFormBuilder,
    private weatherService: WeatherService,
    private router: Router,
    private theme: ThemeService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.cityForm.valueChanges
      .pipe(
        debounceTime(500),
        startWith(''),
        filter((res) => res && res.length && res.length > 2),
        distinctUntilChanged(),
        switchMap((value) => {
          // console.log(value);
          return this.weatherService.getCitiesBySearchParameter(value);
        })
      )
      .subscribe((data: any) => {
        // console.log(data.list);
        if (data.list) {
          this.cities = data.list;
        } else {
          this.cities = [];
        }
      });
  }

  get getCityFormControl() {
    return this.cityForm.get('city');
  }

  logSelection(data: any, city: City) {
    // console.error(city);
    this._store.dispatch(
      cityClick({
        city: {
          lat: city.coord.lat,
          lon: city.coord.lon,
          name: city.name,
          country: city?.sys?.country,
        },
      })
    );
  }

  getTheme() {
    return this.theme.getTheme();
  }
}
