import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppComponent } from '../app.component';
import { By }           from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { loadMenuRules } from './load-menu-rules';
import { AuthService } from '../shared/index';
import { AuthServiceSpy } from '../shared/testing';

class AppComponentSpy {

}

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;
  let el: DebugElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMenuComponent, AppSubMenuComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .overrideComponent(AppMenuComponent, {
      set: {
        providers: [
          { provide: AppComponent, useClass: AppComponentSpy },
          { provide: AuthService, useClass: AuthServiceSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppMenuComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement.query(By.css('.item'))
      // component
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
