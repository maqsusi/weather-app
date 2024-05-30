import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreLoadedCitiesComponent } from './weather/pre-loaded-cities/pre-loaded-cities.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    children: [
      {
        path: '',
        component: PreLoadedCitiesComponent,
      },
      {
        path: 'city',
        component: WeatherDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
