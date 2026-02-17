import { AfterViewInit, Component, ElementRef, Input, Type, ViewChild } from '@angular/core';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-markdown',
  imports: [SafeHtmlPipe],
  templateUrl: './markdown.html',
})
export class Markdown implements AfterViewInit {
  @Input() data: string = '';
  @Input() components: Type<unknown>[] = [];
  @ViewChild('markdownContainer', { read: ElementRef }) markdownContainer!: ElementRef;

  ngAfterViewInit(): void {
    if (this.markdownContainer) {

      const elementsToReplaceWithComponents: NodeList =
        this.markdownContainer.nativeElement.querySelectorAll('.angular-component');

      if (elementsToReplaceWithComponents?.length) {
        console.log(elementsToReplaceWithComponents);
      }

      if (this.components?.length) {
        console.log(this.components);
      }
    }
  }
}
