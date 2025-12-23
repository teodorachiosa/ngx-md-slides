import { AfterViewInit, Component, HostBinding, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Options, View } from '@models/options.model';
import { OptionsService } from '@services/options.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, AfterViewInit {
  options: Options = {};
  optionsService = inject(OptionsService);

  view: View = 'slide';
  maxWidth: number = 100;
  isDarkMode: boolean = false;

  headerElement?: HTMLElement | null;

  @HostBinding('attr.role')
  role = 'banner';

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.headerElement = document.querySelector('[role="banner"]');

      document.addEventListener('fullscreenchange', () => {
        this.exitFullscreen();
      });
    }
  }

  updateView(event: Event): void {
    this.options['view'] = this.view;
    this.optionsService.setOptions(this.options);
  }

  updateMaxWidth(event: Event): void {
    this.options['maxWidth'] = this.maxWidth;
    this.optionsService.setOptions(this.options);
  }

  updateDarkMode(event: Event): void {
    this.options['isDarkMode'] = this.isDarkMode;
    this.optionsService.setOptions(this.options);
    this.setColorScheme(Boolean(event));
  }

  setColorScheme(isDarkMode: boolean): void {
    document.documentElement.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
  }

  present(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.headerElement?.classList.add('fullscreen');
      this.updateFullscreenStateAndUI(true);
    }
  }

  exitFullscreen(): void {
    if (document.fullscreenElement) return;

    this.headerElement?.classList.remove('fullscreen');
    this.updateFullscreenStateAndUI(false);
  }

  updateFullscreenStateAndUI(isFullscreen: boolean): void {
    this.options['isFullscreen'] = isFullscreen;
    this.optionsService.setOptions(this.options);

    let bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.style.overflow = isFullscreen ? 'hidden' : 'auto';
    }
  }
}
