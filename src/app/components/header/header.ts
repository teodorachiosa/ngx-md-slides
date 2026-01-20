import { AfterViewInit, Component, DOCUMENT, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { State, View } from '@models/state.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { StateService } from '@services/state.service';

const WIDTH_STEP = 10;
const WIDTH_MIN = 10;
const WIDTH_MAX = 100;

@Component({
  selector: 'app-header, [header]',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, AfterViewInit {
  state: State = {};
  stateService = inject(StateService);
  document = inject(DOCUMENT);
  translateService = inject(TranslateService);

  view?: View;
  maxWidth?: number;
  isDarkMode?: boolean;
  language: 'ro' | 'en' = 'en';

  rootElement?: HTMLElement | null;

  @HostListener('document:keydown', ['$event'])
  handlePresentKeys(event: KeyboardEvent) {
    if (this.stateService.getState().view === 'slide' && event.ctrlKey && event.key === 'F5') {
      event.preventDefault();
      this.present();
    }
  }

  ngOnInit(): void {
    this.view = this.stateService.getState().view;
    this.maxWidth = this.stateService.getState().maxWidth;
    this.isDarkMode = this.stateService.getState().isDarkMode;

    if (typeof window !== 'undefined') {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.rootElement = document.documentElement;

      if (this.view) {
        this.rootElement?.classList.add(`${this.view}-view`);
      }

      document.addEventListener('fullscreenchange', () => {
        this.exitFullscreen();
      });
    }
  }

  updateView(): void {
    this.state['view'] = this.view;
    this.stateService.setState(this.state);

    this.rootElement?.classList.remove(this.view === 'slide' ? 'web-view' : 'slide-view');
    this.rootElement?.classList.add(this.view === 'slide' ? 'slide-view' : 'web-view');
  }

  updateMaxWidth(): void {
    this.state['maxWidth'] = this.maxWidth;
    this.stateService.setState(this.state);
  }

  setColorScheme(): void {
    document.documentElement.style.setProperty('color-scheme', this.isDarkMode ? 'dark' : 'light');
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.updateDarkMode();
  }

  updateDarkMode(): void {
    this.state['isDarkMode'] = this.isDarkMode;
    this.stateService.setState(this.state);
    this.setColorScheme();
  }

  isDecreaseButtonDisabled():boolean {
    return !this.maxWidth || this.maxWidth < WIDTH_MIN + WIDTH_STEP;
  }

  isIncreaseButtonDisabled(): boolean {
    return !this.maxWidth || this.maxWidth > WIDTH_MAX - WIDTH_STEP;
  }

  decreaseWidth(): void {
    if (!this.maxWidth || this.isDecreaseButtonDisabled()) return;
    this.maxWidth = this.maxWidth - WIDTH_STEP;
    this.updateMaxWidth();
  }

  increaseWidth(): void {
    if (!this.maxWidth || this.isIncreaseButtonDisabled()) return;
    this.maxWidth = this.maxWidth + WIDTH_STEP;
    this.updateMaxWidth();
  }

  async present(): Promise<void> {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      this.rootElement?.classList.add('fullscreen');
      this.updateFullscreenStateAndUI(true);
      setTimeout(() => {
        this.document.querySelector<HTMLElement>('app-slide')?.focus();
      });
    }
  }

  exitFullscreen(): void {
    if (document.fullscreenElement) return;

    this.rootElement?.classList.remove('fullscreen');
    this.updateFullscreenStateAndUI(false);

    this.state['currentSlide'] = 0;
    this.stateService.setState(this.state);
  }

  updateFullscreenStateAndUI(isFullscreen: boolean): void {
    this.state['isFullscreen'] = isFullscreen;
    this.stateService.setState(this.state);
  }

  switchLanguage(language: 'ro' | 'en'): void {
    this.translateService.use(language);

    this.document.documentElement.setAttribute('lang', language);
  }
}
