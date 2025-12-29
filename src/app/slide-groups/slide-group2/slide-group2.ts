import { Component, HostBinding } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

import { Slide } from '@components/slide/slide';

@Component({
  selector: 'app-slide-group2',
  imports: [Slide, MarkdownComponent],
  templateUrl: './slide-group2.html',
  styleUrl: './slide-group2.css',
})
export class SlideGroup2 {
  @HostBinding('attr.role')
  groupRole = 'presentation';
}
