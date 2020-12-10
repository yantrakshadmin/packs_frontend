import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';



export const PREPMaterialHandlingEquipmentFormFields = [
  {
    key: 'hopt',
    type: FORM_ELEMENT_TYPES.SWITCH,
    others: null,
    customLabel: 'HOPT',
  },
  {
    key: 'dock_leveler',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Dock Leveler',
  },
  {
    key: 'fork_lift',
    type: FORM_ELEMENT_TYPES.SWITCH,
    customLabel: 'Fork Lift',
  },
]
