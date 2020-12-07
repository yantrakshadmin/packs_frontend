import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';
import { solutionAssetOptions } from '../../constants/solutionproposalCreateCP';

export const solutionProposalCreateCPFormFields = [
  {
    key: 'standard_assets',
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: solutionAssetOptions,
    },
    customLabel:'Standard Assets'
  },
  {
    key: 'cost',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Cost',
      type:'number'
    },
    customLabel:'Cost'
  },
];
// Specification	Quantity	Qyt/KIT	Rate	Total Cost	Month	Dep Cost
export const formListSolutionProposalCreateCPFormFields = [
  {
    key: 'specification',
    kwargs: {
      placeholder: 'Specification',
      disabled:true
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Specification',
  },
  {
    key: 'quantity',
    kwargs: {
      placeholder: 'Quantity',
      type:'number'
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Quantity',
  },
  {
    key: 'quantity_per_kit',
    kwargs: {
      placeholder: 'Qyt/KIT',
      type:'number'
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
    key: 'total_cost',
    kwargs: {
      placeholder: 'Total Cost',
      type:'number'
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
]

