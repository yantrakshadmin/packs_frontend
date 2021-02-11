import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const returnFormFields = [
  {
    key: 'transaction_type',
    rules: [{required: true, message: 'Please select transaction type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: ['Return', 'Damage', 'Swap Return', 'Job Work', 'Sample Return'],
    },
    customLabel: 'Transaction Type',
  },
  {
    key: 'transaction_date',
    rules: [{required: true, message: 'Please select transaction date!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Transaction Date',
  },
  {
    key: 'warehouse',
    rules: [{required: true, message: 'Please select warehouse!'}],
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Warehouse',
  },
  {
    key: 'receiver_client',
    rules: [{required: true, message: 'Please select receiver client!'}],
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Receiver Client',
  },
  {
    key: 'flow',
    rules: [{required: true, message: 'Please select flow!'}],
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Flow',
  },
  {
    key: 'driver_name',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Driver Name',
  },
  {
    key: 'driver_number',
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Driver Number',
  },
  {
    key: 'lr_number',
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'LR Number',
  },
  {
    key: 'vehicle_number',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Vehicle Number',
  },
  {
    key: 'freight_charges',
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Freight Charges',
  },
  {
    key: 'vehicle_type',
    rules: [{required: true, message: 'Please select vehicle type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: [
        'Part Load',
        'Tata ACE / Pick-Up',
        'TATA-407',
        '17ft Vehicle',
        '19ft Vehicle',
        '20ft Vehicle',
        '22ft Vehicle',
        '32ft SXL',
        '32ft MXL',
        'Any Other Type',
      ],
    },
    customLabel: 'Vehicle Type',
  },
  {
    key: 'transport_by',
    rules: [{required: true, message: 'Please enter transport by!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transport By',
  },
  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
];

export const returnKitFormFields = [
  {
    key: 'kit',
    rules: [{required: true, message: 'Please select kit!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Kit',
  },
  {
    key: 'quantity',
    rules: [{required: true, message: 'Please enter quantity!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
];

export const returnProductFormFields = [
  {
    key: 'product',
    type: FORM_ELEMENT_TYPES.SELECT,
    customLabel: 'Product',
    kwargs: {
      showArrow: false,
      disabled: true,
    },
  },
  {
    key: 'product_quantity',
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
];

export const outwardProductFormFields = [
  {
    key: 'product',
    type: FORM_ELEMENT_TYPES.SELECT,
    customLabel: 'Product',
    kwargs: {
      showArrow: false,
      disabled: true,
    },
  },
  {
    key: 'quantity',
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
];
