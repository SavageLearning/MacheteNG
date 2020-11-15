import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // copy to local; https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript
    let rtr = this.router;

    this.auth.authorize().subscribe(user => {
      user.state = user.state ? user.state : '/welcome';

      // get out of the auth loop (no hanging 'authorize works!')
      if (user.state.endsWith('authorize')) { user.state = '/welcome'; }

      if (user.profile.roles.includes('Hirer') && user.state === '/welcome') {
        rtr.navigate(['/online-orders/introduction']);
        return;
      } else {
        rtr.navigate([user.state]);
      }
    }, err => {
      console.error('redirecting to login; endSigninMainWindow returned: ', err);
      this.auth.removeUser();
      rtr.navigate(['/welcome']);
    });
  }
}
