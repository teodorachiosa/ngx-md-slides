import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import enTranslations from '@shared/i18n/en';
import roTranslations from '@shared/i18n/ro';

@Injectable()
export class CustomTranslationsLoader implements TranslateLoader {
  private translations: { [key: string]: unknown } = {
    'en': enTranslations,
    'ro': roTranslations
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(lang: string): Observable<any> {
    const translation = this.translations[lang];

    if (translation) {
      return of(translation);
    }

    return of({});
  }
}
