import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppTopBar} from './app.topbar.component';
import {InlineProfileComponent} from './menu/app.profile.component';
import {AppMenuComponent, AppSubMenu} from './menu/app.menu.component';
import {AppFooter} from './app.footer.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './not-found.component';
import {APP_BASE_HREF} from '@angular/common';
import { AuthorizeComponent } from './auth/authorize/authorize.component';
import { AuthService } from './shared/index';
import { AuthServiceSpy } from './shared/testing';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        InlineProfileComponent,
        PageNotFoundComponent,
        AuthorizeComponent

      ],
      imports: [
        AppRoutingModule,
        NoopAnimationsModule,
        ToastModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: AuthService, useClass: AuthServiceSpy },
        MessageService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
