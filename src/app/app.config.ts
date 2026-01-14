import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateCompiler, provideTranslateService } from '@ngx-translate/core';

import { MarkdownCompiler } from '@shared/markdown-compiler';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideClientHydration(withEventReplay()),
    provideTranslateService({
      compiler: provideTranslateCompiler(MarkdownCompiler),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
