/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

@Injectable()
export class MarkdownCompiler extends TranslateCompiler {
  compile(value: string, lang: string): string {
    if (typeof value !== 'string') {
      return value;
    }

    switch (true) {
      case value.startsWith('\\'):
        return value.split('\\')[1];
      default: {
        const markedHighlighted = new Marked(
          markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code) {
              return hljs.highlightAuto(code).value;
            },
          }),
        );
        return markedHighlighted.parse(value) as string;
      }
    }
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
