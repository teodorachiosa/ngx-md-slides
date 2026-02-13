import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideTranslateCompiler,
  provideTranslateService,
  TranslateLoader,
} from '@ngx-translate/core';

import { MarkdownCompiler } from '@shared/markdown-compiler';
import { CustomTranslationsLoader } from '@shared/custom-translations-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideClientHydration(withEventReplay()),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslationsLoader,
        deps: [HttpClient],
      },
      compiler: provideTranslateCompiler(MarkdownCompiler),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
