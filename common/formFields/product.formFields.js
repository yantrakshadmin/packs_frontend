import { FORM_ELEMENT_TYPES } from '../../web/src/constants/formFields.constant';

export const productFormFields = [
  {
    key: 'name',
    rules: [{ required: true, message: 'Please enter name!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'short_code',
    rules: [{ required: true, message: 'Please enter short code!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Short Code',
  },
  {
    key: 'description',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
    },
    customLabel: 'Description',
  },
  {
    key: 'category',
    rules: [{ required: true, message: 'Please select category!' }],
    type: FORM_ELEMENT_TYPES.SELECT,
    kwargs: {
      placeholder: 'Select',
    },
    customLabel: 'Category',
  },
  {
    key: 'priceperunit',
    rules: [{ required: true, message: 'Please enter price per unit!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    customLabel: 'Price Per Unit',
  },
  {
    key: 'hsn_code',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    customLabel: 'HSN Code',
  },

  {
    key: 'height',
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Height',
  },
  {
    key: 'width',
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Width',
  },
  {
    key: 'length',
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Length',
  },
  {
    key: 'actual_weight',
    rules: [{ required: true, message: 'Please enter actual weight!' }],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    customLabel: 'Actual Weight',
  },
  {
    key: 'volumetric_weight',
    rules: [{ required: true, message: 'Please enter volumetric weight!' }],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    customLabel: 'Volumetric Weight',
  },
  {
    key: 'cavity_length',
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    customLabel: 'Cavity Length',
  },
  {
    key: 'cavity_width',
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    customLabel: 'Cavity Width',
  },
  {
    key: 'active',
    type: FORM_ELEMENT_TYPES.SWITCH,
    label: 'Active',
  },
  {
    key: 'document',
    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
    kwargs: {
      placeholder: 'Attach',
    },
    label: 'Document',
  },

];
