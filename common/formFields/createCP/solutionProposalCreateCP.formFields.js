import {FORM_ELEMENT_TYPES} from 'web/src/constants/formFields.constant';

const solutionAssetOptions = [
  'FLC',
  'FSC',
  'CRT6412',
  'CRT6418',
  'CRT6423',
  'CRT6435',
  'Palletized CRT6412',
  'Palletized CRT6418',
  'Palletized CRT6423',
  'Palletized CRT6435',
  'PP Box',
  'Palletized PP Box',
  'Plastic Pallet',
  'Wooden Pallet',
];

export const solutionProposalCreateCPFormFields = [
  {
    key: 'standard_assets',
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: solutionAssetOptions,
    },
    customLabel: 'Standard Assets',
  },
  {
    key: 'insert_type',
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: ['Insert', 'HDPE Tray'],
    },
    customLabel: 'Insert Type',
  },
  // {
  //   key: 'cost',
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   kwargs: {
  //     placeholder: 'Cost',
  //     type:'number'
  //   },
  //   customLabel:'Cost'
  // },
];

// Specification	Quantity	Qyt/KIT	Rate	Total Cost	Month	Dep Cost

// std_ast_quantity = models.FloatField(default=0, blank=True, null=True)
// std_ast_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// std_ast_rate = models.FloatField(default=0, blank=True, null=True)
// std_ast_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// std_ast_total_cost = models.FloatField(default=0, blank=True, null=True)
// std_ast_month = models.FloatField(default=0, blank=True, null=True)
// std_ast_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// crate_lid_quantity = models.FloatField(default=0, blank=True, null=True)
// crate_lid_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// crate_lid_rate = models.FloatField(default=0, blank=True, null=True)
// crate_lid_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// crate_lid_total_cost = models.FloatField(default=0, blank=True, null=True)
// crate_lid_month = models.FloatField(default=0, blank=True, null=True)
// crate_lid_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// palletized_lid_quantity = models.FloatField(default=0, blank=True, null=True)
// palletized_lid_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// palletized_lid_rate = models.FloatField(default=0, blank=True, null=True)
// palletized_lid_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// palletized_lid_total_cost = models.FloatField(default=0, blank=True, null=True)
// palletized_lid_month = models.FloatField(default=0, blank=True, null=True)
// palletized_lid_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// pallet_quantity = models.FloatField(default=0, blank=True, null=True)
// pallet_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// pallet_rate = models.FloatField(default=0, blank=True, null=True)
// pallet_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// pallet_total_cost = models.FloatField(default=0, blank=True, null=True)
// pallet_month = models.FloatField(default=0, blank=True, null=True)
// pallet_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// insert1_quantity = models.FloatField(default=0, blank=True, null=True)
// insert1_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// insert1_rate = models.FloatField(default=0, blank=True, null=True)
// insert1_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// insert1_total_cost = models.FloatField(default=0, blank=True, null=True)
// insert1_month = models.FloatField(default=0, blank=True, null=True)
// insert1_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// insert2_quantity = models.FloatField(default=0, blank=True, null=True)
// insert2_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// insert2_rate = models.FloatField(default=0, blank=True, null=True)
// insert2_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// insert2_total_cost = models.FloatField(default=0, blank=True, null=True)
// insert2_month = models.FloatField(default=0, blank=True, null=True)
// insert2_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// sep_sheet_quantity = models.FloatField(default=0, blank=True, null=True)
// sep_sheet_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// sep_sheet_rate = models.FloatField(default=0, blank=True, null=True)
// sep_sheet_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// sep_sheet_total_cost = models.FloatField(default=0, blank=True, null=True)
// sep_sheet_month = models.FloatField(default=0, blank=True, null=True)
// sep_sheet_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// mould_quantity = models.FloatField(default=0, blank=True, null=True)
// mould_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// mould_rate = models.FloatField(default=0, blank=True, null=True)
// mould_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// mould_total_cost = models.FloatField(default=0, blank=True, null=True)
// mould_month = models.FloatField(default=0, blank=True, null=True)
// mould_dep_cost = models.FloatField(default=0, blank=True, null=True)
//
// hdpe_quantity = models.FloatField(default=0, blank=True, null=True)
// hdpe_quantity_perkit = models.FloatField(default=0, blank=True, null=True)
// hdpe_rate = models.FloatField(default=0, blank=True, null=True)
// hdpe_tot_mat_req = models.FloatField(default=0, blank=True, null=True)
// hdpe_total_cost = models.FloatField(default=0, blank=True, null=True)
// hdpe_month = models.FloatField(default=0, blank=True, null=True)
// hdpe_dep_cost = models.FloatField(default=0, blank=True, null=True)

export const formListSolutionProposalCreateCPFormFields = [
  {
    key: 'specification',
    kwargs: {
      placeholder: 'Specification',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Specification',
  },
  {
    key: 'quantity',
    kwargs: {
      placeholder: 'Total KIT Quantity',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total KIT Quantity',
  },
  {
    key: 'quantity_per_kit',
    kwargs: {
      placeholder: 'Qyt/KIT',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Qyt/KIT',
  },
  {
    key: 'rate',
    kwargs: {
      placeholder: 'Rate',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Rate',
  },
  {
    key: 'tot_mat_req',
    kwargs: {
      placeholder: 'Total Material Req',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Total Mat. Req.',
  },
  {
    key: 'total_cost',
    kwargs: {
      placeholder: 'Total Cost',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Cost',
  },
  {
    key: 'month',
    kwargs: {
      placeholder: 'Month',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Month',
  },
  {
    key: 'dep_cost',
    kwargs: {
      placeholder: 'Dep Cost',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Dep Cost',
  },
];

export const stdAssetsProposalCreateCPFormFields = [
  {
    key: '_quantity',
    kwargs: {
      placeholder: 'Quantity',
      type: 'number',
      disabled: true,
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Total Kit Qty',
  },
  {
    key: '_quantity_perkit',
    kwargs: {
      placeholder: 'Quantity/Kit',
      type: 'number',
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Quantity/Kit',
  },
  {
    key: '_rate',
    kwargs: {
      placeholder: 'Rate',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: {noStyle: true},
    },
    customLabel: 'Rate',
  },
  {
    key: '_tot_mat_req',
    kwargs: {
      placeholder: 'Total Mat. Req.',
      disabled: true,
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Total Mat. Req.',
  },
  {
    key: '_total_cost',
    kwargs: {
      placeholder: 'Total Cost',
      type: 'number',
      disabled: true,
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Total Cost',
  },
  {
    key: '_month',
    kwargs: {
      placeholder: 'Month',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: {noStyle: true},
    },
    customLabel: 'Month',
  },
  {
    key: '_dep_cost',
    kwargs: {
      placeholder: 'Dep Cost',
      disabled: true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: {
      formOptions: {noStyle: true},
    },
    customLabel: 'Dep Cost',
  },
];

export const createFields = (arr) => {
  let fields = [];
  arr.map((key) => {
    fields = [
      ...fields,
      ...stdAssetsProposalCreateCPFormFields.map((item) => ({
        ...item,
        key: `${key}${item.key}`,
      })),
    ];
    return null;
  });
  return fields;
};
