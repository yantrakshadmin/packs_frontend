import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPSolutionRequiredFormFields = [
  {
    key: 'container',
    rules: [{ required: true, message: 'Please select container!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: ['FLC', 'FSC', 'Crate', 'PP Box'],
    },
  },
  {
    key: 'part_orientation',
    rules: [{ required: true, message: 'Please enter Part Orientation!' }],
    kwargs: {
      placeholder: 'Part Orientation',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part Orientation',
  },
  {
    key: 'parts',
    rules: [{ required: true, message: 'Please enter Parts/PM!' }],
    kwargs: {
      placeholder: 'Parts/PM',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Parts/PM',
  },
  {
    key: 'status',
    rules: [{ required: true, message: 'Please select status!' }],
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
