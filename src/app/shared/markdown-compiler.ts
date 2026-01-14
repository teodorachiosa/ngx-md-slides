/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { marked } from 'marked';

@Injectable()
export class MarkdownCompiler extends TranslateCompiler {
  compile(value: string, lang: string): string {
    if (typeof value !== 'string') {
      return value;
    }

    return marked.parse(value) as string
  }

  compileTranslations(translations: any, lang: string): any {
    const compiled: any = {};

    for (const key in translations) {
      if (translations.hasOwnProperty(key)) {
        const value = translations[key];
        if (typeof value === 'object' && value !== null) {
          compiled[key] = this.compileTranslations(value, lang);
        } else {
          compiled[key] = this.compile(value, lang);
        }
      }
    }

    return compiled;
  }
}
