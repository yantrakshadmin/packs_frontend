import {lazy} from 'react';

export const publicRoutes = [
  {Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')), path: '/'},
  {
    Component: lazy(() => import('../components/SignUp/sign-up-client.component')),
    path: './sign-up/client/',
  },
  {
    Component: lazy(() => import('../components/SignUp/sign-up-employee.component')),
    path: './sign-up/employee/',
  },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
];

export const extraRoutesClient = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/client/EditProfile.screen')),
  },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
  // {
  //   path: '/',
  //   Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')),
  // },
];
export const outerRoutesEmployee = [
  {
    path: '/docket/',
    Component: lazy(() => import('components/Docket/Docket')),
  },
];
export const extraRoutesEmployee = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/create-allotment/',
    Component: lazy(() => import('forms/allotment.form')),
  },
];
export const employeeRoutes = [
  {
    name: 'Dashboard',
    icon: ['fas', 'home'],
    path: '/dashboard/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Masters',
    icon: ['fas', 'layer-group'],
    path: '/masters/',
    Component: lazy(() => import('screens/employee/Product.employee.screen')),
    isSubMenu: true,
    subMenu: [
      {
        name: 'Products',
        path: '/master/products/',
        Component: lazy(() => import('screens/employee/Product.employee.screen')),
      },
      {
        name: 'Kits',
        path: '/master/kits/',
        Component: lazy(() => import('screens/employee/Kit.employee.screen')),
      },
      {
        name: 'Flows',
        path: '/master/flows/',
        Component: lazy(() => import('screens/employee/Flow.screen')),
      },

      {
        name: 'Sender Clients',
        path: '/master/clients/',
        Component: lazy(() => import('screens/employee/Client.screen')),
      },
      {
        name: 'Receiver Clients',
        path: '/master/receiver-clients/',
        Component: lazy(() => import('screens/employee/ReceiverClient.screen')),
      },
      {
        name: 'Warehouses',
        path: '/master/warehouses/',
        Component: lazy(() => import('screens/employee/Warehouse.employee.screen')),
      },
      {
        name: 'Vendors',
        path: '/master/vendors/',
        Component: lazy(() => import('screens/employee/Vendors.screen')),
      },
    ],
  },
  {
    name: 'Material Requests',
    icon: ['fas', 'layer-group'],
    path: '/material-request/',
    Component: lazy(() => import('screens/employee/MaterialRequest.screen')),
  },
  {
    name: 'Allotment Dockets',
    icon: ['fas', 'layer-group'],
    path: '/allotment-dockets/',
    Component: lazy(() => import('screens/employee/AllotmentDockets.screen.js')),
  },
  {
    name: 'Return Dockets',
    icon: ['fas', 'layer-group'],
    path: '/return-dockets/',
    Component: lazy(() => import('screens/employee/Return.screen')),
  },
  {
    name: 'GRN',
    icon: ['fas', 'layer-group'],
    path: '/grn/',
    Component: lazy(() => import('screens/employee/GRN.screen')),
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
    icon: ['fas', 'layer-group'],
    path: '/inventory/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Material Requests',
    icon: ['fas', 'layer-group'],
    path: '/material-request/',
    Component: lazy(() => import('screens/client/MaterialRequest.screen')),
  },
  {
    name: 'Client Inventory',
    icon: ['fas', 'layer-group'],
    path: '/client-inventory/',
    Component: lazy(() => import('screens/404.screen')),
  },
];
