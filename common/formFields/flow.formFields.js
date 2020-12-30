import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const flowFormFields = [
  {
    key: 'flow_name',
    rules: [{required: true, message: 'Please enter flow name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Flow Name',
  },
  {
    key: 'flow_info',
    rules: [{required: true, message: 'Please enter flow info!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Flow Info',
  },
  {
    key: 'flow_type',
    rules: [{required: true, message: 'Please select flow type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: ['Static', 'Transit', 'Circuit', 'Close']},
    customLabel: 'Flow Type',
  },
  {
    key: 'flow_days',
    rules: [{required: true, message: 'Please enter flow days!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Flow Days',
  },
  {
    key: 'sender_client',
    rules: [{required: true, message: 'Please select sender client!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Sender Client',
  },
  {
    key: 'receiver_client',
    rules: [{required: true, message: 'Please select receiver client!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Receiver Client',
  },
  {
    key: 'active',
    type: FORM_ELEMENT_TYPES.SWITCH,
    label: 'Active',
  },
];
