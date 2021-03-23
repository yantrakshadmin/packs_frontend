import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

// const transactionTypeOptions = ['Allot', 'Return'];

// const statusOptions = ['Approved', 'Hold', 'Rejected'];

export const reasonOptions = [
  {reason: 'SR', text: 'Stocktaking Results'},
  {reason: 'SoF', text: 'Stock on Fire'},
  {reason: 'SG', text: 'Stolen Goods'},
  {reason: 'DG', text: 'Damaged Goods'},
  {reason: 'SWO', text: 'Stock Written Off'},
  {reason: 'IR', text: 'Inventory Revaluation'},
  {reason: 'PwS', text: "Proof wasn't Submitted"},
  {reason: 'IP', text: 'Invalid Proof'},
  {reason: 'PVA', text: 'PV Audit'},
];

export const adjustmentFormFields = [
  {
    key: 'reference_no',
    rules: [{required: true, message: 'Please enter Reference No!'}],
    kwargs: {
      placeholder: 'Reference No.',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Reference No.',
    colSpan: 6,
  },
  {
    key: 'date',
    rules: [{required: true, message: 'date!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: {
      style: {width: '100%'},
    },
    customLabel: 'Date',
    colSpan: 6,
  },
  {
    key: 'file',
    //rules: [{required: true, message: 'Please upload bill!'}],
    kwargs: {
      placeholder: 'Upload',
      multiple: true,
    },
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: {
      //p1: 'Click or drag single/multiple files.',
    },
    customLabel: 'Upload File',
    colSpan: 6,
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
    colSpan: 6,
  },
  {
    key: 'warehouse',
    rules: [{required: true, message: 'Please select reason!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    customLabel: 'Warehouse',
    colSpan: 6,
  },
];

export const adjustmentFlowFormFields = [
  {
    key: 'product',
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
    key: 'quantity',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Quantity Available',
      type: 'number',
      min: 0,
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity Available',
    colSpan: 4,
  },
  {
    key: 'new_quantity',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'New Qty. in hand',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'New Qty. in hand',
    colSpan: 4,
  },
  {
    key: 'quantity_adjusted',
    //rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Quantity Adjusted',
      type: 'number',
      min: 0,
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity Adjusted',
    colSpan: 4,
  },
  {
    key: 'reason',
    rules: [{required: true, message: 'Please select reason!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: reasonOptions,
      key: 'reason',
      customTitle: 'text',
    },
    customLabel: 'Reason',
    colSpan: 4,
  },
];

export const adjustmentClientEnvFormFields = [
  {
    key: 'client',
    rules: [{required: true, message: 'Please select Client!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Client',
    colSpan: 6,
  },
  {
    key: 'kit',
    rules: [{required: true, message: 'Please select Kit!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Kit',
    colSpan: 6,
  },
  {
    key: 'quantity',
    rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Quantity Available',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity Available',
    colSpan: 4,
  },
];
