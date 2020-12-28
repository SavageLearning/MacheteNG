/* eslint-disable arrow-body-style */
/* eslint-disable brace-style */

import { Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { ConfigsService } from '../../configs/configs.service';
import { Config } from '../../shared/models/config';
import { AuthService } from '../../shared/index';
import { Router } from '@angular/router';
import { AuthServiceSpy, RouterSpy } from '../../shared/testing';

class ConfigsServiceSpy {
  getConfig = jasmine.createSpy('getConfig')
    .and.callFake(() => { return this.mockConfigs() });
  getAllConfigs = jasmine.createSpy('getAllConfigs')
    .and.callFake(() =>
      // let configs = new Array<Config>();
      // configs.push(new Config({key: 'WorkCenterDescription_EN', value: 'foo'}));
      // return Observable.of(configs);
       this.mockConfigs()
    );

  mockConfigs(): Observable<Config[]> {
      let configs = new Array<Config>();
      configs.push(new Config({key: 'WorkCenterDescription_EN', value: 'foo'}));
      configs.push(new Config({key: 'FacebookAppId', value: 'foo'}));
      configs.push(new Config({key: 'GoogleClientId', value: 'foo'}));
      configs.push(new Config({key: 'OAuthStateParameter', value: 'foo'}));
      return Observable.of(configs);
  }
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ]
    })
    .overrideComponent(WelcomeComponent, {
      set: {
        providers: [
          { provide: ConfigsService, useClass: ConfigsServiceSpy },
          { provide: AuthService, useClass: AuthServiceSpy },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(WelcomeComponent);
      component = fixture.componentInstance;
      component.welcome = 'bar';
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
