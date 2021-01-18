import { FORM_ELEMENT_TYPES } from '../../web/src/constants/formFields.constant';

export const demandModuleFormFields = [
  {
    key: 'delivery_required_on',
    rules: [{ required: true, message: 'Please select delivery date!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.MONTH_PICKER,
    others: null,
    customLabel: 'Delivery Required On',
  },
];

export const demandModuleFlowFormFields = [
  {
    key: 'kit',
    rules: [{ required: true, message: 'Please select Part Name!' }],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Part Name',
  },
  {
    key: 'part_number',
    rules: [{ required: true, message: 'Please select quantity!' }],
    kwargs: {
      placeholder: 'Select',
      type: 'number',
      disabled: true,
      min : 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part Number',
  },
];
