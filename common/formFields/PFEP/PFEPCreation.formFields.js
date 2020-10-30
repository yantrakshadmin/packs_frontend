import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPCreationFormFields = [
  {
    key: 'proposal_for_client',
    customLabel: 'Proposal For Client',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Proposal For Client',
    },
  },

  {
    key: 'sender_client',
    kwargs: {
      placeholder: 'Sender Client',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Sender Client',
  },
  {
    key: 'sender_location',
    kwargs: {
      placeholder: 'Sender Location',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Sender Location',
  },
  {
    key: 'name',
    kwargs: {
      placeholder: 'Receiver Client',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Client',
  },{
    key: 'location',
    kwargs: {
      placeholder: 'Receiver Location',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Location',
  },
]
