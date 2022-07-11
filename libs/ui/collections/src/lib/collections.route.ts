import { Route, Routes } from '@angular/router';
import { CollectionPageContext } from '@show-off/ui/collections';

export const COLLECTION_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home | Show Off',
    data: {
      context: CollectionPageContext.Home,
      header: {
        text: 'Home',
      },
    },
    loadComponent: () =>
      import('./components/collections.component').then(
        (m) => m.CollectionsComponent
      ),
  },
  {
    path: 'collections',
    children: [
      {
        path: '',
        title: 'My Collections | Show Off',
        data: {
          context: CollectionPageContext.MyCollections,
          header: {
            text: 'My Collections',
          },
        },
        pathMatch: 'full',
        loadComponent: () =>
          import('./components/collections.component').then(
            (m) => m.CollectionsComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/detail/collection-detail.component').then(
            (m) => m.CollectionDetailComponent
          ),
      },
    ],
  },
];

export const EMBED_ROUTE: Route = {
  path: 'embed/:id',
  loadComponent: () =>
    import('./components/embed/collection-embed.component').then(
      (m) => m.CollectionEmbedComponent
    ),
};
