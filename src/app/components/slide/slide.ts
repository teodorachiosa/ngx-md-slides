import { Component, HostBinding, inject, Input } from '@angular/core';

import { StateService } from '@services/state.service';

@Component({
  selector: 'app-slide',
  imports: [],
  templateUrl: './slide.html',
  styleUrl: './slide.css',
})
export class Slide {
  stateService = inject(StateService);

  @HostBinding('attr.tabindex') get tabindex() {
    return this.stateService.getState().view === 'web' ||
      !this.stateService.getState().isFullscreen
      ? null
      : '-1';
  }

  @HostBinding('style.background')
  @Input()
  background: string = '';

  @HostBinding('style.padding')
  @Input()
  padding: string = '1.5em';

  @HostBinding('style.margin') get margin() {
    return this.stateService.getState().isFullscreen ? '0' : 'calc(var(--spacing2) / 2) 0';
  }

  @HostBinding('style.boxShadow') get boxShadow() {
    return this.stateService.getState().isFullscreen
      ? 'none'
      : '0 0 var(--shadow-spread) 0 var(--shadow-color)';
  }

  @HostBinding('class') get view() {
    return this.stateService.getState().view === 'web' ? 'web-view' : 'slide-view';
  }
}
