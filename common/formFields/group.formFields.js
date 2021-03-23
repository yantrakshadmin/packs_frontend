import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const groupModelChoices = [
  'Demand',
  'Material Request',
  'Allotment',
  'Delivered',
  'Return',
  'Received',
  'Outward',
  'Inward',
  'Expense',
  'GRN',
  'Inventory',
  'Inventory Ledger',
  'Inventory Adjustments - Warehouse',
  'Sender Client Inventory',
  'Sender Client Inventory Ledger',
  'Sender Client Inventory Adjustments',
  'Receiver Client Inventory',
  'Receiver Client Inventory Ledger',
  'Receiver Client Inventory Adjustments',
  'Product',
  'Kit',
  'Flow',
  'Vendor',
  'Warehouse',
  'Receiver Client',
  'Leads',
  'PFEP',
  'Commercial Proposal',
];

export const groupFormFields = [
  {
    key: 'name',
    rules: [{required: true, message: 'Please enter Group Name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Group Name',
  },
  {
    key: 'emp',
    rules: [{required: true, message: 'Please select emp!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Employee',
    colSpan: 6,
  },
  {
    //key: 'solution_palletized_box',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'Palletized Box Solution',
    colSpan: 4,
  },
];
