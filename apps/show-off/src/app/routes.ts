import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

export const ROUTES_PROVIDER = importProvidersFrom(
  RouterModule.forRoot([
    {
      path: 'login',
      loadComponent: () =>
        import('@show-off/ui/auth').then((m) => m.LoginComponent),
    },
    {
      path: 'auth/callback',
      loadComponent: () =>
        import('@show-off/ui/auth').then((m) => m.SocialLoginHandlerComponent),
    },
    {
      path: '',
      component: ShellComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          loadComponent: () =>
            import('@show-off/ui/home').then((m) => m.HomeComponent),
        },
        {
          path: 'collections',
          children: [
            {
              path: '',
              pathMatch: 'full',
              loadComponent: () =>
                import('@show-off/ui/collections').then(
                  (m) => m.CollectionsComponent
                ),
            },
            {
              path: ':id',
              loadComponent: () =>
                import('@show-off/ui/collections').then(
                  (m) => m.CollectionDetailComponent
                ),
            },
          ],
        },
      ],
    },
  ])
);
