import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';


export const operatingCostMonthlyFormFields = [
  {
    key: 'min_warehousing ',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Min Warehousing',
      type: 'number',
    },
    others: {
      formOptions: { noStyle: true },
    },
    customLabel: 'Min Warehousing',
  },
  {
    key: 'transportation_cost_w1_to_c1',
    kwargs: {
      placeholder: 'Transportation cost: W1 to C1',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    },
    customLabel: 'Transportation cost: W1 to C1',
  },
  {
    key: 'transportation_cost_c2_to_c2',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Transportation cost: C2 TO W2',
      type: 'number',
    },
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Transportation cost: C2 TO W2',
  }, {
    key: 'transportation_cost_w2_to_w1',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Transportation cost: W2 TO W1',
      type: 'number',
    },
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Transportation cost: W2 TO W1',
  },

  {
    key: 'total_cost_of_supply_chain',
    kwargs: {
      placeholder: 'Total cost of supply chain',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Total cost of supply chain',
  },
  {
    key: 'labour_cost_per_tonne',
    kwargs: {
      placeholder: 'Labour cost / tonne',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Labour cost / tonne',
  },
  {
    key: 'repair_and_reconditioning',
    kwargs: {
      placeholder: 'Repair & Reconditioning',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Repair & reconditioning',
  },
  {
    key: 'other_cost',
    kwargs: {
      placeholder: 'Other Cost',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Other Cost',
  },
  {
    key: 'total_cost',
    kwargs: {
      placeholder: 'Total Cost',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Total Cost',
  },
  {
    key: 'direct_cost',
    kwargs: {
      placeholder: 'Direct Cost',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: { noStyle: true },
    }, customLabel: 'Direct Cost',
  },
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
