import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const businessCreateCPFormFields = [
  {
    key: 'direct_cost',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Direct Cost',
    },
    customLabel: 'Direct Cost'
  },
  {
    key: 'perating_cost',
    kwargs: {
      placeholder: 'Perating Cost',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Perating Cost',
  },
  {
    key: 'contigency_margin',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Contigency Margin',
    },
    customLabel: 'Contigency Margin'
  },
  {
    key: 'min_cost_for_trip',
    kwargs: {
      placeholder: 'Minimum Cost For Trip',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Minimum Cost For Trip',
  },
  {
    key: 'billing_price',
    kwargs: {
      placeholder: 'Billing Price',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Billing Price',
  },
  {
    key: 'agreed_margin',
    kwargs: {
      placeholder: 'Agreed Margin',

    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Agreed Margin',
  },
  {
    key: 'trip_cost',
    kwargs: {
      placeholder: 'Trip Cost',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Trip Cost',
  },
  {
    key: 'gross_margins',
    kwargs: {
      placeholder: 'Gross Margins',

    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Gross Margins',
  },
  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Remarks',
      type:'number'
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
]
