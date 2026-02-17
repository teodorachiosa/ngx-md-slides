import { AfterViewInit, Component, ElementRef, Input, Type, ViewChild } from '@angular/core';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-markdown',
  imports: [SafeHtmlPipe],
  templateUrl: './markdown.html',
})
export class Markdown implements AfterViewInit {
  @Input() data: string = '';
  @Input() components!: Type<unknown>[];
  @ViewChild('markdownContainer', { read: ElementRef }) markdownContainer!: ElementRef;

  ngAfterViewInit(): void {
    if (this.markdownContainer) {

      const requiredAngularComponents: NodeList =
        this.markdownContainer.nativeElement.querySelectorAll('.angular-component');

      if (requiredAngularComponents.length) {
        console.log(requiredAngularComponents);
      }

      if (this.components && this.components.length) {
        console.log(this.components);
      }
    }
  }
}
