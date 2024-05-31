import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { WeatherService } from './services/weather.service';
import { Store } from '@ngrx/store';
import { init } from './store/city/city.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  constructor(private theme: ThemeService, private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(init());
  }

  getTheme() {
    return this.theme.getTheme();
  }
}
