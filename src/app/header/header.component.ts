import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleText: string = 'Dark Mode';
  constructor(private theme: ThemeService) {}

  ngOnInit(): void {}

  toggleMode(data) {
    console.log('Mode toggled!', data);
    this.theme.changeTheme();
  }

  getTheme() {
    return this.theme.getTheme();
  }
}
