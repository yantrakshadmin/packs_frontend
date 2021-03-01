import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

const transactionTypeOptions = ['Allot', 'Return'];

const statusOptions = ['Approved', 'Hold', 'Rejected'];

export const expenseFormFields = [
  {
    key: 'invoice_date',
    rules: [{required: true, message: 'Please select invoice date!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Invoice Date',
    colSpan: 6,
  },
  {
    key: 'invoice_number',
    rules: [{required: true, message: 'Please enter invoice number!'}],
    kwargs: {
      placeholder: 'Invoice Number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Invoice Number',
    colSpan: 6,
  },
  {
    key: 'vendor',
    rules: [{required: true, message: 'Please select transport vendor!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transport Vendor',
    colSpan: 6,
  },
  {
    key: 'bill',
    //rules: [{required: true, message: 'Please upload bill!'}],
    kwargs: {
      placeholder: 'Upload',
      multiple: true,
    },
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: {
      //p1: 'Click or drag single/multiple files.',
    },
    customLabel: 'Upload Bill',
    colSpan: 6,
  },
  {
    key: 'amount',
    rules: [{required: true, message: 'Please enter amount!'}],
    kwargs: {
      placeholder: 'Amount',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Amount',
    colSpan: 6,
  },
  {
    key: 'gst',
    rules: [{required: true, message: 'Please enter gst(%)!'}],
    kwargs: {
      placeholder: 'GST (%)',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'GST (%)',
    colSpan: 6,
  },
  {
    key: 'total_amount',
    //rules: [{required: true, message: 'Please enter total amount!'}],
    kwargs: {
      placeholder: 'Total Amount',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Amount',
    colSpan: 6,
  },
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
    key: 'status',
    rules: [{required: true, message: 'Please select status!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: statusOptions},
    customLabel: 'Status',
    colSpan: 6,
  },
];

export const expenseFlowFormFields = [
  {
    key: 't_no',
    rules: [{required: true, message: 'Please select transaction!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transaction Number',
    colSpan: 4,
  },
  {
    key: 'f_mile',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'First Mile',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'First Mile',
    colSpan: 3,
  },
  {
    key: 'long_haul',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Long Haul',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Long Haul',
    colSpan: 3,
  },
  {
    key: 'l_mile',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Last Mile',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Last Mile',
    colSpan: 3,
  },
  {
    key: 'labour',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Labour',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Labour',
    colSpan: 3,
  },
  {
    key: 'others',
    //rules: [{required: true, message: 'Please select quantity!'}],
    kwargs: {
      placeholder: 'Others',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Others',
    colSpan: 3,
  },
  {
    key: 'total_cost',
    rules: [{required: true, message: 'Must be greater than 0!'}],
    kwargs: {
      placeholder: 'Total Cost',
      type: 'number',
      min: 0,
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Cost',
    colSpan: 3,
  },
];
