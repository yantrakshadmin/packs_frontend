import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const clientFormFields = [
  {
    key: 'client_name',
    rules: [{required: true, message: 'Please enter client name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Name',
  },
  {
    key: 'client_shipping_address',
    rules: [{required: true, message: 'Please enter client shipping address!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Shipping Address',
  },
  {
    key: 'client_shipping_city',
    rules: [{required: true, message: 'Please enter client shipping city!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Shipping City',
  },
  {
    key: 'client_shipping_pincode',
    rules: [{required: true, message: 'Please enter client shipping pincode!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Shipping Pincode',
  },
  {
    key: 'client_shipping_state',
    rules: [{required: true, message: 'Please enter client shipping state!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Shipping State',
  },
  {
    key: 'client_email',
    rules: [
      {required: true, message: 'Please enter client email!'},
      {type: 'email', message: 'Please enter a valid email'},
    ],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Email',
  },
  {
    key: 'client_contact_no',
    rules: [{required: true, message: 'Please enter client contact number!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Contact Number',
  },
  {
    key: 'client_contact_person',
    rules: [{required: true, message: 'Please enter client contact person!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Contact Person',
  },
  {
    key: 'client_billing_address',
    rules: [{required: true, message: 'Please enter client billing address!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Billing Address',
  },
  {
    key: 'client_city',
    rules: [{required: true, message: 'Please enter client city!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client City',
  },
  {
    key: 'client_pincode',
    rules: [{required: true, message: 'Please enter client pincode!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Pincode',
  },
  {
    key: 'client_state',
    rules: [{required: true, message: 'Please enter client state!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client State',
  },
  {
    key: 'client_region',
    rules: [{required: true, message: 'Please enter client region!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: ['East', 'West', 'North', 'South']},
    customLabel: 'Client Region',
  },
  {
    key: 'client_payment_terms',
    rules: [{required: true, message: 'Please enter client payment terms!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Payment Terms',
  },
  {
    key: 'client_category',
    rules: [{required: true, message: 'Please enter client category!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: ['Automotive', 'F.M.C.G.', 'Pharmaceuticals', 'Ecommerce', 'Others']},
    customLabel: 'Client Category',
  },
  {
    key: 'client_product_user_type',
    rules: [{required: true, message: 'Please enter client product user type!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: ['Static', 'Transfer']},
    customLabel: 'Client Product User Type',
  },
  {
    key: 'client_pan',
    rules: [{required: true, message: 'Please enter client PAN!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client PAN',
  },
  {
    key: 'client_code',
    rules: [{required: true, message: 'Please enter client code!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Client Code',
  },
  {
    key: 'client_is_gst_registered',
    rules: [{required: true, message: 'Please select!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {selectOptions: ['Yes', 'No']},
    customLabel: 'Is GST Registered',
  },
  {
    key: 'client_gst',
    rules: [{required: true, message: 'Please enter client GST!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,

    customLabel: 'Client GST',
  },
  {
    key: 'annexure',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    others: null,
    customLabel: 'Client Annexure',
  },
  {
    key: 'active',
    type: FORM_ELEMENT_TYPES.SWITCH,
    label: 'Active',
  },
];

export const mailingListFormFields=[
  {
    key: 'mailing_list',
    kwargs: {
      placeholder: 'Mailing List',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Mailing List',
  },
]
