import { Component, OnInit } from '@angular/core';
import { ConfigsService } from '../../configs/configs.service';
import { AuthService } from '../../shared/index';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  facebookAppId: string;
  googleClientId: string;
  macheteSessionId: string;
  welcome: string;
  isLoggedIn: boolean;
  userState: string;

  constructor(private cfgService: ConfigsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.cfgService.getAllConfigs().subscribe(
      data => {
        console.log('configs: ', data) // TODO this was 2am madness, this isn't great JS
        this.welcome = data.find(config => config.key === 'WorkCenterDescription_EN').value;
        this.facebookAppId = data.find(config => config.key === 'FacebookAppId').value;
        this.googleClientId = data.find(config => config.key === 'GoogleClientId').value;
        this.macheteSessionId = data.find(config => config.key === 'OAuthStateParameter').value;
      },
      error => console.error('welcome.component.OnInit:' + error)
    );
    this.authService.authorize().subscribe(user => {
      this.isLoggedIn = !user.expired;
      this.userState = user.state ? user.state : '/welcome';
    }, error => {
      console.log('welcome component: error; ', error);
      this.isLoggedIn = false;
    });
  }

  // https://stackoverflow.com/a/49437170/2496266
  login() {
    window.location.href = environment.dataUrl
                         + '/id/login?redirect_uri='
                         + environment.dataUrl
                         + environment.redirect_uri + '&' // should include above...
                         + 'app_id=' + this.facebookAppId + '&'
                         + 'client_id=' + this.googleClientId + '&'
                         + 'state=' + this.macheteSessionId;
  }

  // DEPRECATED
  register() {
    this.router.navigate(['/register']);
  }
}
