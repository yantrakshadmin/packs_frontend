import { FORM_ELEMENT_TYPES } from '../../web/src/constants/formFields.constant';

export const materialRequestFormFields = [
  {
    key: 'delivery_required_on',
    rules: [{ required: true, message: 'Please select delivery date!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Delivery Required On',
  },
];

export const materialRequestFlowFormFields = [
  {
    key: 'flow',
    rules: [{ required: true, message: 'Please select flow!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Flow',
  },
  {
    key: 'kit',
    rules: [{ required: true, message: 'Please select kit!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Kit',
  },
  {
    key: 'quantity',
    rules: [{ required: true, message: 'Please select quantity!' }],
    kwargs: {
      placeholder: 'Select',
      type: 'number',
      min : 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
];
