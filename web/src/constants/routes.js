import {lazy} from 'react';

export const publicRoutes = [
  {Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')), path: '/'},
  {Component: lazy(() => import('../components/forgetPassword')), path: '/forgot-password'},
  {
    Component: lazy(() => import('../components/confirmPassword')),
    path: '/confirm-password/:uname',
  },
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
  {
    path: '/outward-docket/:id',
    Component: lazy(() => import('components/OutwardsDocket/outward-docket')),
  },
  {
    path: '/relocation-docket/:id',
    Component: lazy(() => import('components/RelocationDocket/RelocationDocket')),
  },
];
export const outerRoutesClient = [
  {
    path: '/return-docket/',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
    props: {isClient: true},
  },
  {
    path: '/outward-docket/:id',
    Component: lazy(() => import('components/OutwardsDocket/outward-docket')),
  },
];
export const extraRoutesEmployee = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/employee/EditProfile.screen')),
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
    name: 'Sales',
    icon: ['fas', 'user-friends'],
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
    name: 'Volume Plan',
    icon: ['far', 'calendar-alt'],
    path: '/demands/',
    Component: lazy(() => import('screens/employee/DemandModule.screen')),
  },
  {
    name: 'Material Requests',
    icon: ['fas', 'notes-medical'],
    path: '/material-request/',
    Component: lazy(() => import('screens/employee/MaterialRequest.screen')),
  },
  {
    name: 'Allotment Dockets',
    icon: ['fas', 'truck-loading'],
    path: '/allotment-dockets/',
    Component: lazy(() => import('screens/employee/AllotmentDockets.screen.js')),
  },
  {
    name: 'Outward Docket',
    icon: ['fas', 'sign-out-alt'],
    path: '/outward-docket/',
    Component: lazy(() => import('screens/client/outwardDocket.screen')),
    props: {isEmployee: true},
  },
  {
    name: 'Return Dockets',
    icon: ['fas', 'undo-alt'],
    path: '/return-dockets/',
    Component: lazy(() => import('screens/employee/Return.screen')),
  },
  {
    name: 'Relocation Docket',
    icon: ['fas', 'money-check-alt'],
    path: '/relocation/',
    Component: lazy(() => import('screens/employee/Relocation.screen')),
    props: {isEmployee: true},
  },
  {
    name: 'GRN',
    icon: ['fas', 'cart-arrow-down'],
    path: '/grn/',
    Component: lazy(() => import('screens/employee/GRN.screen')),
  },
  // {
  //   name: 'Inventory',
  //   icon: ['fas', 'boxes'],
  //   path: '/inventory/',
  //   Component: lazy(() => import('screens/employee/inventory.screen')),
  // },
  {
    name: 'Inventory',
    icon: ['fas', 'boxes'],
    path: '/main-inventory/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Warehouse Inventory',
        path: '/main-inventory/yantra-inventory/',
        Component: lazy(() => import('screens/employee/yantraInventory.screen.employee')),
      },
      {
        name: 'InTransits',
        path: '/main-inventory/inventory-in-transits/',
        Component: lazy(() => import('screens/employee/transitInventory.screen')),
      },
      {
        name: 'Sender Client',
        path: '/main-inventory/inventory-clients/',
        Component: lazy(() => import('screens/employee/scInventoryMain.screen')),
      },
      // {
      //   name: 'Sender Client',
      //   path: '/main-inventory/inventory-clients/',
      //   Component: lazy(() => import('screens/employee/clientInventory.screen')),
      // },
      // {
      //   name: 'Sender Client II',
      //   path: '/main-inventory/sc-inventory-2/',
      //   Component: lazy(() => import('screens/employee/clientInventory2.screen')),
      // },
      {
        name: 'Receiver Client',
        path: '/main-inventory/inventory-rclients/',
        Component: lazy(() => import('screens/employee/rcInventoryMain.screen')),
      },
      // {
      //   name: 'Receiver Client',
      //   path: '/main-inventory/inventory-rclients/',
      //   Component: lazy(() => import('screens/employee/receiverClientInventory.screen')),
      // },
      // {
      //   name: 'Receiver Client II',
      //   path: '/main-inventory/rc-inventory-2/',
      //   Component: lazy(() => import('screens/employee/receiverClientInventory2.screen')),
      // },
      // {
      //   name: 'Adjustments',
      //   path: '/main-inventory/adjustments/',
      //   Component: lazy(() => import('screens/employee/adjustmentInventory.screen')),
      //   props: {isEmployee: true},
      // },
    ],
  },
  {
    name: 'Adjustments Inventory',
    icon: ['fas', 'boxes'],
    path: '/adjustments-inventory/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Warehouse Adjustments',
        path: '/adjustments-inventory/adjustments/',
        Component: lazy(() => import('screens/employee/adjustmentInventory.screen')),
        props: {isEmployee: true},
      },
      {
        name: 'Sender Client Adjustments',
        path: '/adjustments-inventory/sc-adjustments/',
        Component: lazy(() => import('screens/employee/adjustmentSCInventory.screen')),
        props: {isEmployee: true},
      },
      {
        name: 'Receiver Client Adjustments',
        path: '/adjustments-inventory/rc-adjustments/',
        Component: lazy(() => import('screens/employee/adjustmentRCInventory.screen')),
        props: {isEmployee: true},
      },
    ],
  },
  {
    name: 'Expense',
    icon: ['fas', 'money-check-alt'],
    path: '/expense/',
    Component: lazy(() => import('screens/employee/Expense.screen')),
    props: {isEmployee: true},
  },
  {
    name: 'Reports',
    icon: ['fas', 'chart-pie'],
    path: '/reports/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Volume Plan',
        path: '/reports/demands/',
        Component: lazy(() => import('components/Reports/Demand.js')),
      },
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
        name: 'Outwards',
        path: '/reports/outwards/',
        Component: lazy(() => import('components/Reports/Outward.js')),
      },
      {
        name: 'Floating',
        path: '/reports/stocking/',
        Component: lazy(() => import('components/Reports/Stocking.js')),
      },
      {
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
      {
        name: 'Loss/Excess',
        path: '/reports/loss-excess/',
        Component: lazy(() => import('components/Reports/LossExcess.js')),
      },
    ],
  },
  {
    name: 'Roles',
    icon: ['fas', 'money-check-alt'],
    path: '/roles/',
    Component: lazy(() => import('screens/employee/Roles.screen')),
    props: {isEmployee: true},
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
        name: 'Flows',
        icon: ['fas', 'layer-group'],
        path: '/client-flows/',
        Component: lazy(() => import('screens/client/clientFlows.screen')),
      },
      {
        name: 'Clients',
        path: '/master/clients/',
        Component: lazy(() => import('screens/client/ReceiverClient.screen')),
      },
    ],
  },
  {
    name: 'Material Requests',
    icon: ['fas', 'notes-medical'],
    path: '/material-request/',
    Component: lazy(() => import('screens/client/MaterialRequest.screen')),
    props: {isEmployee: false},
  },
  {
    name: 'Volume Plan',
    icon: ['far', 'calendar-alt'],
    path: '/demands/',
    Component: lazy(() => import('screens/client/DemandModule.screen')),
  },
  {
    name: 'My Allotments',
    icon: ['fas', 'truck-loading'],
    path: '/allotments/',
    Component: lazy(() => import('screens/client/Allotments.screen')),
  },
  {
    name: 'Outward Docket',
    icon: ['fas', 'sign-out-alt'],
    path: '/outward-docket/',
    props: {isEmployee: false},
    Component: lazy(() => import('screens/client/outwardDocket.screen')),
  },
  {
    name: 'Return Docket',
    icon: ['fas', 'chart-pie'],
    path: '/return-dockets/',
    Component: lazy(() => import('screens/client/returnReports.screen')),
  },
  {
    name: 'Inventory',
    icon: ['fas', 'boxes'],
    path: '/main-inventory/sc-inventory-2/',
    Component: lazy(() => import('screens/client/clientInventory2.screen')),
  },
  {
    name: 'Reports',
    icon: ['fas', 'chart-pie'],
    path: '/reports/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Volume Plans',
        path: '/reports/demands/',
        Component: lazy(() => import('components/Reports/DemandClientSide.js')),
      },
      {
        name: 'Allotments',
        path: '/reports/allotments/',
        Component: lazy(() => import('components/Reports/AllotmentClientSide.js')),
      },
      {
        name: 'Returns',
        path: '/reports/returns/',
        Component: lazy(() => import('components/Reports/ReturnClientSide.js')),
      },
      {
        name: 'Outwards',
        path: '/reports/outwards/',
        Component: lazy(() => import('components/Reports/OutwardClientSide.js')),
      },
      {
        name: 'Floating',
        path: '/reports/floating/',
        Component: lazy(() => import('components/Reports/StockingClientSide.js')),
      },
      {
        name: 'Loss/Excess',
        path: '/reports/loss-excess/',
        Component: lazy(() => import('components/Reports/LossExcessClientSide.js')),
      },
    ],
  },
];
