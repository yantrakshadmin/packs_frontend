import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPCycleTimeFormFields = [
  {
    key: 'minimum',
    customLabel: 'Minimum Days',
    rules: [{ required: true, message: 'Please enter minimum days!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      type:'number',
      placeholder: 'Minimum Days',
    },
  },{
    key: 'maximum',
    customLabel: 'Maximum Days',
    rules: [{ required: true, message: 'Please enter maximum days!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      type:'number',
      placeholder: 'Maximum Days',
    },
  },
]
