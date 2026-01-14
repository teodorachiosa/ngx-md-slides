import { Component, HostBinding } from '@angular/core';

import { Slide } from '@components/slide/slide';

@Component({
  selector: 'app-slide-group',
  imports: [Slide],
  templateUrl: './slide-group.html',
  styleUrl: './slide-group.css',
})
export class SlideGroup {
  @HostBinding('attr.role')
  groupRole = 'presentation';
}
