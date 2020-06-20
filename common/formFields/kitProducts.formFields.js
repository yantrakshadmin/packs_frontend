import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const kitProductsFormFields = [
  {
    key: 'product',
    rules: [{required: true, message: 'Please enter product id!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Product ID',
  },
  {
    key: 'quantity',
    rules: [{required: true, message: 'Please enter quantity!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
];
