import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const demandModuleFormFields = [
  {
    key: 'delivery_required_on',
    rules: [{required: true, message: 'Please select delivery date!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.MONTH_PICKER,
    others: null,
    customLabel: 'Delivery Required On',
  },
];

export const demandModuleFlowFormFields = [
  {
    key: 'kit',
    rules: [{required: true, message: 'Please select Part Name!'}],
    kwargs: {
      placeholder: 'Part Name',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Part Name',
    col_span: 3,
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
    key: 'kit_client',
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
    key: 'client_city',
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
    key: 'cycle_time',
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
    key: 'kit_id',
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
    key: 'monthly',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Monthly',
    },
    others: null,
    customLabel: 'Monthly',
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
