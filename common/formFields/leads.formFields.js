import { FORM_ELEMENT_TYPES } from '../../web/src/constants/formFields.constant';

export const leadsFormFields = [
  {
    key: 'company_name',
    rules: [{ required: true, message: 'Please enter Company Name!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Company Name',
  },
  {
    key: 'email',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email',
  },
  {
    key: 'address',
    rules: [{ required: true, message: 'Please enter Company Adress!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Company Address',
  },
  {
    key: 'state',
    rules: [{ required: true, message: 'Please enter State!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'State',
  },
  {
    key: 'region',
    rules: [{ required: true, message: 'Please enter Region!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: { selectOptions: ['East', 'West', 'North', 'South', 'Central'] },
    customLabel: 'Region',
  },
  {
    key: 'status',
    rules: [{ required: true, message: 'Please select Pipeline Status!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: {
      selectOptions: [
        'Introduction Mail',
        'Initial Meeting',
        // 'PFEP Study Done',
        // 'TP/CP Submitted',
        // 'Solution Accepted',
        // 'Trial Done',
        'CCF form received',
        'Agreement Draft Approved',
        'Agreement Signed',
        'Client On Hold',
        'Lead Dropped',
        'Not Qualified',
        'Won',
      ],
    },
    customLabel: 'Pipeline Status',
  },
  {
    key: 'lead_owner',
    rules: [{ required: true, message: 'Please enter Lead Owner!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Lead Owner',
  },
  {
    key: 'lead_source',
    rules: [{ required: true, message: 'Please enter Lead Source!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Lead Source',
  },
  {
    key: 'industry',
    rules: [{ required: true, message: 'Please enter Industry!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: { selectOptions: ['Automotive', 'F.M.C.G.', 'Pharmaceuticals', 'Ecommerce', 'Others'] },
    customLabel: 'Industry',
  },
  {
    key: 'recent_visit',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Most Recent Visit',
  },
];

export const leadsContactFormFields = [
  {
    key: 'name',
    rules: [{ required: true, message: 'Please enter Contact Person Name!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Name',
  },
  {
    key: 'phone',
    rules: [{ required: true, message: 'Please enter Phone!' }],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Phone',
  },
  {
    key: 'designation',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Designation',
  },
  {
    key: 'email',
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Email',
  },
];
