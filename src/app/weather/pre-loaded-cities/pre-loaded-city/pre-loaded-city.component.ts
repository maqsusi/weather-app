import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants';
import { ThemeService } from 'src/app/services/theme.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-pre-loaded-city',
  templateUrl: './pre-loaded-city.component.html',
  styleUrls: ['./pre-loaded-city.component.css'],
})
export class PreLoadedCityComponent implements OnInit {
  @Input('cityDetails') cityDetails: any;
  weatherDetails: any = {};
  constructor(
    private weatherService: WeatherService,
    private theme: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.cityDetails);
    this.getWeather(this.cityDetails.lat, this.cityDetails.lon);
  }

  getWeather(lat: string, lon: string) {
    this.weatherService.getWeatherByLatAndLog(lat, lon).subscribe((data) => {
      // console.log(data);
      this.weatherDetails['temp'] = Math.round(data['current']['temp']);
      this.weatherDetails['city'] = this.cityDetails['city'];
      this.weatherDetails['country'] = this.cityDetails['country'];
      this.weatherDetails['main'] = data['current']['weather'][0]['main'];
      this.weatherDetails['icon'] = data['current']['weather'][0]['icon'];
      this.weatherDetails[
        'icon_url'
      ] = `${Constants.ICON_URL}${data['current']['weather'][0]['icon']}@2x.png`;
      // console.error(this.weatherDetails);
    });
  }

  getTheme() {
    return this.theme.getTheme();
  }
}
