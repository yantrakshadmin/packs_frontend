import { lazy } from 'react';

export const CreateCPStep = [
  {
    title: 'Basic Details',
    icon: 'user',
    component: lazy(() => import('web/src/forms/CreateCP/basicDetialsCreateCP.form')),
  },
  {
    title: 'Capex',
    icon: 'user',
    component: lazy(() => import('web/src/forms/CreateCP/solutionProposalCreateCP.form')),
  },
  {
    title: 'Opex',
    icon: 'user',
    component: lazy(() => import('web/src/forms/CreateCP/logisticsCreateCP.form')),
  },
  {
    title: 'Summary',
    icon: 'user',
    component: lazy(() => import('web/src/forms/CreateCP/operatingCostMonthlyCreateCP.form')),
  },

]
