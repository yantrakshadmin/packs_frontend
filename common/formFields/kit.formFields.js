import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const kitFormFields = [
  {
    key: 'kit_name',
    rules: [{required: true, message: 'Please enter kit name!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Kit Name',
  },
  {
    key: 'kit_info',
    rules: [{required: true, message: 'Please enter kit info!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Kit Info',
  },
  {
    key: 'components_per_kit',
    rules: [{required: true, message: 'Please enter components per kit!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Components Per Kit',
  },
  {
    key: 'kit_client',
    rules: [{required: true, message: 'Please enter kit client name!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Kit Client',
  },
  {
    key: 'part_name',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part Name',
  },
  {
    key: 'part_number',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part Number',
  },
  {
    key: 'kit_type',
    rules: [{required: true, message: 'Please select kit kit type!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: [
        'FLC',
        'FSC',
        'Crate',
        'PP Box',
        'CRT6412',
        'CRT6418',
        'CRT6423',
        'CRT6435',
        'Palletized CRT6412',
        'Palletized CRT6418',
        'Palletized CRT6423',
        'Palletized CRT6435',
        'Palletized PP Box',
        'Plastic Pallet',
        'Wooden Pallet',
      ],
    },
    customLabel: 'Kit Type',
  },
  {
    key: 'active',
    type: FORM_ELEMENT_TYPES.SWITCH,
    label: 'Active',
  },
];
