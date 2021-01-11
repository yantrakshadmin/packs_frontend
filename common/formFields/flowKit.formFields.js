import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const flowKitsFormFields = [
  {
    key: 'kit',
    rules: [{required: true, message: 'Please select kit!'}],
    type: FORM_ELEMENT_TYPES.SELECT,
    kwargs: {
      placeholder: 'Select',
    },
    others: null,
    customLabel: 'Kit',
  },
  {
    key: 'quantity',
    rules: [{required: true, message: 'Please enter quantity!'}],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
      min : 0,
    },
    others: null,
    customLabel: 'Quantity',
  },
  {
    key: 'component_pm',
    rules: [{required: true, message: 'Please enter components pm!'}],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      type: 'number',
      disabled: true,
    },
    others: null,
    customLabel: 'Components PM',
  },
  {
    key: 'trip_cost',
    rules: [{required: true, message: 'Please select trip cost!'}],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    others: null,
    customLabel: 'Trip Cost',
  },
];
