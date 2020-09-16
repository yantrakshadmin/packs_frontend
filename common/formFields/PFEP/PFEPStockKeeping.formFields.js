import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPStockKeepingFormFields = [
  {
    key: 'emitter_inventory',
    rules: [{ required: true, message: 'Please enter Emitter Inventory!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Emitter Inventory',
    },
  },
  {
    key: 'transit_time',
    rules: [{ required: true, message: 'Please enter Transit time!' }],
    kwargs: {
      placeholder: 'Transit time',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Transit time',
  },
  {
    key: 'emitter_location',
    rules: [{ required: true, message: 'Please enter  Emitter location!' }],
    kwargs: {
      placeholder: 'Emitter location',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Emitter location',
  },{
    key: 'receiver_location',
    rules: [{ required: true, message: 'Please enter  Receiver location!' }],
    kwargs: {
      placeholder: 'Receiver location',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Receiver location',
  },
  {
    key: 'other_storage',
    rules: [{ required: true, message: 'Please enter Other Storage!' }],
    kwargs: {
      placeholder: 'Other Storage',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Other Storage',
  },
  {
    key: 'receiver_inventory',
    rules: [{ required: true, message: 'Please enter Receiver Inventory!' }],
    kwargs: {
      placeholder: 'Receiver Inventory',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Receiver Inventory',
  },
]
