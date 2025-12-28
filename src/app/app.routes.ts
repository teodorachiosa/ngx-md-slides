import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'slide-deck1',
    pathMatch: 'full'
  },
  {
    path: 'slide-deck1',
    loadComponent: () => import('./slide-decks/slide-deck/slide-deck').then((m) => m.SlideDeck),
    title: 'Slide deck #1',
  },
  {
    path: 'slide-deck2',
    loadComponent: () => import('./slide-decks/slide-deck2/slide-deck2').then((m) => m.SlideDeck2),
    title: 'Slide deck #2',
  },
  {
    path: '**',
    redirectTo: 'slide-deck1'
  },
];
