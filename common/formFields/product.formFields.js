import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const productFormFields = [
  {
    key: 'name',
    rules: [{required: true, message: 'Please enter name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    label: 'Name',
  },
  {
    key: 'short_code',
    rules: [{required: true, message: 'Please enter short code!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    label: 'Short Code',
  },

  {
    key: 'height',
    rules: [{required: true, message: 'Please enter height!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Height',
  },
  {
    key: 'width',
    rules: [{required: true, message: 'Please enter width!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Width',
  },
  {
    key: 'cavity_width',
    rules: [{required: true, message: 'Please enter cavity width!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Cavity Width',
  },
  {
    key: 'description',
    rules: [{required: true, message: 'Please enter description!'}],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Description',
  },
  {
    key: 'length',
    rules: [{required: true, message: 'Please enter length!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Length',
  },
  {
    key: 'actual_weight',
    rules: [{required: true, message: 'Please enter actual weight!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Actual Weight',
  },
  {
    key: 'volumetric_weight',
    rules: [{required: true, message: 'Please enter volumetric weight!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Volumetric Weight',
  },
  {
    key: 'category',
    rules: [{required: true, message: 'Please select category!'}],
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Category',
  },
  {
    key: 'priceperunit',
    rules: [{required: true, message: 'Please enter price per unit!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Price Per Unit',
  },

  {
    key: 'cavity_length',
    rules: [{required: true, message: 'Please enter Cavity Length!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'Cavity Length',
  },

  {
    key: 'hsc_code',
    rules: [{required: true, message: 'Please enter hsc_code!'}],
    type: FORM_ELEMENT_TYPES.INPUT_NUMBER,
    kwargs: {
      placeholder: 'Enter',
    },
    label: 'HSC Code',
  },
];
