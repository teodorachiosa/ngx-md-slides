import { Component, HostBinding } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Slide } from '@shared/components/slide/slide';
import { Markdown } from '@shared/components/markdown/markdown';

@Component({
  selector: 'app-slide-group',
  imports: [Slide, Markdown, TranslatePipe],
  templateUrl: './slide-group.html',
  styleUrl: './slide-group.css',
})
export class SlideGroup {
  @HostBinding('attr.role')
  groupRole = 'presentation';
}
