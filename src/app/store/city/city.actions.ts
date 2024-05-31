import { createAction, props } from '@ngrx/store';
import { City } from 'src/app/weather/city';

export const init = createAction('[City] Init');

export const cityClick = createAction(
  '[City] Click',
  props<{ city: { lat: string; lon: string; name: string; country: string } }>()
);

export const setPreloadedCities = createAction(
  '[City] Set Preloaded Cities',
  props<{ preloadedCities: City[] }>()
);
 