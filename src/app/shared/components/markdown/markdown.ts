import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-markdown',
  imports: [],
  templateUrl: './markdown.html'
})
export class Markdown {
  @Input() data: string = '';
}
