import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const basicDetailCreateCPFormFields = [
  {
    key: 'sender_client',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Emitter',
      disabled : true,
    },
    customLabel: 'Emitter'
  },
  {
    key: 'sender_location',
    kwargs: {
      placeholder: 'Emitter Location',
      disabled : true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Emitter Location',
  },
  {
    key: 'receiver',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Receiver',
      disabled : true,
    },
    customLabel: 'Receiver'
  },
  {
    key: 'receiver_location',
    kwargs: {
      placeholder: 'Receiver Location',
      disabled : true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Receiver Location',
  },
  {
    key: 'part_name',
    kwargs: {
      placeholder: 'Part Name',
      disabled : true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Part Name',
  },
  //parts_pm
  // {
  //   key: 'component_perkit',
  //   kwargs: {
  //     placeholder: 'Component/Kit',
  //     type:'number',
  //   },
  //   type: FORM_ELEMENT_TYPES.INPUT,
  //   others: null,
  //   customLabel: 'Component/Kit',
  // },
  //weight
  {
    key: 'total_comp_weight_perkit',
    kwargs: {
      placeholder: 'Total Component Weight/Kit',
      type:'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Component Weight/Kit',
  },

  {
    key: 'volume_pm',
    kwargs: {
      placeholder: 'Total Component/Month',
      disabled : true,
      type:'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Component/Month',
  },
  {
    // key: 'total_component_per_kit',
    key:'component_perkit',
    kwargs: {
      placeholder: 'Total Component/Kit',
      type:'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Component/Kit',
  },

  {
    key: 'kit_pm',
    kwargs: {
      placeholder: 'Total Kit/Month',
      type:'number',
      disabled : true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Total Kit/Month',
  },
  {
    key: 'yantra_cycle',
    kwargs: {
      placeholder: 'Yantra Cycle Time',
      type:'number',
      disabled : true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Yantra Cycle Time',
  },
  {
    key: 'buffer',
    kwargs: {
      placeholder: 'Buffer',
      type:'number',
      min:0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Buffer (%)',
  },
  {
    key: 'kit_usage_ratio',
    kwargs: {
      placeholder: 'Kit Usage Ratio',
      type:'number',
      disabled : true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Kit Usage Ratio',
  },
  {
    key: 'kit_based_on_usage_ratio',
    kwargs: {
      placeholder: 'Number of Kit based on Usage Ratio',
      type:'number',
      disabled : true,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Number of Kit based on Usage Ratio',
  },
]
