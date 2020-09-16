import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPCycleTimeFormFields = [
  {
    key: 'minimum',
    customLabel: 'Minimum Days',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      type:'number',
      placeholder: 'Minimum Days',
    },
  },{
    key: 'maximum',
    customLabel: 'Maximum Days',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      type:'number',
      placeholder: 'Maximum Days',
    },
  },
]
