import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterComponent } from './footer/footer.component';
import { PreLoadedCitiesComponent } from './weather/pre-loaded-cities/pre-loaded-cities.component';
import { PreLoadedCityComponent } from './weather/pre-loaded-cities/pre-loaded-city/pre-loaded-city.component';
import { StoreModule } from '@ngrx/store';
import { cityReducer } from './store/city/city.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CityEffects } from './store/city/city.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    WeatherDetailsComponent,
    FooterComponent,
    PreLoadedCitiesComponent,
    PreLoadedCityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    StoreModule.forRoot({ weather: cityReducer }),
    EffectsModule.forRoot([CityEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
