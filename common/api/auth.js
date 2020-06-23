import {loadAPI} from '../helpers/api';

export const getJWTTokens = ({username, password}) =>
  loadAPI(`/api/token/`, {
    method: 'POST',
    data: {username, password},
    secure: false,
  });

export const isUserVerified = ({username}) =>
  loadAPI(`/verification/`, {
    params: {username},
    secure: false,
  });

export const verifyUser = ({username, otp}) =>
  loadAPI('/verifyOTP/', {
    method: 'POST',
    data: {username, otp},
    secure: false,
  });

export const getUserMeta = () => loadAPI(`/user/meta/`);

export const createEmployee = ({username, email, password, first_name, last_name}) =>
  loadAPI('/create-employee/', {
    method: 'POST',
    data: {username, email, password, first_name, last_name},
    secure: false,
  });

export const createClient = ({username, email, password, first_name, last_name}) =>
  loadAPI('/create-client/', {
    method: 'POST',
    data: {username, email, password, first_name, last_name},
    secure: false,
  });

export const retrieveClients = () =>
  loadAPI('/clients/', {
    method: 'GET',
    secure: true,
  });

export const createProduct = ({
  name,
  short_code,
  description,
  category,
  priceperunit,
  height,
  width,
  length,
  actual_weight,
  volumetric_weight,
  cavity_length,
  cavity_width,
  hsn_code,
  document,
}) =>
  loadAPI('/create-product/', {
    method: 'POST',
    data: {
      name,
      short_code,
      description,
      category,
      priceperunit,
      height,
      width,
      length,
      actual_weight,
      volumetric_weight,
      cavity_length,
      cavity_width,
      hsn_code,
    },
    secure: true,
  });

export const retrieveProducts = () =>
  loadAPI('/products/', {
    method: 'GET',
    secure: true,
  });

export const editProduct = (
  id,
  {
    name,
    short_code,
    description,
    category,
    priceperunit,
    height,
    width,
    length,
    actual_weight,
    volumetric_weight,
    cavity_length,
    cavity_width,
    hsn_code,
  },
) =>
  loadAPI(`/edit-product/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: {
      name,
      short_code,
      description,
      category,
      priceperunit,
      height,
      width,
      length,
      actual_weight,
      volumetric_weight,
      cavity_length,
      cavity_width,
      hsn_code,
    },
  });

export const retrieveProduct = (id) =>
  loadAPI(`/edit-product/${id}`, {
    method: 'GET',
    secure: true,
  });

export const deleteProduct = (id) =>
  loadAPI(`/edit-product/${id}`, {
    method: 'DELETE',
    secure: true,
  });

export const createKit = ({kit_name, kit_info, components_per_kit, kit_client, products}) =>
  loadAPI('/create-kit/', {
    method: 'POST',
    secure: true,
    data: {kit_name, kit_info, components_per_kit, kit_client, products},
  });

export const editKit = (id, {kit_name, kit_info, components_per_kit, kit_client, products}) =>
  loadAPI(`/edit-kit/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: {kit_name, kit_info, components_per_kit, kit_client, products},
  });

export const retrieveKits = () =>
  loadAPI('/kits/', {
    method: 'GET',
    secure: true,
  });

