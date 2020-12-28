/* eslint-disable @typescript-eslint/naming-convention */
export class User {
  expired = true;
  profile: UserProfile = new UserProfile();
  scope = '';
  session_state = '';
  state = '';
  token_type = '';
  expires_at = 0;
  expires_in = 0;
  scopes: Array<string> = new Array<string>();
}

export class UserProfile {
  roles: Array<string> = new Array<string>();
  preferred_username = 'Not logged in!';
}
