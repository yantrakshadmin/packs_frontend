import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

// {
//     key: 'status',
//     kwargs: {
//       placeholder: 'Select',
//     },
//     type: FORM_ELEMENT_TYPES.SELECT,
//     others: {
//       selectOptions: [
//       'TP Shared', 'CP Shared', 'TP Approved',
//         'CP Approved','Trials Done','Trials Approved','ESA Signed','Flow started',
//         'On Hold' , 'PFEP Dropped' ,'Not Qualified'
//       ],
//     },
//   },

export const PFEPStatusFormFields = [
  {
    key: 'tp_shared',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'TP Shared',
  },
  {
    key: 'cp_shared',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'CP Shared',
  },
  {
    key: 'tp_approved',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'TP Approved',
  },
  {
    key: 'cp_approved',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'CP Approved',
  },
  {
    key: 'trials_done',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'Trials Done',
  },

  {
    key: 'trials_approved',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'Trials Approved',
  },
  {
    key: 'esa_signed',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
    customLabel: 'ESA Signed',
  },

  {
    key: 'flow_started',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Flow started',
    others: {
      defaultValue:false,
      formOptions:{ noStyle:true }
    },
  },
  {
    key: 'on_hold',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'On Hold',
    others: {
      formOptions:{ noStyle:true }
    } },
  {
    key: 'pfep_dropped',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'PFEP Dropped',
    others: {
      formOptions:{ noStyle:true }
    } },
  {
    key: 'not_qualified',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Not Qualified',
    others: {
      formOptions:{ noStyle:true }
    } },
  {
    key: 'solution_remark',
    kwargs: {
      placeholder: 'Remark',
    },
    others: {
      formOptions:{ noStyle:true }
    },  type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Remark',
  },
]