export const retrieveKit = (id) =>
  loadAPI(`/edit-kit/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const deleteKit = (id) =>
  loadAPI(`/edit-kit/${id}`, {
    method: 'DELETE',
    secure: true,
  });

export const createVendor = ({
  name,
  street,
  city,
  pincode,
  state,
  contact_person_name,
  contact_person_no,
  email,
  type,
  payment_terms,
  pan,
  gst,
  code,
  remarks,
  beneficiary_name,
  account_no,
  bank_name,
  ifsc,
}) =>
  loadAPI('/create-vendor/', {
    method: 'POST',
    data: {
      name,
      street,
      city,
      pincode,
      state,
      contact_person_name,
      contact_person_no,
      email,
      type,
      payment_terms,
      pan,
      gst,
      code,
      remarks,
      beneficiary_name,
      account_no,
      bank_name,
      ifsc,
    },
    secure: true,
  });

export const editVendor = (
  id,
  {
    name,
    street,
    city,
    pincode,
    state,
    contact_person_name,
    contact_person_no,
    email,
    type,
    payment_terms,
    pan,
    gst,
    code,
    remarks,
    beneficiary_name,
    account_no,
    bank_name,
    ifsc,
  },
) =>
  loadAPI(`/edit-vendor/${id}/`, {
    method: 'PATCH',
    data: {
      name,
      street,
      city,
      pincode,
      state,
      contact_person_name,
      contact_person_no,
      email,
      type,
      payment_terms,
      pan,
      gst,
      code,
      remarks,
      beneficiary_name,
      account_no,
      bank_name,
      ifsc,
    },
    secure: true,
  });

export const deleteVendor = (id) =>
  loadAPI(`/edit-vendor/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveVendor = (id) =>
  loadAPI(`/edit-vendor/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveVendors = () =>
  loadAPI(`/vendors/`, {
    method: 'GET',
    secure: true,
  });

export const createWarehouse = ({
  name,
  email,
  contact,
  address,
  city,
  pincode,
  state,
  pan,
  gst,
  document,
}) =>
  loadAPI('/create-warehouse/', {
    method: 'POST',
    data: {name, email, contact, address, city, pincode, state, pan, gst},
    secure: true,
  });

export const editWarehouse = (
  id,
  {name, email, contact, address, city, pincode, state, pan, gst, document},
) =>
  loadAPI(`/edit-warehouse/${id}/`, {
    method: 'PATCH',
    data: {name, email, contact, address, city, pincode, state, pan, gst},
    secure: true,
  });

export const deleteWarehouse = (id) =>
  loadAPI(`/edit-warehouse/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveWarehouse = (id) =>
  loadAPI(`/edit-warehouse/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveWarehouses = () =>
  loadAPI('/warehouse/', {
    method: 'GET',
    secure: true,
  });

export const editClientProfile = (
  id,
  {
    client_name,
    client_shipping_address,
    client_shipping_city,
    client_shipping_pincode,
    client_shipping_state,
    client_email,
    client_contact_no,
    client_contact_person,
    client_billing_address,
    client_city,
    client_pincode,
    client_state,
    client_region,
    client_payment_terms,
    client_category,
    client_product_user_types,
    client_pan,
    client_code,
    client_is_gst_registered,
    client_gst,
  },
) =>
  loadAPI(`/client-profile/${id}/`, {
    method: 'PATCH',
    data: {
      client_name,
      client_shipping_address,
      client_shipping_city,
      client_shipping_pincode,
      client_shipping_state,
      client_email,
      client_contact_no,
      client_contact_person,
      client_billing_address,
      client_city,
      client_pincode,
      client_state,
      client_region,
      client_payment_terms,
      client_category,
      client_product_user_types,
      client_pan,
      client_code,
      client_is_gst_registered,
      client_gst,
    },
    secure: true,
  });

export const retrieveClientProfile = (id) =>
  loadAPI(`/client-profile/${id}`, {
    method: 'GET',
    secure: true,
  });

export const createReceiverClient = ({name, city, address, emitter}) =>
  loadAPI('/create-receiverclient/', {
    method: 'POST',
    data: {name, city, address, emitter},
    secure: true,
  });

export const editReceiverClient = (id, {name, city, address, emitter}) =>
  loadAPI(`/edit-receiverclient/${id}/`, {
    method: 'PATCH',
    data: {name, city, address, emitter},
    secure: true,
  });

export const deleteReceiverClient = (id) =>
  loadAPI(`/edit-receiverclient/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveReceiverClient = (id) =>
  loadAPI(`/edit-receiverclient/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retieveReceiverClients = (id) =>
  loadAPI(`/receiverclients/`, {
    method: 'GET',
    secure: true,
  });
