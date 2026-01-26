import {
  Component,
  HostBinding,
  HostListener,
  inject,
  AfterViewInit,
  ElementRef,
  DOCUMENT,
  Renderer2,
} from '@angular/core';
import { State } from '@shared/models/state.model';
import { StateService } from '@shared/services/state.service';

@Component({
  selector: 'app-slides',
  imports: [],
  templateUrl: './slides.html',
  styleUrl: './slides.css',
})
export class Slides implements AfterViewInit {
  stateService = inject(StateService);
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  document = inject(DOCUMENT);
  allSlides?: NodeListOf<HTMLElement>;
  state: State = {};
  currentSlide: number = 0;

  ngAfterViewInit(): void {
    if (typeof this.document !== 'undefined') {
      this.allSlides = this.elementRef.nativeElement.querySelectorAll('app-slide');
    }

    this.assignSlideNumber();
  }

  @HostBinding('style.maxWidth') get maxWidth() {
    return this.stateService.getState().maxWidth && !this.stateService.getState().isFullscreen
      ? `${this.stateService.getState().maxWidth}%`
      : '100%';
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End', 'PageUp', 'PageDown'];

    if (
      !this.allSlides ||
      this.stateService.getState().view === 'web' ||
      !this.stateService.getState().isFullscreen ||
      !allowedKeys.includes(event.key)
    )
      return;

    event.preventDefault();
    this.currentSlide = this.stateService.getState().currentSlide ?? 0;

    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      if (this.currentSlide < this.allSlides.length - 1) {
        this.currentSlide = this.currentSlide + 1;
      }
    }

    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      if (this.currentSlide > 0) {
        this.currentSlide = this.currentSlide - 1;
      }
    }

    if (event.key === 'Home') {
      this.currentSlide = 0;
    }

    if (event.key === 'End') {
      this.currentSlide = this.allSlides.length - 1;
    }

    this.goToSlide(this.currentSlide);
  }

  goToSlide(slideNumber: number): void {
    if (!this.allSlides) return;

    const nextSlide = this.allSlides[slideNumber];
    if (nextSlide) {
      nextSlide.focus();
    }

    this.state['currentSlide'] = slideNumber;
    this.stateService.setState(this.state);
  }

  assignSlideNumber(): void {
    this.allSlides?.forEach((slide, index) => {
      if (typeof window === 'undefined') return;

      const span: HTMLElement = this.renderer.createElement('span');
      this.renderer.addClass(span, 'slide-number');
      this.renderer.setAttribute(span, 'aria-hidden', 'true');
      const text = this.renderer.createText(`${index + 1}`);
      this.renderer.appendChild(span, text);
      this.renderer.appendChild(slide, span);
    });
  }
}
