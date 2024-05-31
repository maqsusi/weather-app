import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cityClick } from 'src/app/store/city/city.actions';
import { selectPreloadedCities } from 'src/app/store/city/city.selectors';

@Component({
  selector: 'app-pre-loaded-cities',
  templateUrl: './pre-loaded-cities.component.html',
  styleUrls: ['./pre-loaded-cities.component.css'],
})
export class PreLoadedCitiesComponent implements OnInit {
  searchHistory$: Observable<any[]>;
  constructor(private router: Router, private _store: Store) {
    this.searchHistory$ = this._store.select(selectPreloadedCities);
    // console.log(this.searchHistory);
  }

  ngOnInit(): void {}

  onCityClick(cityDetails: {
    lat: string;
    lon: string;
    name: string;
    country: string;
  }) {
    // console.error(city);
    this._store.dispatch(
      cityClick({ city: { ...cityDetails } })
    );
  }
}
