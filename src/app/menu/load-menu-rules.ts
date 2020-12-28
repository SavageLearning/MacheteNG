/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { MenuRule, LRole } from './menu-rule';

export function loadMenuRules(authList: string[]): Array<MenuRule> {
  const rules = [
    new MenuRule({
      id: 1,
      label: 'Place an order',
      icon: 'build',
      routerLink: ['/online-orders/introduction'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.HIRER
      ]
    }),
    new MenuRule({
      id: 2,
      label: 'My profile',
      icon: 'home',
      routerLink: ['/employers'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.HIRER
      ]
    }),
    new MenuRule({
      id: 3,
      label: 'My work orders',
      icon: 'work',
      routerLink: ['/my-work-orders'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.HIRER
      ]
    }),
    new MenuRule({id: 4, label: 'Dispatch', icon: 'today', url: ['/workassignment']}),
    new MenuRule({id: 5, label: 'People', icon: 'people', url: ['/person']}),
    new MenuRule({id: 6, label: 'Activities', icon: 'local_activity', url: ['/Activity']}),
    new MenuRule({id: 7, label: 'Sign-ins', icon: 'track_changes', url: ['/workersignin']}),
    new MenuRule({id: 8, label: 'Emails', icon: 'email', url: ['/email']}),
    new MenuRule({
      id: 9,
      label: 'Reports',
      icon: 'subtitles',
      routerLink: ['/reports'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.MANAGER
      ]
    }),
    new MenuRule({
      id: 10,
      label: 'Exports',
      icon: 'file_download',
      routerLink: ['/exports'],
      authorizedRoles: [
        LRole.ADMIN,
        LRole.MANAGER
      ]
    }),
    new MenuRule({
      id: 12,
      label: 'Configuration',
      icon: 'settings_application',
      routerLink: ['/configuration'],
      authorizedRoles: [
        LRole.ADMIN
      ],
      items: [
        new MenuRule({
          id: 11,
          label: 'Auth diagnostics',
          icon: 'perm_identity',
          routerLink: ['/dashboard'],
          authorizedRoles: [
            LRole.ADMIN,
            LRole.CHECKIN,
            LRole.MANAGER,
            LRole.PHONEDESK,
            LRole.TEACHER,
            LRole.USER
          ]
        }),
        new MenuRule({
          id: 13,
          label: 'Transport Providers',
          icon: 'airport_shuttle',
          routerLink: ['/transport-providers'],
          authorizedRoles: [LRole.ADMIN]
        })
      ]
    })
  ];
  // lambda-fu
  if (authList === null || authList === undefined) {
    return new Array<MenuRule>();
  }
  return rules.filter(rule => rule.authorizedRoles.findIndex(role => authList.findIndex(auth => auth === role) > -1) > -1);
}
