import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPBasicDetailsFormFields = [
  {
    key: 'date',
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
  },
  {
    key: 'contact_person',
    kwargs: {
      placeholder: 'Contact Person Name',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Contact Person Name',
  },
  {
    key: 'designation',
    kwargs: {
      placeholder: 'Designation',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
  },
  {
    key: 'email',
    kwargs: {
      placeholder: 'Email',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email',
  },
  {
    key: 'contact_no',
    kwargs: {
      placeholder: 'Contact Number',
      type:'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Contact Number',
  },
]
