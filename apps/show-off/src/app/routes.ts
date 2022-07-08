import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

export const ROUTES_PROVIDER = importProvidersFrom(
  RouterModule.forRoot([
    {
      path: 'login',
      title: 'Login | Show Off',
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
          title: 'Home | Show Off',
          data: {
            header: {
              text: 'Home',
            },
          },
          loadComponent: () =>
            import('@show-off/ui/collections').then(
              (m) => m.CollectionsComponent
            ),
        },
        {
          path: 'collections',
          title: 'My Collections | Show Off',
          data: {
            header: {
              text: 'My Collections',
            },
          },
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
