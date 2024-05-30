import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Constants } from '../../constants';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  icon_url: any;
  cityName: string = '';
  cityCountry: string = '';
  coordSubscription: Subscription;
  weatherDetails: any;
  forecastList = [];
  lat: string;
  lon: string;
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.coordSubscription = this.route.queryParams.subscribe((data) => {
      // console.error(data);
      this.cityName = data.name;
      this.cityCountry = data.country;
      this.lat = data.lat;
      this.lon = data.lon;
      this.getWeather(data.lat, data.lon);
    });
  }

  ngOnDestroy(): void {
    this.coordSubscription.unsubscribe();
  }

  getWeather(lat: string, lon: string) {
    this.weatherService.getWeatherByLatAndLog(lat, lon).subscribe((data) => {
      // console.log(data);
      this.weatherDetails = data;
      this.weatherDetails.current.temp = Math.round(
        this.weatherDetails?.current?.temp
      );

      this.weatherDetails.offset = this.weatherDetails.timezone_offset / 3600;
      this.icon_url = `${Constants.ICON_URL}${this.weatherDetails.current.weather[0].icon}@2x.png`;
      this.getForecast(this.weatherDetails.daily);
      this.handleSearchHistory();
    });
  }

  getForecast(data: any) {
    // console.log(data);
    if (data && data.length > 0) {
      this.forecastList = data.map((el: any) => {
        const obj = {};
        obj['min'] = Math.round(el.temp.min);
        obj['max'] = Math.round(el.temp.max);
        obj['description'] = el.weather[0].description;
        obj['icon_url'] = `${Constants.ICON_URL}${el.weather[0].icon}@2x.png`;
        obj['date'] = new Date(el.dt * 1000);
        return obj;
      });

      // console.error(this.forecastList);
    }
  }

  getTheme() {
    return this.theme.getTheme();
  }

  handleSearchHistory() {
    let searchHistory: any[] = JSON.parse(
      localStorage.getItem('weather_history')
    );
    const searchObject = {};
    searchObject['city'] = this.cityName;
    searchObject['country'] = this.cityCountry;
    searchObject['lat'] = this.lat;
    searchObject['lon'] = this.lon;
    if (!searchHistory || searchHistory.length === 0) {
      const newSearchHistory = [];
      newSearchHistory.push(searchObject);
      localStorage.setItem('weather_history', JSON.stringify(newSearchHistory));
    } else {
      if (searchHistory.length >= 3) {
        searchHistory.length = 3;
        searchHistory.pop();
      }
      if (
        searchHistory.filter(
          (el) => el.city === this.cityName && el.country === this.cityCountry
        ).length > 0
      ) {
        console.error(searchHistory);
        return;
      }
      searchHistory.unshift(searchObject);
      localStorage.setItem('weather_history', JSON.stringify(searchHistory));
    }
  }
}
