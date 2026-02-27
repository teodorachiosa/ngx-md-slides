import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'slide-set1',
    pathMatch: 'full',
  },
  {
    path: 'slide-set1',
    loadComponent: () => import('./slides/slide-set1/slide-set1').then((m) => m.SlideSet1),
    data: { title: 'sets.set1.title' },
  },
  {
    path: 'slide-set2',
    loadComponent: () => import('./slides/slide-set2/slide-set2').then((m) => m.SlideSet2),
    data: { title: 'sets.set2.title' },
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found').then((m) => m.NotFound),
    data: { title: 'ui.notFoundTitle' },
  },
];
