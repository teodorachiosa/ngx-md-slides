import { Component, HostBinding } from '@angular/core';

import { Slide } from '@components/slide/slide';

@Component({
  selector: 'app-slide-group2',
  imports: [Slide],
  templateUrl: './slide-group2.html',
  styleUrl: './slide-group2.css',
})
export class SlideGroup2 {
  @HostBinding('attr.role')
  groupRole = 'presentation';
}
