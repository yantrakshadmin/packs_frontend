import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPStockKeepingFormFields = [
  {
    key: 'emitter_inv',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Emitter Inventory',
    },
    customLabel: 'Emitter Inventory',
  },
  {
    key: 'transit_time',
    kwargs: {
      placeholder: 'Transit time',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Transit time',
  },
  {
    key: 'wh_emitter',
    kwargs: {
      placeholder: 'Warehouse Emitter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Warehouse Emitter',
  },
  {
    key: 'wh_receiver',
    kwargs: {
      placeholder: 'Warehouse Receiver',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Warehouse Receiver',
  },
  {
    key: 'other_storage',
    kwargs: {
      placeholder: 'Other Storage',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Other Storage',
  },
  {
    key: 'receiver_inv',
    kwargs: {
      placeholder: 'Receiver Inventory',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Receiver Inventory',
  },
]
