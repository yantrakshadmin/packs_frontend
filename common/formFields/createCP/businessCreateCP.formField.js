// #business

// direct_cost = models.FloatField(default=0, blank=True, null=True)
// perating_cost = models.FloatField(default=0, blank=True, null=True)
// contigency_margin = models.FloatField(default=0, blank=True, null=True)
// min_cost_for_trip = models.FloatField(default=0, blank=True, null=True)
// billing_price = models.FloatField(default=0, blank=True, null=True)
// agreed_margin = models.FloatField(default=0, blank=True, null=True)
// trip_cost = models.FloatField(default=0, blank=True, null=True)
// gross_margins = models.FloatField(default=0, blank=True, null=True)
// remarks = models.FloatField(default=0, blank=True, null=True)

import { FORM_ELEMENT_TYPES } from 'web/src/constants/formFields.constant';

export const businessCreateCPFormFields = [
  {
    key: 'direct_cost',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Direct Cost',
    },
    customLabel: 'Direct Cost'
  },
  {
    key: 'perating_cost',
    kwargs: {
      placeholder: 'Perating Cost',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Perating Cost',
  },
  {
    key: 'contigency_margin',
    type: FORM_ELEMENT_TYPES.INPUT,
    kwargs: {
      placeholder: 'Contigency Margin',
    },
    customLabel: 'Contigency Margin'
  },
  {
    key: 'min_cost_for_trip',
    kwargs: {
      placeholder: 'Minimum Cost For Trip',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    customLabel: 'Minimum Cost For Trip',
  },
  {
    key: 'billing_price',
    kwargs: {
      placeholder: 'Billing Price',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Billing Price',
  },
  {
    key: 'agreed_margin',
    kwargs: {
      placeholder: 'Agreed Margin',

    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Agreed Margin',
  },
  {
    key: 'trip_cost',
    kwargs: {
      placeholder: 'Trip Cost',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Trip Cost',
  },
  {
    key: 'gross_margins',
    kwargs: {
      placeholder: 'Gross Margins',

    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Gross Margins',
  },
  {
    key: 'remarks',
    kwargs: {
      placeholder: 'Remarks',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Remarks',
  },
]
