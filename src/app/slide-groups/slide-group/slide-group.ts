import { Component, HostBinding } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

import { Slide } from '@components/slide/slide';

@Component({
  selector: 'app-slide-group',
  imports: [Slide, MarkdownComponent],
  templateUrl: './slide-group.html',
  styleUrl: './slide-group.css',
})
export class SlideGroup {
  @HostBinding('attr.role')
  groupRole = 'presentation';
}
