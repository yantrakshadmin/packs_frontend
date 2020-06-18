import {lazy} from 'react';

export const publicRoutes = [
  {Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')), path: '/'},
  {
    Component: lazy(() => import('../components/SignUp/sign-up-client.component')),
    path: '/sign-up/client/',
  },
  {
    Component: lazy(() => import('../components/SignUp/sign-up-employee.component')),
    path: '/sign-up/employee/',
  },
];

export const extraRoutesShipper = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/',
    Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')),
  },
  {
    path: '/freight-exchange/view-bid/:id',
    Component: lazy(() => import('screens/404.screen')),
  },
];
export const extraRoutesSupplierFTL = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/',
    Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')),
  },
];
export const extraRoutesSupplierPTL = [
  {
    path: '/',
    Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')),
  },
];
export const employeeRoutes = [
  {
    name: 'Dashboard',
    icon: ['fas', 'home'],
    path: '/dashboard/',
    Component: lazy(() => import('screens/Dashboard')),
  },
  {
    name: 'Masters',
    icon: ['fas', 'layer-group'],
    path: '/masters/',
    // isSubMenu: true,
    // subMenu: [
    //   {
    //     name: 'Item',
    //     path: '/master/item/',
    //     Component: lazy(() => import('screens/404.screen')),
    //   },
    //   {
    //     name: 'Vendor',
    //     path: '/master/vendor/',
    //     Component: lazy(() => import('screens/404.screen')),
    //   },
    //   {
    //     name: 'Address',
    //     path: '/master/address/',
    //     Component: lazy(() => import('screens/404.screen')),
    //   },
    // ],
  },
  {
    name: 'GRN',
    icon: ['fas', 'layer-group'],
    path: '/grn/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'PFEP',
    icon: ['fas', 'layer-group'],
    path: '/pfep/',
    Component: lazy(() => import('screens/404.screen')),
  },
];

export const clientRoutes = [
  {
    name: 'Inventory',
    path: '/inventory/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Material Request',
    path: '/material-request/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Client Inventory',
    path: '/client-inventory/',
    Component: lazy(() => import('screens/404.screen')),
  },
];

export const supplierFTLRoutes = [
  {
    name: 'Available loads',
    icon: ['fas', 'layout'],
    path: '/available-loads/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Post Truck',
    icon: ['fas', 'layout'],
    path: '/post-truck/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'My Bids',
    icon: ['fas', 'layout'],
    path: '/my-bids/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Trips Management',
    icon: ['fas', 'layout'],
    path: '/trips-management/',
    Component: lazy(() => import('screens/404.screen')),
  },
];

export const supplierPTLRoutes = [
  {
    name: 'View Pickup requests',
    icon: ['fas', 'layout'],
    path: '/view-pickup-requests/',
    Component: lazy(() => import('screens/404.screen')),
  },
];
