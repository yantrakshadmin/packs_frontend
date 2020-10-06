import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPExistingPMFormFields = [
  {
    key: 'packaging_type',
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: ['New Part', 'Corrugated Box', 'Wooden Box',
        'Foldable Crate','STD Foldable Crate','Bin',
        'PP Box','FLC (1200x800x800)',
        'STD FLC (1200x800x800)','FSC (1200x800x500)',
        'STD FSC (1200x800x500)','Wooden Pallet',
        'Plastic Pallet',
        'Palletized Sol - Corrugated Box',
        'Palletized Sol - Wooden box',
        'Palletized Sol - Foldable crate',
        'Palletized Sol - PP Box',
        'Palletized Sol - Bin',
        'Wire Mesh Container',
      ],
    },
  },
  {
    key: 'packaging_length',
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Length',
  },
  {
    key: 'packaging_breadth',
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Breadth',
  },
  {
    key: 'packaging_height',
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Height',
  },
  {
    key: 'pocket_length',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Length',
  },
  {
    key: 'pocket_breadth',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Breadth',
  },
  {
    key: 'pocket_height',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Height',
  },
  {
    key: 'inserts_pm',
    kwargs: {
      type: 'number',
      placeholder: 'Inserts Per Packaging Material',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Inset Per PM',
  },
  {
    key: 'paerts_per_layer',
    kwargs: {
      type: 'number',
      placeholder: 'Part Per Layer',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part Per Layer',
  }, {
    key: 'total_parts_per_pm',
    kwargs: {
      type: 'number',
      placeholder: 'Total Part Per PM',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Part Per PM',
  },{
    key: 'pm_loaded_weight',
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
    kwargs: {
      type:'number',
      placeholder: 'Price Per Unit',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Price Per Unit',
  },
  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Remark',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
  },
]
