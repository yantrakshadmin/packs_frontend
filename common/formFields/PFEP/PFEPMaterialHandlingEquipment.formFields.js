import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const PREPMaterialHandlingEquipmentFormFields = [
  {
    key: 'hopt',
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    kwargs: {
      placeholder: 'HOPT',
    },
    customLabel: 'HOPT',
  },
  {
    key: 'dock_leveler',
    kwargs: {
      placeholder: 'Packaging Length',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Dock Leveler',
  },
  {
    key: 'fork_lift',
    kwargs: {
      placeholder: 'Packaging Breadth',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Fork Lift',
  },
]
