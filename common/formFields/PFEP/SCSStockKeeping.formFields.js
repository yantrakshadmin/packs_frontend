import {FORM_ELEMENT_TYPES} from 'web/src/constants/formFields.constant';

export const Row01FF = [
  {
    key: 'sender',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Sender',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Sender',
    colSpan: 4,
  },
  {
    key: 'receiver',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Receiver',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver',
    colSpan: 4,
  },
  {
    key: 'min_volume',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Min. Volume Per Month',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Min. Volume Per Month',
    colSpan: 4,
  },
  {
    key: 'peak_volume',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Peak Volume Per Month',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Peak Volume Per Month',
    colSpan: 4,
  },
  {
    key: 'sender_inventory',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Sender Inventory TAT',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Sender Inventory TAT',
    colSpan: 4,
  },
  {
    key: 'sender_warehouse',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Sender Warehouse TAT',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Sender Warehouse TAT',
    colSpan: 4,
  },
  {
    key: 'transit_time',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Transit Time',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Transit Time',
    colSpan: 3,
  },
  {
    key: 'receiver_inventory',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Receiver Inventory TAT',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Inventory TAT',
    colSpan: 4,
  },
  {
    key: 'receiver_warehouse',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Receiver Warehouse TAT',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver Warehouse TAT',
    colSpan: 4,
  },
  {
    key: 'return_tat',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Return TAT',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Return TAT',
    colSpan: 3,
  },
  {
    key: 'total_cycle_time',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Total Cycle Time',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Cycle Time',
    colSpan: 3,
  },
  {
    key: 'dispatch_frequency',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Dispatch Frequency',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Dispatch Frequency',
    colSpan: 3,
  },
  {
    key: 'remarks',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Remarks',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
    colSpan: 3,
  },
];
