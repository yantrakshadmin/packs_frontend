import {FORM_ELEMENT_TYPES} from 'web/src/constants/formFields.constant';

export const outwardDocketFormFields = [
  {
    customLabel: 'Transaction Date',
    key: 'transaction_date',
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
  },
  {
    customLabel: 'Dispatch Date',
    key: 'dispatch_date',
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
  },
  {
    key: 'transaction_no',
    rules: [{required: true, message: 'Please select Transaction Number!'}],
    kwargs: {
      placeholder: 'Transaction Number',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Transaction Number',
  },
  {
    key: 'sending_location',
    rules: [{required: true, message: 'Please select Sender Client!'}],
    type: FORM_ELEMENT_TYPES.SELECT,
    kwargs: {
      placeholder: 'Sender Client',
    },
    customLabel: 'Sender Client',
  },
  {
    key: 'transporter_name',
    kwargs: {
      placeholder: 'Transporter Name',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: ['Mahindra Logistics', 'TCI', 'Vinsum / Axpress', 'Chetak Logistics', 'Other'],
    },
    customLabel: 'Transporter Name',
  },
  {
    key: 'vehicle_details',
    kwargs: {
      placeholder: 'Vehicle Details',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Vehicle Details',
  },
  {
    key: 'invoice_number',
    rules: [{required: true, message: 'Please select Invoice Number!'}],
    kwargs: {
      placeholder: 'Invoice Number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Invoice Number',
  },
  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Remarks',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
];
