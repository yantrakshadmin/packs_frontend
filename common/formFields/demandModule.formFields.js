import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const demandModuleFormFields = [
  {
    key: 'delivery_month',
    rules: [{required: true, message: 'Please select delivery date!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.MONTH_PICKER,
    others: null,
    customLabel: 'Delivery Month',
  },
];

export const demandModuleFlowFormFields = [
  {
    key: 'flow',
    rules: [{required: true, message: 'Please select flow!'}],
    kwargs: {
      placeholder: 'Select Flow',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Select Flow',
  },
  {
    key: 'kit',
    rules: [{required: true, message: 'Please select Part Name!'}],
    kwargs: {
      placeholder: 'Select Part Name',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Select Part Name',
  },
  {
    key: 'part_number',
    kwargs: {
      placeholder: 'Part No.',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part No.',
    col_span: 2,
  },
  {
    key: 'receiver_client_name',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Receiver Client',
      disabled: true,
    },
    others: null,
    customLabel: 'Receiver Client',
    col_span: 2,
  },
  {
    key: 'receiver_client_city',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Receiver Loc.',
      disabled: true,
    },
    others: null,
    customLabel: 'Receiver Loc.',
    col_span: 2,
  },
  {
    key: 'flow_days',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Cycle Time',
      disabled: true,
    },
    others: null,
    customLabel: 'Cycle Time',
    col_span: 2,
  },
  {
    key: 'kit_type',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Kit Type',
      disabled: true,
    },
    others: null,
    customLabel: 'Kit Type',
    col_span: 3,
  },
  {
    key: 'kit_name',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Kit ID',
      disabled: true,
    },
    others: null,
    customLabel: 'Kit ID',
    col_span: 2,
  },
  {
    key: 'components_per_kit',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Parts/Kit',
      disabled: true,
    },
    others: null,
    customLabel: 'Parts/Kit',
    col_span: 2,
  },
  {
    key: 'monthly_quantity',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Monthly Qty',
    },
    others: null,
    customLabel: 'Monthly Qty',
    col_span: 2,
  },
];

export const demandModuleFlowFormFieldsSpecialEmp = [
  {
    key: 'deployed_pool',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Deployed Pool',
    },
    others: null,
    customLabel: 'Deployed Pool',
    col_span: 2,
  },
];

export const demandModuleFlowFormCalFields = [
  {
    key: 'date',
    type: FORM_ELEMENT_TYPES.DATE,
    kwargs: {
      placeholder: 'Date',
    },
    others: null,
    customLabel: 'Date',
    col_span: 4,
  },
  {
    key: 'event',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Event',
    },
    others: null,
    customLabel: 'Event',
    col_span: 4,
  },
];
