import { lazy } from 'react';

export const CreateCPStep = [
  {
    title: 'Basic Details',
    icon: 'user',
    component: lazy(() => import('web/src/forms/CreateCP/basicDetialsCreateCP.form')),
  },
  {
    title: 'Solution Proposal and Other Solution',
    icon: 'user',
    component: lazy(() => import('web/src/forms/CreateCP/solutionProposalCreateCP.form')),
  },
  {
    title: 'Logistics Details',
    icon: 'user',
    component: lazy(() => import('web/src/forms/CreateCP/logisticsCreateCP.form')),
  },

]
