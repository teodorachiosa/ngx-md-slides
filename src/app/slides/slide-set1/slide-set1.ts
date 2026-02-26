import { Component } from '@angular/core';

import { Slide } from '@shared/components/slide/slide';
import { SlidesContainer } from '@shared/components/slides-container/slides-container';
import { Markdown } from '@shared/components/markdown/markdown';
import { SlideSet } from '@shared/directives/slide-set/slide-set';

@Component({
  selector: 'app-slide-set1',
  imports: [SlidesContainer, Slide, Markdown],
  templateUrl: './slide-set1.html',
  styleUrl: './slide-set1.css',
})
export class SlideSet1 extends SlideSet {
  override setName = 'sets.set1.slides';
}
