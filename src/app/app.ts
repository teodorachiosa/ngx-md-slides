import { AfterViewInit, Component, DOCUMENT, inject, OnDestroy, Renderer2 } from '@angular/core';
import { Header } from './components/header/header';
import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
  Router,
  NavigationEnd,
  ActivatedRoute,
  Routes,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';

import TRANSLATIONS_EN from '../../public/i18n/en.json';
import TRANSLATIONS_RO from '../../public/i18n/ro.json';
import { routes } from './app.routes';

// const CLEAN_UP_ANNOUNCEMENT_TIMEOUT = 3000;

@Component({
  selector: 'app-root',
  imports: [Header, RouterLink, RouterOutlet, RouterLinkActive, RouterLinkActive, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  announcer = inject(LiveAnnouncer);
  document = inject(DOCUMENT);
  translateService = inject(TranslateService);
  routerEventsSubscription: Subscription = Subscription.EMPTY;
  mainHeading?: HTMLHeadingElement;
  previousUrlNoFragment?: string;
  titleService = inject(Title);
  pageTitle = '';
  routes: Routes;

  constructor() {
    this.translateService.setTranslation('en', TRANSLATIONS_EN);
    this.translateService.setTranslation('ro', TRANSLATIONS_RO);
    this.translateService.setFallbackLang('en');

    this.routes = routes;
  }

  ngAfterViewInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((navigationEvent) => {
      this.findMainHeading();

      if (navigationEvent instanceof NavigationEnd) {
        const currentUrlNoFragment = navigationEvent.urlAfterRedirects.split('#')[0];

        if (
          navigationEvent.id !== 1 &&
          this.previousUrlNoFragment &&
          this.previousUrlNoFragment !== currentUrlNoFragment
        ) {
          this.focusSlides();
        }

        this.setPageTitle();
        this.translateService.onLangChange.subscribe(() => {
          this.setPageTitle();
        });

        /*
        Angular bug: https://github.com/angular/angular/issues/55383
        Quick ugly fix: Always scroll to top
        TODO:  Implement better manual scrolling to element and keep up to date with this bug
        */
        if (navigationEvent.urlAfterRedirects.includes('#')) {
          setTimeout(() => {
            window.scrollTo({top: 0});
          });
        }

        this.previousUrlNoFragment = currentUrlNoFragment;
      }
    });
  }

  getPageTitle(): string {
    return `${this.translateService.instant(this.activatedRoute.firstChild?.snapshot.data['title'] ?? '.')} - ${this.translateService.instant('ui.siteTitle')}`;
  }

  setPageTitle(): void {
    this.pageTitle = this.getPageTitle();
    this.titleService.setTitle(this.pageTitle);
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  findMainHeading(): void {
    this.mainHeading = undefined;
    setTimeout(() => {
      this.mainHeading = this.document.getElementsByTagName('h1')[0];
      this.mainHeading?.setAttribute('tabindex', '-1');
      this.mainHeading?.setAttribute('id', 'slides-start');
    });
  }

  focusSlides(): void {
    setTimeout(() => {
      this.mainHeading?.focus();
    });

    // const slidesElement = this.document.getElementById('slides');
    // if (!this.mainHeading) {
    //   slidesElement?.focus();
    // }
  }

  // getCurrentPageTitle(): string | undefined {
  //   // "firstChild" is needed because the current component (app component) is outside router-outlet
  //   return this.activatedRoute.firstChild?.snapshot.title?.split('|')[0];
  // }

  // announcePageChange(): void {
  //   const pageTitle = this.getCurrentPageTitle();
  //   if (!pageTitle) return;

  //   this.announcer.announce(`Navigated to page: ${pageTitle}`);
  //   this.cleanUpAnnouncementsWithDelay();
  // }

  // cleanUpAnnouncementsWithDelay(): void {
  //   setTimeout(() => {
  //     this.announcer.clear();
  //   }, CLEAN_UP_ANNOUNCEMENT_TIMEOUT);
  // }
}
