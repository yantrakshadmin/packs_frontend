import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPMaterialHandlingEquipmentFormFields = [
  {
    key: 'hopt',
    rules: [{ required: true, message: 'Please enter HOPT!' }],
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'HOPT',
    },
    customLabel: 'HOPT',
  },
  {
    key: 'dock_leveler',
    rules: [{ required: true, message: 'Please enter Dock Leveler!' }],
    kwargs: {
      placeholder: 'Packaging Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Dock Leveler',
  },
  {
    key: 'fork_lift',
    rules: [{ required: true, message: 'Please enter Fork Lift!' }],
    kwargs: {
      placeholder: 'Packaging Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Fork Lift',
  },
]
