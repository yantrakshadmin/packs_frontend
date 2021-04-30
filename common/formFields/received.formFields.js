import {FORM_ELEMENT_TYPES} from 'web/src/constants/formFields.constant';

export const ReceivedFormFields = [
  {
    key: 'transaction_no',
    kwargs: {
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Transaction No.',
  },
  {
    key: 'delivered',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: null,
    customLabel: 'Mark Delivered Successfully',
  },
  {
    key: 'receiving_date',
    rules: [{required: true, message: 'Please enter Receiving date!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Receiving Date',
  },
  {
    key: 'document',
    //rules: [{ required: true, message: 'File is Required!' }],
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: null,
    customLabel: 'Document',
  },
];

export const ReceivedProductFormFields = [
  {
    key: 'product',
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Product',
  },
  {
    key: 'quantity',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Received Quantity',
  },
  {
    key: 'fault',
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Fault',
  },
  {
    key: 'actual_quantity',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Actual Quantity',
  },
];
