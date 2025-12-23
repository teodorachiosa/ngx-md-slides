import { Component } from '@angular/core';

import { MarkdownComponent } from 'ngx-markdown';

import { Slide } from '@components/slide/slide';
import { Slides } from '@components/slides/slides';
import { SlideGroup } from '@slide-groups/slide-group/slide-group';
import { SlideGroup2 } from '@slide-groups/slide-group2/slide-group2';

@Component({
  selector: 'app-slide-deck',
  imports: [MarkdownComponent, SlideGroup, SlideGroup2, Slides, Slide],
  templateUrl: './slide-deck.html',
  styleUrl: './slide-deck.css',
})
export class SlideDeck {

}
