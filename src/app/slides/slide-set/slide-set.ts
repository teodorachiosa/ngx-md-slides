import { Component } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

import { Slide } from '@shared/components/slide/slide';
import { Slides } from '@shared/components/slides/slides';
import { Markdown } from '@shared/components/markdown/markdown';
import { SlideGroup } from '@templates/slide-group/slide-group';

import { IconMenu } from '@shared/components/icons/icon-menu/icon-menu';

@Component({
  selector: 'app-slide-set',
  imports: [SlideGroup, Slides, Slide, TranslatePipe, Markdown, IconMenu],
  templateUrl: './slide-set.html',
  styleUrl: './slide-set.css',
})
export class SlideSet {
  components = [IconMenu];
}
