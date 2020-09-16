import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPCreationFormFields = [
  {
    key: 'proposal_for_client',
    customLabel: 'Proposal For Client',
    rules: [{ required: true, message: 'Please enter Proposal for Client!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Proposal For Client',
    },
  },

  {
    key: 'sender_client',
    rules: [{ required: true, message: 'Please enter Sender Client!' }],
    kwargs: {
      placeholder: 'Sender Client',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Sender Client',
  },
  {
    key: 'sender_location',
    rules: [{ required: true, message: 'Please enter Sender Location!' }],
    kwargs: {
      placeholder: 'Sender Location',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Sender Location',
  },
  {
    key: 'receiver_client',
    rules: [{ required: true, message: 'Please enter Receiver Client!' }],
    kwargs: {
      placeholder: 'Receiver Client',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Client',
  },{
    key: 'receiver_location',
    rules: [{ required: true, message: 'Please enter Receiver Location!' }],
    kwargs: {
      placeholder: 'Receiver Location',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Location',
  },
]
