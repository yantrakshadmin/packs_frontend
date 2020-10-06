import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPProductDetailsFormFields = [
  {
    key: 'part_name',
    rules: [{ required: true, message: 'Please enter Part Name!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Part Name',
    },
    customLabel: 'Part Name'
  },
  {
    key: 'part_number',
    kwargs: {
      type: 'number',
      placeholder: 'Part Number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part Number',
  },
  {
    key: 'volume_pm',
    rules: [{ required: true, message: 'Please enter Volume Per Month!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Volume Per Month',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Volume Per Month',
  },
  {
    key: 'dispatch_frequency',
    kwargs: {
      placeholder: 'Dispatch Frequency',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Dispatch Frequency',
  },
  {
    key: 'weight',
    rules: [{ required: true, message: 'Please enter Weight(Kgs) !' }],
    kwargs: {
      type: 'number',
      placeholder: 'Weight',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
  },
  {
    key: 'length',
    kwargs: {
      type: 'number',
      placeholder: 'Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Length',
  },
  {
    key: 'breadth',
    kwargs: {
      type: 'number',
      placeholder: 'Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Breadth',
  },{
    key: 'height',
    kwargs: {
      type: 'number',
      placeholder: 'Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
  },
]
