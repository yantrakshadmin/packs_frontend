import {FORM_ELEMENT_TYPES} from 'web/src/constants/formFields.constant';

export const SCSBasicDetailsFormFields = [
  {
    key: 'date',
    type: FORM_ELEMENT_TYPES.DATE,
    others: {
      style: {width: '100%'},
    },
  },
  {
    key: 'contact_person',
    kwargs: {
      placeholder: 'Contact Person Name',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Contact Person Name',
  },
  {
    key: 'designation',
    kwargs: {
      placeholder: 'Designation',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
  },
  {
    key: 'email',
    kwargs: {
      placeholder: 'Email',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email',
  },
  {
    key: 'contact_no',
    kwargs: {
      placeholder: 'Contact Number',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Contact Number',
  },
];

export const SCSProductDetailsFormFields = [
  {
    key: 'part_name',
    //rules: [{required: true, message: 'Please enter Part Name!'}],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'Part Name',
    },
    customLabel: 'Part Name',
  },
  {
    key: 'part_number',
    kwargs: {
      placeholder: 'Part Number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part Number',
  },
  {
    key: 'weight',
    //rules: [{required: true, message: 'Please enter Weight(Kgs) !'}],
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
  },
  {
    key: 'height',
    kwargs: {
      type: 'number',
      placeholder: 'Height',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
  },
  // {
  //   key: 'volume_pm',
  //   rules: [{required: true, message: 'Please enter Volume Per Month!'}],
  //   kwargs: {
  //     type: 'number',
  //     placeholder: 'Volume Per Month',
  //   },
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   customLabel: 'Volume Per Month',
  // },
  // {
  //   key: 'dispatch_frequency',
  //   kwargs: {
  //     placeholder: 'Dispatch Frequency',
  //   },
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   customLabel: 'Dispatch Frequency',
  // },

  // {
  //   key: 'highest_mv',
  //   kwargs: {
  //     placeholder: 'Highest Monthly Volume',
  //   },
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   customLabel: 'Highest Monthly Volume',
  // },
  // {
  //   key: 'lowest_mv',
  //   kwargs: {
  //     placeholder: 'Lowest Monthly Volume',
  //   },
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   customLabel: 'Lowest Monthly Volume',
  // },
  // {
  //   key: 'average_dispatchlotsize',
  //   kwargs: {
  //     placeholder: 'Average Dispatch Lot Size',
  //   },
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   customLabel: 'Average Dispatch Lot Size',
  // },
  // {
  //   key: 'transportation_mode',
  //   kwargs: {
  //     placeholder: 'Current Transportation Mode',
  //   },
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   customLabel: 'Current Transportation Mode',
  // },
  {
    key: 'critical_area',
    kwargs: {
      placeholder: 'Critical Area, If Any?',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Critical Area, If Any?',
  },
  {
    key: 'np_ef',
    kwargs: {
      placeholder: 'New Part or Existing flow?',
    },
    others: {
      defaultValue: 'New Part',
      selectOptions: ['New Part', 'Existing Flow'],
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    customLabel: 'New Part/Existing flow',
  },

  {
    key: 'greasy_oily',
    kwargs: {
      placeholder: 'Is Part Greasy or Oily?',
    },
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Is Part Greasy or Oily?',
  },
  {
    key: 'part_cad_data',
    kwargs: {
      placeholder: 'Part CAD Data (2D, 3D drawing, if available)',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Part CAD Data, Available?',
  },
  {
    key: 'special_measure',
    kwargs: {
      placeholder: 'Precautions to be consider?',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Precautions or Special Measures?',
  },
  {
    key: 'remarks1',
    kwargs: {
      placeholder: 'Remark',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Remark',
  },
];
