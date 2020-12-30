import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';
import {vendorTypesOptions} from 'common/formFields/vendorTypesOptions';

export const vendorFormFields = [
  {
    key: 'name',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'street',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Street',
  },
  {
    key: 'city',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'City',
  },
  {
    key: 'pincode',
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
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'State',
  },
  {
    key: 'contact_person_name',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Contact Person Name',
  },
  {
    key: 'contact_person_no',
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

    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email',
  },
  {
    key: 'type',
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
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Payment Terms',
  },
  {
    key: 'pan',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {uppercase: true},
    customLabel: 'PAN',
  },
  {
    key: 'gst',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {uppercase: true},
    customLabel: 'GST',
  },
  {
    key: 'code',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Code',
  },
  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
  {
    key: 'beneficiary_name',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Beneficiary Name',
  },

  {
    key: 'account_no',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Account Number',
  },
  {
    key: 'bank_name',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Bank Name',
  },
  {
    key: 'ifsc',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'IFSC',
  },
  {
    key: 'active',
    type: FORM_ELEMENT_TYPES.SWITCH,
    label: 'Active',
  },
];
