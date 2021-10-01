import {FORM_ELEMENT_TYPES} from '../../web/src/constants/formFields.constant';

export const PurchaseOrdersFormFields = [
  {
    key: 'material_vendor',
    rules: [{required: true, message: 'Please select material vendor!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Material Vendor',
  },
  {
    key: 'billing_gst',
    rules: [{message: 'Please enter Billing GST!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Billing GST',
  },
  {
    key: 'delivered_to',
    rules: [{required: true, message: 'Please select warehouse!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Warehouse',
  },
  {
    key: 'po_number',
    rules: [{message: 'Please enter PO number!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'PO Number',
  },
  {
    key: 'expected_delivery',
    rules: [{required: true, message: 'Please select Expected Delivery date!'}],
    kwargs: {
      placeholder: 'Select',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.DATE,
    others: null,
    customLabel: 'Expected Devliery',
  },
  {
    key: 'payment_terms',
    rules: [{message: 'Please enter payment terms!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Payment Terms',
  },
  {
    key: 'amount',
    rules: [{message: 'Please enter amount'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Amount',
  },
  {
    key: 'gst',
    rules: [{message: 'Please enter GST!'}],
    kwargs: {
      placeholder: 'Enter',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'GST',
  },
];

export const PurchaseOrderItemFormFields = [
  {
    key: 'item',
    rules: [{required: true, message: 'Please select product!'}],
    kwargs: {
      placeholder: 'Select',
    },
    type: FORM_ELEMENT_TYPES.SELECT,
    others: null,
    customLabel: 'Product',
  },
  {
    key: 'item_quantity',
    rules: [{required: true, message: 'Please enter item quantity!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
      min: 0,
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Item Quantity',
  },
  {
    key: 'item_price',
    rules: [{required: true, message: 'Please enter item price!'}],
    kwargs: {
      placeholder: 'Enter',
      type: 'number',
    },
    type: FORM_ELEMENT_TYPES.INPUT,
    others: null,
    customLabel: 'Item Price',
  },
];
