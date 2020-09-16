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
    rules: [{ required: true, message: 'Please enter Part Number!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Part Number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part Number',
  },
  {
    key: 'volume_month',
    rules: [{ required: true, message: 'Please enter Volume Month!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Volume Month',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Volume Month',
  },
  {
    key: 'dispatch_frequency',
    rules: [{ required: true, message: 'Please enter Dispatch Frequency!' }],
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
    rules: [{ required: true, message: 'Please enter Lenght!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Length',
  },
  {
    key: 'breadth',
    rules: [{ required: true, message: 'Please enter Breadth!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Breadth',
  },{
    key: 'height',
    rules: [{ required: true, message: 'Please enter Height!' }],
    kwargs: {
      type: 'number',
      placeholder: 'Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
  },
]
