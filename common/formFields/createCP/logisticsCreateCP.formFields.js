// min_warehouse = models.FloatField(default=0, blank=True, null=True)
// transportation_w1_c1 = models.FloatField(default=0, blank=True, null=True)
// transportation_c2_w2 = models.FloatField(default=0, blank=True, null=True)
// transportation_w2_w1 = models.FloatField(default=0, blank=True, null=True)
// total_cost_supply_chain = models.FloatField(default=0, blank=True, null=True)
// labor_cost_perton = models.FloatField(default=0, blank=True, null=True)
// repair_reconditioning = models.FloatField(default=0, blank=True, null=True)
// other_cost = models.FloatField(default=0, blank=True, null=True)
// total_cost = models.FloatField(default=0, blank=True, null=True)
//

import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const logisticCreateCPFormFields = [
  {
    key: 'min_warehouse',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Minimum Warehouse',
    },
    others: {
      formOptions:{ noStyle:true }

    },
    customLabel: 'Minimum Warehouse'
  },
  {
    key: 'transportation_w1_c1',
    kwargs: {
      placeholder: 'Transportation W1 C1',
    },
    others: {
      formOptions:{ noStyle:true }

    },    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Transportation W1 C1',
  },
  {
    key: 'transportation_c2_w2',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Transportation C2 W2',
    },
    others: {
      formOptions:{ noStyle:true }

    },    customLabel: 'Transportation C2 W2'
  },
  {
    key: 'transportation_w2_w1',
    kwargs: {
      placeholder: 'Transportation W2 W1',
    },
    others: {
      formOptions:{ noStyle:true }

    },    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Transportation W2 W1',
  },
  {
    key: 'total_cost_supply_chain',
    kwargs: {
      placeholder: 'Total Cost Supply Chain',
      disabled: true,
    },
    others: {
      formOptions:{ noStyle:true }

    },    type: FORM_ELEMENT_TYPES.INPUT,

    customLabel: 'Total Cost Supply Chain',
  },
  {
    key: 'labor_cost_perton',
    kwargs: {
      placeholder: 'Labour Cost Perton',

    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions:{ noStyle:true }

    },
    customLabel: 'Labour Cost Perton',
  },
  {
    key: 'repair_reconditioning',
    kwargs: {
      placeholder: 'Repair Reconditioning',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions:{ noStyle:true }

    },
    customLabel: 'Repair Reconditioning',
  },
  {
    key: 'other_cost',
    kwargs: {
      placeholder: 'Other Cost',

    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions:{ noStyle:true }

    },
    customLabel: 'Other Cost',
  },
  {
    key: 'total_cost',
    kwargs: {
      placeholder: 'Total Cost',
      disabled: true,

    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions:{ noStyle:true }

    },
    customLabel: 'Total Cost',
  },

]
