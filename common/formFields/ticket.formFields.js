import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

const transactionTypeOptions = ['Allotment', 'Return', 'GRN', 'Delivered', 'Received', 'Relocation'];
const criticalityOptions = ['Normal', 'Urgent', 'Critical'];
const statusOptions = ['Hold', 'Assigned', 'Unassigned', 'Resolved'];
const faultOptions = ['Pilferage', 'Damage', 'Others', 'Excess', 'Lost', 'Shortage']

export const ticketFormFields = [
  {
    key: 'assigned_to',
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Assigned To',
    colSpan: 8,
  },
  {
    key: 'transaction_type',
    rules: [{required: true, message: 'Please select Transaction Type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: transactionTypeOptions},
    customLabel: 'Transaction Type',
    colSpan: 8,
  },
  {
    key: 't_no',
    rules: [{required: true, message: 'Please select Transaction No.!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search ? option.search.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 : false,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transaction Number',
    colSpan: 8,
  },
  {
    key: 'status',
    rules: [{required: true, message: 'Please select status!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: statusOptions},
    customLabel: 'Status',
    colSpan: 8,
  },
  {
    key: 'criticality',
    rules: [{required: true, message: 'Please select Criticality!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: criticalityOptions},
    customLabel: 'Criticality',
    colSpan: 8,
  },
  {
    key: 'remarks',
    rules: [{required: true, message: 'Please enter Remarks!'}],
    kwargs: {
      placeholder: 'Remarks',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
    colSpan: 8,
  },

];

export const ticketFlowFormFields = [
  {
    key: 'transaction_type',
    rules: [{required: true, message: 'Please select transaction type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: transactionTypeOptions},
    customLabel: 'Transaction Type',
    colSpan: 6,
  },
  {
    key: 'item',
    rules: [{required: true, message: 'Please select product!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Product',
    colSpan: 6,
  },
  {
    key: 'item_quantity',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Quantity',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
    colSpan: 6,
  },
  {
    key: 'fault',
    rules: [{required: true, message: 'Please select fault!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: faultOptions},
    customLabel: 'Fault',
    colSpan: 6,
  },
];
