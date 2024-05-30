import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCitiesBySearchParameter(query: string) {
    return this.http.get(
      `${Constants.API_URL}/find?q=${query}&appid=${Constants.API_KEY}`
    );
  }

  getWeatherById(id: string) {
    return this.http.get(
      `${Constants.API_URL}/weather?id=${id}&appid=${Constants.API_KEY}&units=metric`
    );
  }

  getWeatherByLatAndLog(lat: string, lon: string) {
    return this.http.get(
      `${Constants.API_URL}onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${Constants.API_KEY}&units=metric`
    );
  }
}
