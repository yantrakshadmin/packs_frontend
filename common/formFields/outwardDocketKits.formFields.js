import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const outwardDocketKitFormFields = [
  {
    key: 'kit',
    rules: [{ required: true, message: 'Please select kit!' }],
    type: FORM_ELEMENT_TYPES.SELECT,
    kwargs: {
      placeholder: 'Select',
    },
    others: null,
    customLabel: 'Kit',
  },
  {
    key: 'quantity_parts',
    rules: [{ required: true, message: 'Please enter quantity of parts!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
      min : 0,
    },
    others: null,
    customLabel: 'Quantity Part',
  },
  {
    key: 'quantity_kit',
    rules: [{ required: true, message: 'Please enter quantity of kits!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      type: 'number',
      min : 0,
    },
    others: null,
    customLabel: 'Kit Quantity',
  },
]
