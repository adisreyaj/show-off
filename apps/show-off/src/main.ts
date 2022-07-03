import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AUTH_CONFIG } from '@show-off/ui/auth';
import { ROUTES_PROVIDER } from './app/routes';
import { APOLLO_PROVIDERS } from './app/config/apollo.config';
import { HttpClientModule } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: AUTH_CONFIG,
      useValue: {
        authURL: `${environment.apiURL}/api/auth`,
      },
    },
    importProvidersFrom(HttpClientModule),
    ...APOLLO_PROVIDERS,
    ROUTES_PROVIDER,
  ],
}).catch((err) => console.error(err));
