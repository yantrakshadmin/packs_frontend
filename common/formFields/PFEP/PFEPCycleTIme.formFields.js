import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPCycleTimeFormFields = [
  {
    key: 'min_cycle_days',
    customLabel: 'Minimum Days',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      type:'number',
      placeholder: 'Minimum Days',
    },
  },{
    key: 'max_cycle_days',
    customLabel: 'Maximum Days',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      type:'number',
      placeholder: 'Maximum Days',
    },
  },{
    key: 'yantra_cycle',
    customLabel: 'Yantra Cycle',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Yantra Cycle',
    },
  },
]
