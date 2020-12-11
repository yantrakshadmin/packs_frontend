import { lazy } from 'react';

export const publicRoutes = [
  { Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')),
    path: '/' },
  {
    Component: lazy(() => import('../components/SignUp/sign-up-client.component')),
    path: '/sign-up/client/',
  },
  {
    Component: lazy(() => import('../components/SignUp/sign-up-employee.component')),
    path: '/sign-up/employee/',
  },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/employee/docket/:id',
    Component: lazy(() => import('components/Docket/Docket')),
  },
  {
    path: '/employee/return-docket/:id',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
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
  {
    path: '/dashboard/',
    Component: lazy(() => import('screens/client/dashboard.screen')),
  },
];
export const outerRoutesEmployee = [
  {
    path: '/docket/:id',
    Component: lazy(() => import('components/Docket/Docket')),
  },
  {
    path: '/return-docket/:id',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
  },
  {
    path: '/print-cp/:id',
    Component: lazy(() => import('components/printCP')),
  },

];
export const outerRoutesClient = [
  {
    path: '/return-docket/',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
  },
  {
    path: '/outward-docket/:id',
    Component: lazy(() => import('components/OutwardsDocket/outward-docket')),
  },
];
export const extraRoutesEmployee = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/return-dockets/return/',
    Component: lazy(() => import('forms/return.form')),
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
    Component: lazy(() => import('screens/employee/dashboard.screen')),
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
    name: 'Sales',
    icon: ['fas', 'layer-group'],
    path: '/reports/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Leads',
        path: '/pfep/leads/',
        Component: lazy(() => import('screens/employee/Leads.screen')),
      },
      {
        name: 'PFEP',
        path: '/pfep/create/',
        Component: lazy(() => import('screens/employee/PFEP.screen')),
      },
      {
        name: 'CP',
        path: '/cp/',
        Component: lazy(() => import('screens/employee/createCP.screen')),
      },
    ],
  },
  {
    name: 'Reports',
    icon: ['fas', 'layer-group'],
    path: '/reports/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Allotments',
        path: '/reports/allotments/',
        Component: lazy(() => import('components/Reports/Allotment.js')),
      },
      {
        name: 'Returns',
        path: '/reports/returns/',
        Component: lazy(() => import('components/Reports/Return.js')),
      },
      {
        name: 'Floating',
        path: '/reports/stocking/',
        Component: lazy(() => import('components/Reports/Stocking.js')),
      },  {
        name: 'GRN Count',
        path: '/reports/grn-count/',
        Component: lazy(() => import('components/Reports/grnCount')),
      },
      {
        name: 'Allotment Count',
        path: '/reports/allotment-count/',
        Component: lazy(() => import('components/Reports/allotmentCount')),
      },
      {
        name: 'Return Count',
        path: '/reports/return-count/',
        Component: lazy(() => import('components/Reports/returnCount')),
      },
    ],
  },
  {
    name: 'Inventory',
    icon: ['fas', 'layer-group'],
    path: '/inventory/',
    Component: lazy(() => import('screens/employee/inventory.screen')),
  },
];

export const clientRoutes = [
  {
    name: 'Masters',
    icon: ['fas', 'layer-group'],
    path: '/masters/',
    Component: lazy(() => import('screens/client/kits.screen')),
    isSubMenu: true,
    subMenu: [
      {
        name: 'Kits',
        icon: ['fas', 'layer-group'],
        path: '/kits/',
        Component: lazy(() => import('screens/client/kits.screen')),
      },
      {
        name: 'Client Flows',
        icon: ['fas', 'layer-group'],
        path: '/client-flows/',
        Component: lazy(() => import('screens/client/clientFlows.screen')),
      },
    ],
  },
  {
    name: 'Material Requests',
    icon: ['fas', 'layer-group'],
    path: '/material-request/',
    Component: lazy(() => import('screens/client/MaterialRequest.screen')),
  },
  {
    name: 'My Allotments',
    icon: ['fas', 'layer-group'],
    path: '/allotments/',
    Component: lazy(() => import('screens/client/Allotments.screen')),
  },
  {
    name: 'Outward Docket',
    icon: ['fas', 'layer-group'],
    path: '/outward-docket/',
    Component: lazy(() => import('screens/client/outwardDocket.screen')),
  },
  {
    name: 'Return Reports',
    icon: ['fas', 'layer-group'],
    path: '/return-reports/',
    Component: lazy(() => import('screens/client/returnReports.screen')),
  },
];
