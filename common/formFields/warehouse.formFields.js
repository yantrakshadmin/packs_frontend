import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const wareHouseFormFields = [
  {
    key: 'name',
    rules: [{required: true, message: 'Please enter warehouse name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Warehouse Name',
  },
  {
    key: 'email',
    rules: [
      {required: true, message: 'Please enter warehouse name!'},
      {type: 'email', message: 'Please eneter a valid email'},
    ],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Warehouse Email',
  },
  {
    key: 'contact',
    rules: [{required: true, message: 'Please enter warehouse contact!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Warehouse Contact',
  },
  {
    key: 'address',
    rules: [{required: true, message: 'Please enter warehouse address!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Warehouse Address',
  },
  {
    key: 'city',
    rules: [{required: true, message: 'Please enter warehouse city!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Warehouse City',
  },
  {
    key: 'pincode',
    rules: [{required: true, message: 'Please enter warehouse pincode!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Warehouse Pincode',
  },
  {
    key: 'state',
    rules: [{required: true, message: 'Please enter warehouse state!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Warehouse State',
  },
  {
    key: 'pan',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {uppercase: true},
    customLabel: 'Warehouse PAN',
  },
  {
    key: 'gst',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {uppercase: true},
    customLabel: 'Warehouse GST',
  },

  {
    key: 'document',
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: null,
    customLabel: 'Document',
  },
  {
    key: 'active',
    type: FORM_ELEMENT_TYPES.SWITCH,
    label: 'Active',
  },
];
