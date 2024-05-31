import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { cityClick, init, setPreloadedCities } from './city.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  selectCity,
  selectCityAndPreloadedCities,
  selectPreloadedCities,
} from './city.selectors';
import { City } from 'src/app/weather/city';

@Injectable()
export class CityEffects {
  constructor(
    private _store: Store<{
      weather: { currentCity: any; preloadedCities: City[] };
    }>,
    private _action$: Actions,
    private _router: Router
  ) {}

  loadCities = createEffect(() =>
    this._action$.pipe(
      ofType(init),
      switchMap(() => {
        const preloadedCities =
          JSON.parse(localStorage.getItem('weather_history')) ?? [];
        return of(setPreloadedCities({ preloadedCities }));
      })
    )
  );

  loadCurrentCity = createEffect(
    () =>
      this._action$.pipe(
        ofType(cityClick),
        withLatestFrom(this._store.select(selectCity)),
        tap(([action, city]) => {
          this._router.navigate([`city`], {
            queryParams: {
              lat: city.lat,
              lon: city.lon,
              name: city.name,
              country: city.country,
            },
          });
        })
      ),
    { dispatch: false }
  );

  setCitySearchHistory = createEffect(
    () =>
      this._action$.pipe(
        ofType(cityClick),
        concatLatestFrom((action) =>
          this._store.select(selectCityAndPreloadedCities)
        ),
        switchMap(([action, state]) => {
        //   console.log(state);
          const { city, preloadedCities } = state;
          const searchHistory = [...preloadedCities];
          if (!searchHistory || searchHistory.length === 0) {
            const newSearchHistory = [];
            newSearchHistory.push(city);
            // console.log('returning early');
            return of(
              setPreloadedCities({ preloadedCities: newSearchHistory })
            );
          } else {
            const existingIndex = searchHistory.findIndex(
              (el) => el.name === city?.name && el.country === city?.country
            );
            if (existingIndex > -1) {
              // console.error(searchHistory);
              //   return;
              searchHistory.splice(existingIndex, 1);
            }

            if (searchHistory.length >= 3) {
              searchHistory.length = 3;
              searchHistory.pop();
            //   console.log('popped last one!', searchHistory);
            }

            // console.log('adding city!', city);
            searchHistory.unshift(city);
            return of(setPreloadedCities({ preloadedCities: searchHistory }));
          }
        })
      )
    // {dispatch: false}
  );

  persistCitySearchHistoryToLocalStorage = createEffect(
    () =>
      this._action$.pipe(
        ofType(setPreloadedCities),
        withLatestFrom(this._store.select(selectPreloadedCities)),
        tap(([action, preloadedCities]) => {
          localStorage.setItem(
            'weather_history',
            JSON.stringify(preloadedCities)
          );
        })
      ),
    { dispatch: false }
  );
}
