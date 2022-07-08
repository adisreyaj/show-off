import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AUTH_CONFIG, AuthService, CURRENT_USER } from '@show-off/ui/auth';
import { ROUTES_PROVIDER } from './app/routes';
import { APOLLO_PROVIDERS } from './app/config/apollo.config';
import { HttpClientModule } from '@angular/common/http';
import { ICONS } from './app/config/icons.config';
import { BUTTON_CONFIG, DROPDOWN_CONFIG, FORM_INPUT_CONFIG } from 'zigzag';

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
    {
      provide: CURRENT_USER,
      useFactory: (auth: AuthService) => auth.me(),
      deps: [AuthService],
    },
    {
      provide: BUTTON_CONFIG,
      useValue: {
        rounded: 'none',
      },
    },
    {
      provide: FORM_INPUT_CONFIG,
      useValue: {
        rounded: 'none',
      },
    },
    {
      provide: DROPDOWN_CONFIG,
      useValue: {
        rounded: 'none',
      },
    },
    importProvidersFrom(HttpClientModule),
    ...APOLLO_PROVIDERS,
    ICONS,
    ROUTES_PROVIDER,
  ],
}).catch((err) => console.error(err));
