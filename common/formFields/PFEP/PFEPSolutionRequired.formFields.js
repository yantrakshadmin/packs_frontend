import {FORM_ELEMENT_TYPES} from 'web/src/constants/formFields.constant';

export const PREPSolutionRequiredFormFields = [
  {
    key: 'solution_flc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'FLC',
  },
  {
    key: 'solution_fsc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'FSC',
  },
  {
    key: 'solution_crate',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'Crate',
  },
  {
    key: 'solution_ppbox',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'PP Box',
  },
  {
    key: 'solution_pp',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'Plastic Pallet',
  },
  {
    key: 'solution_palletized_crate',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'Palletized Crate',
  },
  {
    key: 'solution_palletized_box',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    customLabel: 'Palletized Box Solution',
  },
  {
    key: 'solution_wp',
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Wooden Pallet',
  },
  {
    key: 'solution_stacking_nesting',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Stacking or Nesting of parts',
    others: {
      defaultValue: false,
      formOptions: {noStyle: true},
    },
  },
  {
    key: 'p2p_contact',
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part to Part Contact Permissible?',
    kwargs: {
      placeholder: 'Part to Part Contact Permissible',
    },
    others: {
      formOptions: {noStyle: true},
    },
  },
  {
    key: 'mul_parts_single_pocket',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Multiple Parts in Single Pocket',
    },
    customLabel: 'Multiple Parts in Single Pocket',
    others: {
      formOptions: {noStyle: true},
    },
  },
  {
    key: 'min_max_margin',
    kwargs: {
      placeholder: 'Min/Max Margin from Wall',
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Min/Max Margin from Wall',
  },
  {
    key: 'other_spec',
    kwargs: {
      placeholder: 'Other Specification',
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Other Specification',
  },
  {
    key: 'parts_orientation',
    kwargs: {
      placeholder: 'Part Orientation',
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part Orientation',
  },
  {
    key: 'parts_pm',
    kwargs: {
      placeholder: 'Parts/PM',
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Parts/PM',
  },
  {
    key: 'solution_stacking_nesting',
    kwargs: {
      placeholder: 'Stacking or Nesting of parts',
    },
    others: {
      formOptions: {noStyle: true},
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Stacking or Nesting of parts',
  },
];
