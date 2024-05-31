import { createReducer, on } from '@ngrx/store';
import { City } from 'src/app/weather/city';
import { init, cityClick, setPreloadedCities } from './city.actions';

const cityState: { currentCity: any; preloadedCities: any[] } = {
  currentCity: null,
  preloadedCities: [],
};

export const cityReducer = createReducer(
  cityState,

  on(cityClick, (state, action) => {
    return {
      ...state,
      currentCity: action.city,
    };
  }),

  on(setPreloadedCities, (state, action) => {
    // console.error(action.preloadedCities);
    return {
      ...state,
      preloadedCities: action.preloadedCities,
    };
  })
);
