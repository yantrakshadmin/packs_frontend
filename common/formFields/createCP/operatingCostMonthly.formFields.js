import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';


export const operatingCostMonthlyFormFields = [

  {
    key: 'operating_cost',
    kwargs: {
      placeholder: 'Operating Cost',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Operating Cost',
  },
  {
    key: 'contingency_margin',
    kwargs: {
      placeholder: 'Contingency Margin',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Contingency Margin',
  },
  {
    key: 'min_cost_to_bill_for_a_trip',
    kwargs: {
      placeholder: 'Min cost to bill for a trip',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Min cost to bill for a trip',
  },
  {
    key: 'price_should_be_billed',
    kwargs: {
      placeholder: 'Price should be billed @ 20% margin',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Price should be billed @ 20% margin',
  },
  {
    key: 'margin_agreed_for_this_flow',
    kwargs: {
      placeholder: 'Margin agreed for this flow',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Margin agreed for this flow',
  },
  {
    key: 'trip_cost_sales',
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
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Gross Margins',
  },
  {
    key: 'remark_operating_cost',
    kwargs: {
      placeholder: 'Remark',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Remark',
  },
];
