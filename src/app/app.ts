import { AfterViewInit, Component, DOCUMENT, inject, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import {
  RouterLink,
  RouterOutlet,
  Router,
  NavigationEnd,
  ActivatedRoute,
  Scroll,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { StateService } from '@shared/services/state.service';
import { Header } from '@layout/header/header';

const ANCHOR_SCROLL_OFFSET = 200;

@Component({
  selector: 'app-root',
  imports: [Header, RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  document = inject(DOCUMENT);
  translateService = inject(TranslateService);
  stateService = inject(StateService);
  viewportScroller = inject(ViewportScroller);
  titleService = inject(Title);
  routerEventsSubscription: Subscription = Subscription.EMPTY;
  mainHeading?: HTMLHeadingElement;
  previousUrlNoFragment?: string;
  pageTitle = '';

  constructor() {
    this.translateService.setFallbackLang('en');
  }

  ngAfterViewInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((navigationEvent) => {
      this.makeMainHeadingFocusable();

      if (navigationEvent instanceof NavigationEnd) {
        this.setPageTitle();
        this.translateService.onLangChange.subscribe(() => {
          this.setPageTitle();
        });
      }

      // Angular bug: https://github.com/angular/angular/issues/55383
      if (navigationEvent instanceof Scroll) {
        const element = this.document.querySelector(`#${navigationEvent.anchor}`);

        if (element) {
          this.viewportScroller.setOffset([0, ANCHOR_SCROLL_OFFSET]);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  getPageTitle(): string {
    return `${this.translateService.instant(this.activatedRoute.firstChild?.snapshot.data['title'] ?? '.')} - ${this.translateService.instant('ui.siteTitle')}`;
  }

  setPageTitle(): void {
    this.pageTitle = this.getPageTitle();
    this.titleService.setTitle(this.pageTitle);
  }

  makeMainHeadingFocusable(): void {
    this.mainHeading = undefined;
    this.mainHeading = this.document.getElementsByTagName('h1')[0];
    this.mainHeading?.setAttribute('tabindex', '-1');
    this.mainHeading?.setAttribute('id', 'slides-start');
  }
}
