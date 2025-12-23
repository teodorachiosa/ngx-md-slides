import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[extract]',
})
export class ExtractSlidesDirective implements AfterViewInit {
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef<HTMLElement>);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngAfterViewInit(): void {
    // if (!isPlatformBrowser(this.platformId)) {
    //   return;
    // }

    // this.extractSlides();
  }

  private extractSlides(): void {
    const slideGroup = this.elementRef.nativeElement;
    const slides = this.document.body.querySelector('app-slides');
    if (!slides) return;

    while (slideGroup.firstChild) {
      this.renderer.insertBefore(slides, slideGroup.firstChild, slideGroup);
    }

    setTimeout(() => {
      this.renderer.removeChild(slides, slideGroup);
    });
  }
}
