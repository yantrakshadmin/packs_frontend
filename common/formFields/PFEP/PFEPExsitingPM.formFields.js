import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPExistingPMFormFields = [
  {
    key: 'type',
    rules: [{ required: true, message: 'Please enter Type!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Type',
    },
  },
  {
    key: 'packaging_length',
    rules: [{ required: true, message: 'Please enter Packaging Length!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Length',
  },
  {
    key: 'packaging_breadth',
    rules: [{ required: true, message: 'Please enter Packaging Breadth!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Breadth',
  },
  {
    key: 'packaging_height',
    rules: [{ required: true, message: 'Please enter Packaging Height!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Height',
  },
  {
    key: 'pocket_length',
    rules: [{ required: true, message: 'Please enter Pocket Length!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Length',
  },
  {
    key: 'pocket_breadth',
    rules: [{ required: true, message: 'Please enter Pocket Breadth!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Breadth',
  },
  {
    key: 'pocket_height',
    rules: [{ required: true, message: 'Please enter Pocket Height!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Height',
  },
  {
    key: 'inserts_per_pm',
    rules: [{ required: true, message: 'Please enter Insert Per Packaging Material!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Inserts Per Packaging Material',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Inset Per PM',
  },
  {
    key: 'part_per_layer',
    rules: [{ required: true, message: 'Please enter Part Per Layer!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Part Per Layer',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part Per Layer',
  }, {
    key: 'total_part_per_pm',
    rules: [{ required: true, message: 'Please enter Total Part Per PM!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Total Part Per PM',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Part Per PM',
  },{
    key: 'pm_loaded_weight',
    rules: [{ required: true, message: 'Please enter PM Loaded Weight(Kgs)!' }],
    kwargs: {
      type: 'number',
      placeholder: 'PM Loaded Weight(Kgs)',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'PM Loaded Weight(Kgs)',
  },
  {
    key: 'price_per_unit',
    rules: [{ required: true, message: 'Please enter Price per unit!' }],
    kwargs: {
      type:'number',
      placeholder: 'Price Per Unit',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Price Per Unit',
  },

  {
    key: 'remark',
    kwargs: {
      placeholder: 'Remark',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
  },
]
