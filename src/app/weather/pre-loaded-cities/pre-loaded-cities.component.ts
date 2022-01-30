import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-loaded-cities',
  templateUrl: './pre-loaded-cities.component.html',
  styleUrls: ['./pre-loaded-cities.component.css'],
})
export class PreLoadedCitiesComponent implements OnInit {
  searchHistory: any[] = [];
  constructor(private router: Router) {
    this.searchHistory = JSON.parse(localStorage.getItem('weather_history'));
    // console.log(this.searchHistory);
  }

  ngOnInit(): void {}

  onCityClick(cityDetails: any) {
    // console.error(city);
    this.router.navigate([`city`], {
      queryParams: {
        lat: cityDetails.lat,
        lon: cityDetails.lon,
        name: cityDetails.city,
        country: cityDetails.country,
      },
    });
  }
}
