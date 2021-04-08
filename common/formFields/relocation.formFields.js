import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

const productsOrKitsOptions = ['Products', 'Kits'];

const statusOptions = ['Approved', 'Hold', 'Rejected'];

const vehicleTypeChoices = [
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
];

export const relocationFormFields = [
  {
    key: 'transaction_date',
    rules: [{required: true, message: 'Please select transaction date!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: {
      style: {
        width: '100%',
      },
    },
    customLabel: 'Transaction Date',
    colSpan: 6,
  },
  {
    key: 'send_from_warehouse',
    rules: [{required: true, message: 'Please select Warehouse!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'From',
    colSpan: 6,
  },
  {
    key: 'receive_to_warehouse',
    rules: [{required: true, message: 'Please select Warehouse!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'To',
    colSpan: 6,
  },
  {
    key: 'transporter_name',
    rules: [{required: true, message: 'Please select Transporter Name!'}],
    kwargs: {
      placeholder: 'Select',
      showSearch: true,
      filterOption: (input, option) =>
        option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Transporter Name',
    colSpan: 6,
  },
  {
    key: 'driver_name',
    rules: [{required: true, message: 'Please enter driver name!'}],
    kwargs: {
      placeholder: 'Driver Name',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Driver Name',
    colSpan: 6,
  },
  {
    key: 'driver_number',
    rules: [{required: true, message: 'Please enter driver number!'}],
    kwargs: {
      placeholder: 'Driver Number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Driver Number',
    colSpan: 6,
  },
  {
    key: 'lr_number',
    //rules: [{required: true, message: 'Please enter LR Number'}],
    kwargs: {
      placeholder: 'LR Number',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'LR Number',
    colSpan: 6,
  },
  {
    key: 'vehicle_number',
    rules: [{required: true, message: 'Please enter Vehicle number!'}],
    kwargs: {
      placeholder: 'Vehicle Number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Vehicle Number',
    colSpan: 6,
  },
  {
    key: 'freight_charges',
    //rules: [{required: true, message: 'Please enter Freight Charges'}],
    kwargs: {
      placeholder: 'Freight Charges',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Freight Charges',
    colSpan: 6,
  },
  {
    key: 'vehicle_type',
    rules: [{required: true, message: 'Please select Vehicle Type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: vehicleTypeChoices},
    customLabel: 'Vehicle Type',
    colSpan: 6,
  },
  {
    key: 'remarks',
    //rules: [{required: true, message: 'Please enter remarks!'}],
    kwargs: {
      placeholder: 'Remarks',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
    colSpan: 6,
  },
  {
    key: 'productORkits',
    rules: [{required: true, message: 'Please select!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: productsOrKitsOptions},
    customLabel: 'Products/Kits',
    colSpan: 6,
  },
];

export const relocationFlowFormFields = [
  {
    key: 'product',
    rules: [{required: true, message: 'Please select Product!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Product Number',
    colSpan: 10,
  },
  {
    key: 'quantity',
    rules: [{required: true, message: 'Required!'}],
    kwargs: {
      placeholder: 'Quantity Parts',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity Parts',
    colSpan: 10,
  },
];
