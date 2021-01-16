import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';


export const operatingCostMonthlyFormFields = [
  {
    key: 'direct_cost',
    kwargs: {
      placeholder: 'Direct Cost',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true, },
    },
    customLabel: 'Direct Cost',
  },
  {
    key: 'operating_cost',
    kwargs: {
      placeholder: 'Operating Cost',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Operating Cost',
  },
  {
    key: 'contigency_margin',
    kwargs: {
      placeholder: 'Contingency Margin',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Contingency Margin',
  },
  {
    key: 'min_cost_for_trip',
    kwargs: {
      placeholder: 'Min cost to bill for a trip',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Min cost to bill for a trip',
  },
  {
    key: 'billing_price',
    kwargs: {
      placeholder: 'Price should be billed @ 20% margin',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Price should be billed @ 20% margin',
  },
  {
    key: 'agreed_margin',
    kwargs: {
      placeholder: 'Margin agreed for this flow',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Margin agreed for this flow (%)',
  },
  {
    key: 'trip_cost',
    kwargs: {
      placeholder: 'TRIP COST (SALES)',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'TRIP COST (SALES)',
  },
  {
    key: 'gross_margins',
    kwargs: {
      placeholder: 'Gross Margins',
      type: 'number',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Gross Margins (%)',
  },
  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Remarks',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Remarks',
  },
];
