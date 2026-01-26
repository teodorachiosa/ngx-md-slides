import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'slide-set1',
    pathMatch: 'full'
  },
  {
    path: 'slide-set1',
    loadComponent: () => import('./slides/slide-set/slide-set').then((m) => m.SlideSet),
    data: {title: 'sets.set1.title'}
  },
  {
    path: 'slide-set2',
    loadComponent: () => import('./slides/slide-set2/slide-set2').then((m) => m.SlideSet2),
    data: {title: 'sets.set2.title'}
  },
  {
    path: '**',
    redirectTo: 'slide-set1'
  },
];
