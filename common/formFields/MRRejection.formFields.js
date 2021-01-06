import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const MRRejectionFormFields = [
  {
    key: 'reason',
    rules: [{ required: true, message: 'Please select reason!' }],
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: [
        'Material not available due to increased cycle time at receiver client.',
        'Material in transit and would take more than 24 hours for allotment',
        'Material demand exceeded monthly schedule',
        'Kit required as per material request not yet approved',
        'Vehicle not available',
        'Others'
      ]
    },
    customLabel: 'Reasons',
  },

  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },

];
