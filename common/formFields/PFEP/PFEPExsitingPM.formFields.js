import {FORM_ELEMENT_TYPES} from 'web/src/constants/formFields.constant';

export const PREPExistingPMFormFields = [
  {
    key: 'packaging_length',
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Length(mm)',
  },
  {
    key: 'packaging_breadth',
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Breadth(mm)',
  },
  {
    key: 'packaging_height',
    kwargs: {
      type: 'number',
      placeholder: 'Packaging Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Packaging Height(mm)',
  },
  {
    key: 'pocket_length',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Length(mm)',
  },
  {
    key: 'pocket_breadth',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Breadth(mm)',
  },
  {
    key: 'pocket_height',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket Height(mm)',
  },
  {
    key: 'packaging_type',
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: [
        'New Part',
        'Corrugated Box',
        'Wooden Box',
        'Foldable Crate',
        'STD Foldable Crate',
        'Crate',
        'PP Box',
        'FLC (1200x800x950)',
        'STD FLC (1200x800x950)',
        'FSC (1200x800x650)',
        'STD FSC (1200x800x650)',
        'Wooden Pallet',
        'Plastic Pallet',
        'Palletized Sol - Corrugated Box',
        'Palletized Sol - Wooden box',
        'Palletized Sol - Foldable crate',
        'Palletized Sol - PP Box',
        'Palletized Sol - Bin',
        'Wire Mesh Container',
        'Other Solution',
      ],
    },
    customLabel: 'Packaging Type',
  },
  {
    key: 'stacking_nesting',
    kwargs: {
      placeholder: 'Stacking, Nesting or Multiple parts in single Pocket. If any?',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Stacking, Nesting or Multiple parts in single Pocket.',
  },
  {
    key: 'inserts_pm',
    kwargs: {
      type: 'number',
      placeholder: 'Inserts Per Packaging Material',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Inserts Per PM',
  },
  {
    key: 'spesheet_pm',
    kwargs: {
      type: 'number',
      placeholder: 'Separator Sheet Per PM',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Separator Sheet Per PM',
  },
  {
    key: 'matrix_details',
    kwargs: {
      placeholder: 'Pocket Matrix Detail',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Pocket Matrix Detail',
  },
  {
    key: 'parts_per_pocket',
    kwargs: {
      placeholder: 'Parts per Pocket',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Parts per Pocket',
  },
  {
    key: 'parts_per_layer',
    kwargs: {
      type: 'number',
      placeholder: 'Part Per Layer',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part Per Layer',
  },
  {
    key: 'total_parts_per_pm',
    kwargs: {
      type: 'number',
      placeholder: 'Total Part Per PM',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Part Per PM',
  },
  {
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
    key: 'palletized_sol_details',
    kwargs: {
      placeholder: 'Pallatized Solution Details',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Pallatized Solution Details',
  },
  {
    key: 'current_packaging',
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      defaultValue: 'Returnable',
      selectOptions: ['Returnable', 'Non Returnable'],
    },
    customLabel: 'Current Packaging Type',
  },
  {
    key: 'wastage_pm',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Wastage Of PM',
    kwargs: {
      placeholder: 'Wastage Of PM',
    },
  },
  {
    key: 'trips_per_pm',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Trips Per PM Before Scraping',
    kwargs: {
      placeholder: 'Trips Per PM Before Scraping',
    },
  },
  {
    key: 'price_per_unit',
    kwargs: {
      type: 'number',
      placeholder: 'Price Per Unit',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Price Per Unit',
  },
  {
    key: 'remarks1',
    kwargs: {
      placeholder: 'Remark',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
  },
  {
    key: 'pocket_length1',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket 2 Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket 2 Length(mm)',
  },
  {
    key: 'pocket_breadth1',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket 2 Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket 2 Breadth(mm)',
  },
  {
    key: 'pocket_height1',
    kwargs: {
      type: 'number',
      placeholder: 'Pocket 2 Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Pocket 2 Height(mm)',
  },
];
