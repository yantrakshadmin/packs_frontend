import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPSolutionRequiredFormFields = [
  {
    key: 'solution_flc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: null,
    customLabel: 'FLC',
  },
  {
    key: 'solution_fsc',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: null,
    customLabel: 'FSC',
  },
  {
    key: 'solution_crate',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: null,
    customLabel: 'Crate',
  },
  {
    key: 'solution_ppbox',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: null,
    customLabel: 'PP Box',
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
        'CP Approved','Trials Done','Trials Approved'],
    },
  },
]
