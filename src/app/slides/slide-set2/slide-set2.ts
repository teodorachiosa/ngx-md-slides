import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Markdown } from '@shared/components/markdown/markdown';
import { Slide } from '@shared/components/slide/slide';
import { Slides } from '@shared/components/slides/slides';

@Component({
  selector: 'app-slide-set2',
  imports: [Slides, Slide, TranslatePipe, Markdown],
  templateUrl: './slide-set2.html',
  styleUrl: './slide-set2.css',
})
export class SlideSet2 {

}
