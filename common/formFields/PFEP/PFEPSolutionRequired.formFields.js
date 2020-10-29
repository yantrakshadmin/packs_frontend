import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPSolutionRequiredFormFields = [
  {
    key: 'solution_flc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'FLC',
  },
  {
    key: 'solution_fsc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'FSC',
  },
  {
    key: 'solution_crate',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'Crate',
  },
  {
    key: 'solution_ppbox',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'PP Box',
  },
  {
    key: 'plastic_pallet',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'Plastic Pallet',
  },

  {
    key: 'palletized_crate',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'Palletized Crate',
  },
  {
    key: 'palletized_box_sol',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'Palletized Box Solution',
  },

  {
    key: 'parts_to_part_contact',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Part to Part Contact Permissible',
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
  },
  {
    key: 'stacking_or_nesting_of_parts',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Stacking or Nesting of parts',
    others: {
      formOptions:{ noStyle:true }
    } },
  {
    key: 'multiple_parts_in_single_packet',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Multiple Parts in Single Packet',
    },
    customLabel: 'Multiple Parts in Single Packet',
    others: {
      formOptions:{ noStyle:true }
    },
  },
  {
    key: 'min_max_margin',
    kwargs: {
      placeholder: 'Min/Max Margin from Wall',
    },
    others: {
      formOptions:{ noStyle:true }
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Min/Max Margin from Wall',
  },
  {
    key: 'other_specification',
    kwargs: {
      placeholder: 'Other Specification',
    },
    others: {
      formOptions:{ noStyle:true }
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Other Specification',
  },
  {
    key: 'part_orientation',
    kwargs: {
      placeholder: 'Part Orientation',
    },
    others: {
      formOptions:{ noStyle:true }
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
      formOptions:{ noStyle:true }
    },  type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Parts/PM',
  },
]
