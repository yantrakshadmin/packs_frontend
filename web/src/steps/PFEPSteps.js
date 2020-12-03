import { lazy } from 'react';

export const PFEPSteps = [
  {
    title: 'Basic Details',
    icon: 'user',
    component: lazy(() => import('web/src/forms/PFEP/PFEPBasicDetails.form')),
  },
  // {
  //   title: 'PFEP Creation',
  //   icon: 'solution',
  //   component: lazy(() => import('web/src/forms/PFEP/PFEPCreation.form')),
  // },
  {
    title: 'Product Details',
    icon: 'file-protect',
    component: lazy(() => import('web/src/forms/PFEP/PFEPProductDetails.form')),
  },
  {
    title: 'Existing Packaging Material',
    icon: 'user-add',
    component: lazy(() => import('web/src/forms/PFEP/PFEPExsitingPM.form')),
  },
  // {
  //   title: 'Cycle Time',
  //   icon: 'user',
  //   component: lazy(() => import('web/src/forms/PFEP/PFEPCycleTIme.form')),
  // },
  {
    title: 'Stock Keeping',
    icon: 'solution',
    component: lazy(() => import('web/src/forms/PFEP/PFEPStockKeeping.form')),
  },
  // {
  //   title: 'Touch Points',
  //   icon: 'file-protect',
  //   component: lazy(() => import('web/src/forms/PFEP/PFEPTouchPoints.form')),
  // },
  // {
  //   title: 'Material Handling Equipments',
  //   icon: 'user-add',
  //   component: lazy(() => import('web/src/forms/PFEP/PFEPMaterialHandlingEquipment.form')),
  // },
  {
    title: 'Solution Required',
    icon: 'user-add',
    component: lazy(() => import('web/src/forms/PFEP/PFEPSolutionRequired.form')),
  },
  {
    title: 'Status',
    icon: 'file-protect',
    component: lazy(() => import('web/src/forms/PFEP/PFEPStatus.form')),
  },
];
