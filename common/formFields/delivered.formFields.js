import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const DeliveredFormFields = [
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
    customLabel: 'Mark Successfully Delivered',
  },
  {
    key: 'delivered_date',
    rules: [{ required: true, message: 'Please enter Delivery date!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Delivery Date',
  },
  {
    key: 'document',
    rules: [{ required: true, message: 'File is Required!' }],
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: null,
    customLabel: 'Document',
  },
];

export const DeliveredProductFormFields = [
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
    customLabel: 'Quantity',
  },
  {
    key: 'fault',
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Fault',
  },
];
