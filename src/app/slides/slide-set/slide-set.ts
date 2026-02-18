import { Component, inject, signal, OnInit, AfterViewInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Slide } from '@shared/components/slide/slide';
import { Slides } from '@shared/components/slides/slides';
import { Markdown } from '@shared/components/markdown/markdown';

import { IconMenu } from '@shared/components/icons/icon-menu/icon-menu';
import { IconSettings } from '@shared/components/icons/icon-settings/icon-settings';
import { AttachComponentService } from '@shared/services/attach-component.service';

@Component({
  selector: 'app-slide-set',
  imports: [Slides, Slide, Markdown],
  templateUrl: './slide-set.html',
  styleUrl: './slide-set.css',
})
export class SlideSet implements OnInit, AfterViewInit {
  attachComponentService = inject(AttachComponentService);
  translateService = inject(TranslateService);
  components = [IconMenu, IconSettings];
  content = signal<string[]>([]);

  ngOnInit(): void {
    this.translateService.stream('sets.set1.content').subscribe((data: Record<number, string>) => {
      const contentArray = Object.values(data);
      if (Array.isArray(contentArray)) {
        this.content.set(contentArray);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.components?.length) {
      this.attachComponents();

      this.translateService.onLangChange.subscribe(() => {
        this.attachComponents();
      });
    }
  }

  attachComponents(): void {
    this.components.forEach((component) => {
      this.attachComponentService.attachComponent(component);
    });
  }
}
