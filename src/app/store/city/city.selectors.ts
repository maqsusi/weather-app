import { createSelector } from '@ngrx/store';
import { City } from 'src/app/weather/city';

// export const selectCity = createSelector(
//   null,
//   (state: { currentCity: any; preloadedCities: City[] }) => {
//     return state.currentCity;
//   }
// );

export const selectCity = (state: {
  weather: { currentCity: any; preloadedCities: any[] };
}) => state.weather.currentCity;

export const selectPreloadedCities = (state: {
  weather: { currentCity: any; preloadedCities: any[] };
}) => {return state.weather.preloadedCities};

export const selectCityAndPreloadedCities = createSelector(
  selectCity,
  selectPreloadedCities,
  (city, preloadedCities) => {
    return {
      city,
      preloadedCities,
    };
  }
);
