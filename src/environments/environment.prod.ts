/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
  name: 'prod',
  production: true,
  dataUrl: window.location.protocol + '//' + window.location.host,
  baseRef: '/V2',
  client_id: 'machete-casa-prod',
  redirect_uri: '/V2/authorize',
};
