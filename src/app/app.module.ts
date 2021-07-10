import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { NgModule, Injector, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// import { HttpClientModule, XHRBackend, BrowserXhr, ResponseOptions,  XSRFStrategy } from '@angular/http';
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent }  from './menu/app.menu.component';
import { AppTopBarComponent }  from './app.topbar.component';
import { AppFooterComponent }  from './app.footer.component';
import { InlineProfileComponent }  from './menu/app.profile.component';
import { PageNotFoundComponent }   from './not-found.component';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService} from './shared/services/auth.service';

import { ToastModule } from 'primeng/toast';

import { AuthorizeComponent } from './auth/authorize/authorize.component';
import { OnlineOrdersModule } from './online-orders/online-orders.module';
import { ReportsModule } from './reports/reports.module';
import { ExportsModule } from './exports/exports.module';
import { MyWorkOrdersModule } from './my-work-orders/my-work-orders.module';
import { EmployersModule } from './employers/employers.module';
import { WorkersModule } from './workers/workers.module';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { LoggingService } from './shared/services/logging.service';
import { TransportProvidersService } from './online-orders/transport-providers.service';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    InlineProfileComponent,
    PageNotFoundComponent,
    AuthorizeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReportsModule,
    OnlineOrdersModule,
    ExportsModule,
    MyWorkOrdersModule,
    EmployersModule,
    WorkersModule,
    AppRoutingModule,
    ToastModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  providers: [
    AuthService,
    LoggingService,
    TransportProvidersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('.ctor: AppModule');
  }

}
