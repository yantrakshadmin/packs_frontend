import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPSolutionRequiredFormFields = [
  {
    key: 'solution_flc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
    },
    customLabel: 'FLC',
  },
  {
    key: 'solution_fsc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,

    },
    customLabel: 'FSC',
  },
  {
    key: 'solution_crate',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
    },
    customLabel: 'Crate',
  },
  {
    key: 'solution_ppbox',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
    },
    customLabel: 'PP Box',
  }, {
    key: 'plastic_pallet',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
    },
    customLabel: 'Plastic Pallet',
  },

  {
    key: 'palletized_crate',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
    },
    customLabel: 'Palletized Crate',
  },
  {
    key: 'palletized_box_sol',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
    },
    customLabel: 'Palletized Box Solution',
  },
  {
    key: 'multiple_parts_in_single_packet',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Multiple Parts in Single Packet',
  },
  {
    key: 'parts_to_part_contact',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Part to Part Contact Permissible',
  },
  {
    key: 'stacking_or_nesting_of_parts',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Stacking or Nesting of parts',
  },
  {
    key: 'min_max_margin',
    kwargs: {
      placeholder: 'Minimum or Maximum Margin from Wall',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Minimum or Maximum Margin from Wall',
  },
  {
    key: 'other_specification',
    kwargs: {
      placeholder: 'Other Specification',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Other Specification',
  },
  {
    key: 'part_orientation',
    kwargs: {
      placeholder: 'Part Orientation',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part Orientation',
  },
  {
    key: 'parts_pm',
    kwargs: {
      placeholder: 'Parts/PM',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Parts/PM',
  },
  {
    key: 'status',
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: ['TP Shared', 'CP Shared', 'TP Approved',
        'CP Approved','Trials Done','Trials Approved','ESA Signed','Flow started'],
    },
  },
]
