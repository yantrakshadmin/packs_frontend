import { FORM_ELEMENT_TYPES } from '../../web/src/constants/formFields.constant';

export const allotmentFormFields = [
  {
    key: 'sales_order',
    rules: [{ required: true, message: 'Please select sales order ID!' }],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Sales Order ID',
  },

  {
    key: 'model',
    rules: [{ required: true, message: 'Please select model!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: ['Rent', 'Sell', 'Trial', 'Repair', 'Damage', 'Swap Damage', 'Swap(Sales)'],
    },
    customLabel: 'Model',
  },

  {
    key: 'driver_name',
    rules: [{ required: true, message: 'Please enter driver name!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Driver Name',
  },
  {
    key: 'lr_number',
    rules: [{ required: true, message: 'Please enter LR number!' }],
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
    rules: [{ required: true, message: 'Please enter vehicle number!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Vehicle Number',
  },
  {
    key: 'freight_charges',
    rules: [{ required: true, message: 'Please enter freight charges!' }],
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
    rules: [{ required: true, message: 'Please select vehicle type!' }],
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
    key: 'remarks',
    rules: [{ required: true, message: 'Please enter remarks!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
  {
    key: 'send_from_warehouse',
    rules: [{ required: true, message: 'Please select warehouse!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Warehouse',
  },
  {
    key: 'transport_by',
    rules: [{ required: true, message: 'Please enter transport by!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transport By',
  },
  {
    key: 'dispatch_date',
    rules: [{ required: true, message: 'Please enter dispatch date!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Dispatch Date',
  },
  {
    key: 'expected_delivery',
    rules: [{ required: true, message: 'Please select expected delivery!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Expected Delivery',
  },
];

export const allotmentProductFormFields = [
  {
    key: 'flow',
    rules: [{ required: true, message: 'Please enter flow!' }],
    kwargs: {
      placeholder: 'Enter',
      disabled: true,
      showArrow: false,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Flow',
  },
  {
    key: 'kit',
    rules: [{ required: true, message: 'Please enter kit!' }],
    kwargs: {
      placeholder: 'Enter',
      disabled: true,
      showArrow: false,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Kit',
  },
  {
    key: 'asked_quantity',
    rules: [{ required: true, message: 'Please enter asked quantity!' }],
    kwargs: {
      placeholder: 'Enter',
      disabled: true,
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Asked Quantity',
  },
  {
    key: 'alloted_quantity',
    rules: [{ required: true, message: 'Please enter alloted quantity!' }],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
      min : 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Alloted Quantity',
  },
];
