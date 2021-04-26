import {lazy} from 'react';

export const SCSSteps = [
  {
    title: 'Basic Details',
    icon: 'user',
    component: lazy(() => import('web/src/forms/PFEP/SCSBasicDetails.form')),
  },
  {
    title: 'Stock Keeping',
    icon: 'solution',
    component: lazy(() => import('web/src/forms/PFEP/SCSStockKeeping.form')),
  },
  {
    title: 'Existing Packaging Details',
    icon: 'file-protect',
    component: lazy(() => import('web/src/forms/PFEP/SCSExistingPackagingDetails.form')),
  },
  //   {
  //     title: 'Solution Required',
  //     icon: 'user-add',
  //     component: lazy(() => import('web/src/forms/PFEP/PFEPSolutionRequired.form')),
  //   },
  //   {
  //     title: 'Status',
  //     icon: 'file-protect',
  //     component: lazy(() => import('web/src/forms/PFEP/PFEPStatus.form')),
  //   },
];
