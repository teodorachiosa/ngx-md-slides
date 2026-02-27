import { inject, signal, OnInit, AfterViewInit, OnDestroy, Directive, WritableSignal } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { IconMenu } from '@shared/components/icons/icon-menu/icon-menu';
import { IconSettings } from '@shared/components/icons/icon-settings/icon-settings';
import { AttachComponentService } from '@shared/services/attach-component.service';
import { TranslatedSlide } from '@shared/models/translation.model';

@Directive({
  selector: '[slide-set]',
})
export class SlideSet implements OnInit, AfterViewInit, OnDestroy {
  setName = '';
  attachComponentService = inject(AttachComponentService);
  translateService = inject(TranslateService);
  components = [IconMenu, IconSettings];
  slidesContent = signal<TranslatedSlide[]>([]);
  baseTranslation: WritableSignal<TranslatedSlide[]> = signal<TranslatedSlide[]>([]);
  translationsSubscription = Subscription.EMPTY;
  languageChangeSubscription = Subscription.EMPTY;

  ngOnInit(): void {
    const baseTranslationRaw = this.translateService.instant(this.setName);
    if(typeof baseTranslationRaw === 'string' && baseTranslationRaw === this.setName) {
      return;
    }

    this.baseTranslation.set(baseTranslationRaw);
    this.translationsSubscription = this.translateService
      .stream(this.setName)
      .subscribe((newTranslationObject: Record<number, TranslatedSlide>) => {
        const newTranslation = Object.values(newTranslationObject);

        if (Array.isArray(newTranslation)) {
          const mergedContent = this.mergeTranslations(this.baseTranslation(), newTranslation);
          this.slidesContent.set(mergedContent);
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

  mergeTranslations(
    baseTranslation: TranslatedSlide[],
    newTranslation: TranslatedSlide[],
  ): TranslatedSlide[] {
    let lastColorVariableUsed: string | undefined;

    return newTranslation.map((newTranslationItem, index) => {
      const baseColor = baseTranslation[index]?.backgroundColor;
      const newColor = newTranslationItem.backgroundColor ?? baseColor ?? lastColorVariableUsed;

      if (newColor) {
        lastColorVariableUsed = newColor;
      }

      return {
        backgroundColor: newColor ?? '',
        content: newTranslationItem.content,
      };
    });
  }
}
