import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors, } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { provideToastr } from 'ngx-toastr';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { ModalModule } from 'ngx-bootstrap/modal';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding(),  withInMemoryScrolling({
      scrollPositionRestoration: 'top',
    })),
    provideAnimations(),
    provideToastr(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideHttpClient(
      withInterceptors([JwtInterceptor]), 
      withFetch()
    ),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
    importProvidersFrom(ModalModule.forRoot()),
    provideFlatpickrDefaults()
  ]
};
