import { Component, inject, signal, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Slide } from '@shared/components/slide/slide';
import { Slides } from '@shared/components/slides/slides';
import { Markdown } from '@shared/components/markdown/markdown';

import { IconMenu } from '@shared/components/icons/icon-menu/icon-menu';
import { IconSettings } from '@shared/components/icons/icon-settings/icon-settings';
import { AttachComponentService } from '@shared/services/attach-component.service';
import { TranslatedSlide } from '@shared/models/translation.model';

@Component({
  selector: 'app-slide-set',
  imports: [Slides, Slide, Markdown],
  templateUrl: './slide-set.html',
  styleUrl: './slide-set.css',
})
export class SlideSet implements OnInit, AfterViewInit, OnDestroy {
  attachComponentService = inject(AttachComponentService);
  translateService = inject(TranslateService);
  components = [IconMenu, IconSettings];
  content = signal<TranslatedSlide[]>([]);
  translationsSubscription = Subscription.EMPTY;
  languageChangeSubscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.translationsSubscription = this.translateService
      .stream('sets.set1.slides')
      .subscribe((data: Record<number, TranslatedSlide>) => {
        const contentArray = Object.values(data);

        if (Array.isArray(contentArray)) {
          this.content.set(contentArray);
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.components?.length) {
      setTimeout(() => {
        this.attachComponents();
      });

      this.languageChangeSubscription = this.translateService.onLangChange.subscribe(() => {
        setTimeout(() => {
          this.attachComponents();
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.translationsSubscription.unsubscribe();
    this.languageChangeSubscription.unsubscribe();
  }

  attachComponents(): void {
    this.components.forEach((component) => {
      this.attachComponentService.attachComponent(component);
    });
  }
}
