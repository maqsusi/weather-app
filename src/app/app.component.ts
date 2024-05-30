import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  constructor(private theme: ThemeService) {}

  ngOnInit(): void {}

  getTheme() {
    return this.theme.getTheme();
  }
}
