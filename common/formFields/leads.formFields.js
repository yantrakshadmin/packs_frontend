import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const allotmentFormFields = [
  {
    key: 'sales_order',
    rules: [{required: true, message: 'Please select sales order ID!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,

    customLabel: 'Sales Order ID',
  },
];
