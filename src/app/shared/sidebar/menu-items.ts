import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/user/list',
    title: 'Users',
    icon: 'bi bi-person-lines-fill',
    class: '',
    extralink: false,
    submenu: []
  },


  {
    path: '/profile/list',
    title: 'Profiles',
    icon: 'bi bi-prescription2',
    class: '',
    extralink: false,
    submenu: []
      
  },
  {
    path: '',
    title: 'Reports',
    icon: 'bi bi-file-earmark-text',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/reports/influencer-visuals',
        title: 'Influencer Visuals',
        icon: 'bi bi-user',
        class: '',
        extralink: false,
        submenu: []

      },
      {
        path: '/reports/influencer-stats',
        title: 'Influencer Stats',
        icon: 'bi bi-user',
        class: '',
        extralink: false,
        submenu: []

      },
      {
        path: '/reports/influencer-details',
        title: 'Influencers Details',
        icon: 'bi bi-user',
        class: '',
        extralink: false,
        submenu: []

      },
      {
        path: '/reports/donor-visuals',
        title: 'Donor Visuals',
        icon: 'bi bi-user',
        class: '',
        extralink: false,
        submenu: []

      },
      {
        path: '/reports/donor-stats',
        title: 'Donor Stats',
        icon: 'bi bi-user',
        class: '',
        extralink: false,
        submenu: []

      },
      {
        path: '/reports/donor-details',
        title: 'Donor Details',
        icon: 'bi bi-user',
        class: '',
        extralink: false,
        submenu: []

      }
    ]
  },
   
  // {
  //   path: '/settings',
  //   title: 'Settings',
  //   icon: 'bi bi-gear',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // }
];
