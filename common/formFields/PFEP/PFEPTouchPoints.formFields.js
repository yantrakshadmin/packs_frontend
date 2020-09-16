import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPTouchPointsFormFields = [
  {
    key: 'name',
    rules: [{ required: true, message: 'Please enter Name!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Name',
    },
  },
  {
    key: 'phone',
    rules: [{ required: true, message: 'Please enter Phone!' }],
    kwargs: {
      placeholder: 'Phone',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Phone',
  },
  {
    key: 'email',
    rules: [{ required: true, message: 'Please enter  Email!' }],
    kwargs: {
      placeholder: 'Email',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
  }
]
