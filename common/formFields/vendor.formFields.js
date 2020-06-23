import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';
import {vendorTypesOptions} from 'common/formFields/vendorTypesOptions';

export const vendorFormFields = [
  {
    key: 'name',
    rules: [{required: true, message: 'Please enter name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'street',
    rules: [{required: true, message: 'Please enter name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Street',
  },
  {
    key: 'city',
    rules: [{required: true, message: 'Please enter city!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'City',
  },
  {
    key: 'pincode',
    rules: [{required: true, message: 'Please enter pincode!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Pincode',
  },
  {
    key: 'state',
    rules: [{required: true, message: 'Please enter state!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'State',
  },
  {
    key: 'contact_person_name',
    rules: [{required: true, message: 'Please enter contact person name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Contact Person Name',
  },
  {
    key: 'contact_person_no',
    rules: [{required: true, message: 'Please enter contact person number!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Contact Person Number',
  },
  {
    key: 'email',
    rules: [
      {required: true, message: 'Please enter email!'},
      {
        type: 'email',
        message: 'Please enter a valid email',
      },
    ],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email',
  },
  {
    key: 'type',
    rules: [{required: true, message: 'Please enter type!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: vendorTypesOptions,
    },
    customLabel: 'Type',
  },
  {
    key: 'payment_terms',
    rules: [{required: true, message: 'Please enter payment terms!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Payment Terms',
  },
  {
    key: 'pan',
    rules: [{required: true, message: 'Please enter PAN!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {uppercase: true},
    customLabel: 'PAN',
  },
  {
    key: 'gst',
    rules: [{required: true, message: 'Please enter GST!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {uppercase: true},
    customLabel: 'GST',
  },
  {
    key: 'code',
    rules: [{required: true, message: 'Please enter code!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Code',
  },
  {
    key: 'remarks',
    rules: [{required: true, message: 'Please enter remarks!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
  {
    key: 'beneficiary_name',
    rules: [{required: true, message: 'Please enter beneficiary name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Beneficiary Name',
  },

  {
    key: 'account_no',
    rules: [{required: true, message: 'Please enter account number!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Account Number',
  },
  {
    key: 'bank_name',
    rules: [{required: true, message: 'Please enter bank name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Bank Name',
  },
  {
    key: 'ifsc',
    rules: [{required: true, message: 'Please enter IFSC!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'IFSC',
  },
];
