import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const GRNFormFields = [
  {
    key: 'warehouse',
    rules: [{required: true, message: 'Please select warehouse!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Warehouse',
  },
  {
    key: 'material_vendor',
    rules: [{required: true, message: 'Please select material vendor!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Material Vendor',
  },
  {
    key: 'transport_vendor',
    rules: [{required: true, message: 'Please select transport vendor!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transport Vendor',
  },
  {
    key: 'reference_no',
    rules: [{required: true, message: 'Please enter reference number!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Reference Number',
  },
  {
    key: 'driver_number',
    rules: [{required: true, message: 'Please enter driver number!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Driver Number',
  },
  {
    key: 'vehicle_number',
    rules: [{required: true, message: 'Please enter vehicle number!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Vehicle Number',
  },
  {
    key: 'vehicle_type',
    rules: [{required: true, message: 'Please enter vehicle type!'}],
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
    key: 'invoice_no',
    rules: [{required: true, message: 'Please enter invoice number!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Invoice Number',
  },
  {
    key: 'invoice_amount',
    rules: [{required: true, message: 'Please enter invoice amount!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Invoice Amount',
  },
  {
    key: 'freight_charges',
    rules: [{required: true, message: 'Please enter freight charges!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Freight Charges',
  },
  {
    key: 'remarks',
    rules: [{required: true, message: 'Please enter remarks!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
  {
    key: 'reciever',
    rules: [{required: true, message: 'Please enter receiver!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Receiver',
  },
  {
    key: 'inward_date',
    rules: [{required: true, message: 'Please select inward date!'}],
    kwargs: {
      placeholder: 'Select',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Inward Date',
  },
  {
    key: 'document',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: null,
    customLabel: 'Document',
  },
];

export const GRNItemFormFields = [
  {
    key: 'item',
    rules: [{required: true, message: 'Please select product!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Product',
  },
  {
    key: 'item_quantity',
    rules: [{required: true, message: 'Please enter item quantity!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Item Quantity',
  },
  {
    key: 'item_price',
    rules: [{required: true, message: 'Please enter item price!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Item Price',
  },
  {
    key: 'label_name',
    rules: [{required: true, message: 'Please enter Label Name!'}],
    kwargs: {
      placeholder: 'Enter',
      maxLength: 20,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Label Name',
  },
];

export const RegenerateGRNFields01 = [
  {
    key: 'date',
    type: FORM_ELEMENT_TYPES.DATE,
    others: {
      style: {width: '100%'},
    },
    customLabel: 'Date',
  },
  {
    key: 'warehouse',
    rules: [{required: true, message: 'Please select warehouse!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Warehouse',
  },
];
