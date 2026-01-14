import {
  AfterViewInit,
  Component,
  DOCUMENT,
  inject,
  OnDestroy,
} from '@angular/core';
import { Header } from './components/header/header';
import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
  Router,
  NavigationEnd,
  ActivatedRoute,
  TitleStrategy,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';

import TRANSLATIONS_EN from '../../public/i18n/en.json';
import TRANSLATIONS_RO from '../../public/i18n/ro.json';

// const CLEAN_UP_ANNOUNCEMENT_TIMEOUT = 3000;

@Component({
  selector: 'app-root',
  imports: [Header, RouterLink, RouterOutlet, RouterLinkActive, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  announcer = inject(LiveAnnouncer);
  document = inject(DOCUMENT);
  titleStrategy = inject(TitleStrategy);
  translate = inject(TranslateService);
  routerEventsSubscription: Subscription = Subscription.EMPTY;

  constructor() {
    this.translate.setTranslation('en', TRANSLATIONS_EN);
    this.translate.setTranslation('ro', TRANSLATIONS_RO);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  ngAfterViewInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((navigationEvent) => {
      if (navigationEvent instanceof NavigationEnd) {
        if (navigationEvent.id !== 1) {
          // this.announcePageChange();
          this.focusSlides();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
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

  focusSlides(): void {
    const slidesElement = this.document.getElementById('slides');
    slidesElement?.focus();
  }
}
