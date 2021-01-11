import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const kitProductsFormFields = [
  {
    key: 'product',
    rules: [{required: true, message: 'Please select product!'}],
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Product',
  },
  {
    key: 'quantity',
    rules: [{required: true, message: 'Please enter quantity!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
      min : 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
];
