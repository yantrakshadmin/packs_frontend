import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const clientFormFields = [
  {
    key: 'employee_name',
    rules: [{required: true, message: 'Please enter name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'employee_email',
    rules: [{required: true, message: 'Please enter email!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email Address',
  },
  {
    key: 'employee_phone',
    rules: [{required: true, message: 'Please enter phone!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Phone No.',
  },
  {
    key: 'employee_city',
    rules: [{required: true, message: 'Please enter City!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'City',
  },
];

// export const mailingListFormFields = [
//   {
//     key: 'mailing_list',
//     kwargs: {
//       placeholder: 'Mailing List',
//     },
//     type: FORM_ELEMENT_TYPES.INPUT,
//     customLabel: 'Mailing List',
//   },
// ];
