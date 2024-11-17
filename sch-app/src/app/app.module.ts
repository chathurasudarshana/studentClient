import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppNotificationModule } from './shared/modules/notification/app-notification.module';
import { ImageApiService } from './shared/services/image-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppNotificationModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    ImageApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
