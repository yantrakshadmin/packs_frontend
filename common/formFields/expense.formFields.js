import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

const transactionTypeOptions = ['Allot', 'Return'];

export const expenseFormFields = [
  {
    key: 'invoice_date',
    // rules: [{required: true, message: 'Please select invoice date!'}],
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
    // rules: [{required: true, message: 'Please enter invoice number!'}],
    kwargs: {
      placeholder: 'Invoice Number',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Invoice Number',
    colSpan: 6,
  },
  {
    key: 'vendor',
    // rules: [{required: true, message: 'Please select vendor!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Vendor',
    colSpan: 6,
  },
  {
    key: 'bill',
    // rules: [{required: true, message: 'Please upload bill!'}],
    kwargs: {
      placeholder: 'Upload',
      multiple: true,
    },
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: {
      p1: 'Click or drag single/multiple files.',
    },
    customLabel: 'Upload Bill',
    colSpan: 6,
  },
  {
    key: 'total_amount',
    // rules: [{required: true, message: 'Please enter total amount!'}],
    kwargs: {
      placeholder: 'Total Amount',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Amount',
    colSpan: 6,
  },
  {
    key: 'amount_exc_gst',
    // rules: [{required: true, message: 'Please enter amount exc gst!'}],
    kwargs: {
      placeholder: 'Amount Excluding GST',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Amount Excluding GST',
    colSpan: 6,
  },
  {
    key: 'transaction_type',
    // rules: [{required: true, message: 'Please select transaction type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: transactionTypeOptions},
    customLabel: 'Transaction Type',
    colSpan: 6,
  },
];

export const expenseFlowFormFields = [
  {
    key: 'transaction_no',
    // rules: [{required: true, message: 'Please select vendor!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      // filterOption: (input, option) =>
      //   option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transaction Number',
    colSpan: 7,
  },
  {
    key: 'first_mile',
    // rules: [{required: true, message: 'Please select quantity!'}],
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
    // rules: [{required: true, message: 'Please select quantity!'}],
    kwargs: {
      placeholder: 'Select',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Long Haul',
    colSpan: 3,
  },
  {
    key: 'last_mile',
    // rules: [{required: true, message: 'Please select quantity!'}],
    kwargs: {
      placeholder: 'Select',
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
    // rules: [{required: true, message: 'Please select quantity!'}],
    kwargs: {
      placeholder: 'Select',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Labour',
    colSpan: 3,
  },
  {
    key: 'other',
    // rules: [{required: true, message: 'Please select quantity!'}],
    kwargs: {
      placeholder: 'Select',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Other',
    colSpan: 3,
  },
];
