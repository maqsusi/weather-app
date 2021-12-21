import { Injectable } from '@angular/core';
import { Renderer2, RendererFactory2 } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private dark = false;
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  changeTheme() {
    this.dark = !this.dark;
    console.log('the theme is now ', this.dark);
    if (this.dark) {
      this.renderer.addClass(document.body, 'bg-dark');
    } else {
      this.renderer.removeClass(document.body, 'bg-dark');
    }
  }

  getTheme() {
    return this.dark;
  }
}
