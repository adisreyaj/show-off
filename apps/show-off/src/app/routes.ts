import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { COLLECTION_ROUTES } from '@show-off/ui/collections';
import { AUTH_ROUTES } from '@show-off/ui/auth';

export const ROUTES_PROVIDER = importProvidersFrom(
  RouterModule.forRoot([
    ...AUTH_ROUTES,
    {
      path: '',
      component: ShellComponent,
      children: [...COLLECTION_ROUTES],
    },
  ])
);
