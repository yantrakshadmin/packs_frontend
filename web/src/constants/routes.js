import { lazy } from 'react';

export const publicRoutes = [
  { Component: lazy(() => import('screens/signIn.screen')), path: '/' },
  {
    Component: lazy(() => import('screens/404.screen')),
    path: '/sign-up/shipper/',
  },
  {
    Component: lazy(() => import('screens/404.screen')),
    path: '/sign-up/supplier/',
  },
];

export const extraRoutesShipper = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/',
    Component: lazy(() => import('screens/404.screen')),
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
    Component: lazy(() => import('screens/404.screen')),
  },
];
export const extraRoutesSupplierPTL = [
  {
    path: '/',
    Component: lazy(() => import('screens/404.screen')),
  },
];
export const shipperRoutes = [
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
    isSubMenu: true,
    subMenu: [
      {
        name: 'Item',
        path: '/master/item/',
        Component: lazy(() => import('screens/404.screen')),
      },
      {
        name: 'Vendor',
        path: '/master/vendor/',
        Component: lazy(() => import('screens/404.screen')),
      },
      {
        name: 'Address',
        path: '/master/address/',
        Component: lazy(() => import('screens/404.screen')),
      },
    ],
  },
  {
    name: 'Sales Order',
    icon: ['fas', 'layer-group'],
    path: '/sales-orders/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Freight Exchange',
    icon: ['fas', 'layer-group'],
    path: '/freight-exchange/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Live Trucks',
    icon: ['fas', 'layer-group'],
    path: '/live-trucks/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Shipping',
    icon: ['fas', 'compass'],
    path: '/shipping/',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    name: 'Transport Directory',
    icon: ['fas', 'layer-group'],
    path: '/transport-directory/',
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
