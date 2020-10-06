import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPTouchPointsFormFields = [
  {
    key: 'name',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Name',
    },
  },
  {
    key: 'phone',
    kwargs: {
      placeholder: 'Phone',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Phone',
  },
  {
    key: 'email',
    kwargs: {
      placeholder: 'Email',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
  },
  {
    key: 'designation',
    kwargs: {
      placeholder: 'Designation',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
  },
]
