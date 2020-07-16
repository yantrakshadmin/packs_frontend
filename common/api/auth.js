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
      document,
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
    document,
  },
) => {
  console.log(document);
  return loadAPI(`/edit-product/${id}/`, {
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
      document: document,
    },
  });
};

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
    client_product_user_type,
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
      client_product_user_type,
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

export const createFlow = ({
  flow_name,
  flow_info,
  flow_type,
  flow_days,
  sender_client,
  receiver_client,
  kits,
}) =>
  loadAPI('/create-flow/', {
    method: 'POST',
    secure: true,
    data: {flow_name, flow_info, flow_type, flow_days, sender_client, receiver_client, kits},
  });

export const editFlow = (
  id,
  {flow_name, flow_info, flow_type, flow_days, sender_client, receiver_client, kits},
) =>
  loadAPI(`/edit-flow/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: {flow_name, flow_info, flow_type, flow_days, sender_client, receiver_client, kits},
  });

export const retreiveFlow = (id) =>
  loadAPI(`/edit-flow/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retreiveFlows = (id) =>
  loadAPI(`/flows/`, {
    method: 'GET',
    secure: true,
  });

export const retreiveMyFlows = () =>
  loadAPI('/myflows/', {
    method: 'GET',
    secure: true,
  });

export const deleteFlow = (id) =>
  loadAPI(`/edit-flow/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const createMr = ({delivery_required_on, flows}) =>
  loadAPI('/create-mrequets/', {
    method: 'POST',
    data: {delivery_required_on, flows},
    secure: true,
  });

export const editMr = (id, {delivery_required_on, flows}) =>
  loadAPI(`/edit-mrequets/${id}/`, {
    method: 'PATCH',
    data: {delivery_required_on, flows},
    secure: true,
  });

export const retrieveMr = (id) =>
  loadAPI(`/edit-mrequets/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveMrs = () =>
  loadAPI('/mrequets/', {
    method: 'GET',
    secure: true,
  });

export const deleteMr = (id) =>
  loadAPI(`/edit-mrequets/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveEmployeeMrs = () =>
  loadAPI('/allmrequest/', {
    method: 'GET',
    secure: true,
  });

export const createAllotment = ({
  transaction_no,
  dispatch_date,
  send_from_warehouse,
  sales_order,
  flows,
  is_delivered,
  model,
  driver_name,
  driver_number,
  lr_number,
  vehicle_number,
  freight_charges,
  vehicle_type,
  transport_by,
  expected_delivery,
  remarks,
}) =>
  loadAPI('/create-allotment/', {
    method: 'POST',
    data: {
      transaction_no,
      dispatch_date,
      send_from_warehouse,
      sales_order,
      flows,
      is_delivered,
      model,
      driver_name,
      driver_number,
      lr_number,
      vehicle_number,
      freight_charges,
      vehicle_type,
      transport_by,
      expected_delivery,
      remarks,
    },
    secure: 'true',
  });

export const editAllotment = (
  id,
  {
    dispatch_date,
    send_from_warehouse,
    sales_order,
    flows,
    model,
    driver_name,
    driver_number,
    lr_number,
    vehicle_number,
    freight_charges,
    vehicle_type,
    transport_by,
    expected_delivery,
    remarks,
  },
) =>
  loadAPI(`/edit-allotment/${id}/`, {
    method: 'PATCH',
    data: {
      dispatch_date,
      send_from_warehouse,
      sales_order,
      flows,
      model,
      driver_name,
      driver_number,
      lr_number,
      vehicle_number,
      freight_charges,
      vehicle_type,
      transport_by,
      expected_delivery,
      remarks,
    },
    secure: true,
  });

export const retrieveAllotment = (id) =>
  loadAPI(`/edit-allotment/${id}/`, {
    methood: 'GET',
    secure: true,
  });

export const retrieveAllotments = () =>
  loadAPI('/allotments/', {
    method: 'GET',
    secure: true,
  });

export const deleteAllotment = (id) =>
  loadAPI(`/edit-allotment/${id}/`, {
    methood: 'DELETE',
    secure: true,
  });

export const createGRN = ({
  warehouse,
  material_vendor,
  transport_vendor,
  reference_no,
  inward_date,
  driver_number,
  vehicle_number,
  vehicle_type,
  invoice_no,
  invoice_amount,
  freight_charges,
  items,
  remarks,
  reciever,
}) =>
  loadAPI('/create-grn/', {
    method: 'POST',
    data: {
      warehouse,
      material_vendor,
      transport_vendor,
      reference_no,
      inward_date,
      driver_number,
      vehicle_number,
      vehicle_type,
      invoice_no,
      invoice_amount,
      freight_charges,
      items,
      remarks,
      reciever,
    },
    secure: true,
  });

export const editGRN = (
  id,
  {
    warehouse,
    material_vendor,
    transport_vendor,
    reference_no,
    inward_date,
    driver_number,
    vehicle_number,
    vehicle_type,
    invoice_no,
    invoice_amount,
    freight_charges,
    items,
    remarks,
    reciever,
  },
) =>
  loadAPI(`/edit-grn/${id}/`, {
    method: 'PATCH',
    data: {
      warehouse,
      material_vendor,
      transport_vendor,
      reference_no,
      inward_date,
      driver_number,
      vehicle_number,
      vehicle_type,
      invoice_no,
      invoice_amount,
      freight_charges,
      items,
      remarks,
      reciever,
    },
    secure: true,
  });

export const retrieveGRN = (id) =>
  loadAPI(`/edit-grn/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveGRNs = () =>
  loadAPI('/grns/', {
    method: 'GET',
    secure: true,
  });

export const deleteGRN = (id) =>
  loadAPI(`/edit-grn/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const createDelivered = ({allotment, delivered, items, document}) =>
  loadAPI('/create-delivered/', {
    method: 'POST',
    data: {allotment, delivered, items},
    secure: true,
  });

export const editDelivered = (id, {allotment, delivered, items, document}) =>
  loadAPI(`/edit-delivered/${id}/`, {
    method: 'PATCH',
    data: {allotment, delivered, items},
    secure: true,
  });

export const retrieveDelivered = (id) =>
  loadAPI(`/edit-delivered/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const createReturn = ({
  transaction_no,
  transaction_date,
  transaction_type,
  flow,
  items,
  driver_name,
  driver_number,
  lr_number,
  vehicle_number,
  freight_charges,
  vehicle_type,
  transport_by,
  warehouse,
  receiver_client,
  remarks,
}) =>
  loadAPI('/create-return/', {
    method: 'POST',
    data: {
      transaction_no,
      transaction_date,
      transaction_type,
      flow,
      items,
      driver_name,
      driver_number,
      lr_number,
      vehicle_number,
      freight_charges,
      vehicle_type,
      transport_by,
      warehouse,
      receiver_client,
      remarks,
    },
    secure: 'true',
  });

export const editReturn = (
  id,
  {
    transaction_no,
    transaction_date,
    transaction_type,
    flow,
    items,
    driver_name,
    driver_number,
    lr_number,
    vehicle_number,
    freight_charges,
    vehicle_type,
    transport_by,
    warehouse,
    receiver_client,
    remarks,
  },
) =>
  loadAPI(`/edit-return/${id}/`, {
    method: 'PATCH',
    data: {
      transaction_no,
      transaction_date,
      transaction_type,
      flow,
      items,
      driver_name,
      driver_number,
      lr_number,
      vehicle_number,
      freight_charges,
      vehicle_type,
      transport_by,
      warehouse,
      receiver_client,
      remarks,
    },
    secure: 'true',
  });

export const retrieveReturn = (id) =>
  loadAPI(`/edit-return/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveReturns = () =>
  loadAPI('/returndockets/', {
    method: 'GET',
    secure: true,
  });

export const deleteReturn = (id) =>
  loadAPI(`/edit-return/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveRFlows = () =>
  loadAPI('/r-flows/', {
    method: 'GET',
    secure: true,
  });

export const createReceived = ({returndocket, delivered, items, document}) =>
  loadAPI('/create-received/', {
    method: 'POST',
    data: {returndocket, delivered, items},
    secure: true,
  });

export const editReceived = (id, {returndocket, delivered, items}) =>
  loadAPI(`/edit-received/${id}/`, {
    method: 'PATCH',
    data: {returndocket, delivered, items},
    secure: true,
  });

export const retrieveReceived = (id) =>
  loadAPI(`/edit-received/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const deleteReceived = (id) =>
  loadAPI(`/edit-received/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const allDelivered = () => loadAPI('/delivered/', {});

export const allReceived = () => loadAPI('/received/', {});
