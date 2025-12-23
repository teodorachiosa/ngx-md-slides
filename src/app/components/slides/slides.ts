import {
  Component,
  HostBinding,
  HostListener,
  inject,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

import { OptionsService } from '@services/options.service';

@Component({
  selector: 'app-slides',
  imports: [],
  templateUrl: './slides.html',
  styleUrl: './slides.css',
})
export class Slides implements AfterViewInit {
  slideNumber = 0;
  optionsService = inject(OptionsService);
  allSlides?: NodeListOf<HTMLElement>;
  elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.allSlides = this.elementRef.nativeElement.querySelectorAll('app-slide');
    }
  }

  @HostBinding('style.maxWidth') get maxWidth() {
    return this.optionsService.getOptions().maxWidth &&
      !this.optionsService.getOptions().isFullscreen
      ? `${this.optionsService.getOptions().maxWidth}%`
      : '100%';
  }

  @HostBinding('style.padding') get padding() {
    return this.optionsService.getOptions().isFullscreen
      ? '0'
      : 'calc(var(--spacing) / 2) var(--spacing)';
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (
      !this.allSlides ||
      this.optionsService.getOptions().view === 'web' ||
      !this.optionsService.getOptions().isFullscreen ||
      !(event.key === 'ArrowRight' || event.key === 'ArrowLeft')
    )
      return;

    event.preventDefault();

    if (event.key === 'ArrowRight') {
      if (this.slideNumber < this.allSlides.length - 1) {
        this.slideNumber = this.slideNumber + 1;
      }
    }

    if (event.key === 'ArrowLeft') {
      if (this.slideNumber > 0) {
        this.slideNumber = this.slideNumber - 1;
      }
    }

    this.goToSlide(this.slideNumber);
  }

  goToSlide(count: number): void {
    if (!this.allSlides) return;
    const nextSlide = this.allSlides[count];
    if (nextSlide) {
      nextSlide.focus();
    }
  }
}
