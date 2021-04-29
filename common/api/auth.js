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

export const createProduct = (req) =>
  loadAPI('/create-product/', {
    method: 'POST',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveProducts = () =>
  loadAPI('/products/', {
    method: 'GET',
    secure: true,
  });

export const editProduct = (id, req) => {
  return loadAPI(`/edit-product/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: req,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
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

export const createKit = ({
  kit_name,
  kit_info,
  components_per_kit,
  kit_client,
  part_name,
  part_number,
  kit_type,
  products,
  active,
}) =>
  loadAPI('/create-kit/', {
    method: 'POST',
    secure: true,
    data: {
      kit_name,
      kit_info,
      components_per_kit,
      kit_client,
      part_name,
      part_number,
      kit_type,
      products,
      active,
    },
  });

export const editKit = (
  id,
  {
    kit_name,
    kit_info,
    components_per_kit,
    kit_client,
    part_name,
    part_number,
    kit_type,
    products,
    active,
  },
) =>
  loadAPI(`/edit-kit/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: {
      kit_name,
      kit_info,
      components_per_kit,
      kit_client,
      part_name,
      part_number,
      kit_type,
      products,
      active,
    },
  });

export const retrieveKits = () =>
  loadAPI('/kits/', {
    method: 'GET',
    secure: true,
  });

export const retrieveKitsClients = () =>
  loadAPI('/client-kits/', {
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

export const createOutward = (data) =>
  loadAPI('create-outward/', {
    method: 'POST',
    secure: true,
    data,
  });

export const editOutward = (id, data) =>
  loadAPI(`edit-outward/${id}/`, {
    method: 'PATCH',
    secure: true,
    data,
  });

export const deleteOutward = (id) =>
  loadAPI(`edit-outward/${id}/`, {
    method: 'Delete',
    secure: true,
  });

export const retrieveOutward = (id) =>
  loadAPI(`edit-outward/${id}/`, {
    method: 'GET',
    secure: true,
  });
export const retrieveOutwardDocket = (id) =>
  loadAPI(`outwards/?id=${id}`, {
    method: 'GET',
    secure: true,
  });

export const retrieveOutwardDocketEmp = (id) =>
  loadAPI(`emp-outwards/?id=${id}`, {
    method: 'GET',
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
  active,
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
      active,
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
    active,
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
      active,
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

export const createWarehouse = (req) =>
  loadAPI('/create-warehouse/', {
    method: 'POST',
    secure: true,
    data: req,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const editWarehouse = (id, req) =>
  loadAPI(`/edit-warehouse/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: req,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
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

export const editClientProfile = (id, req) =>
  loadAPI(`/client-profile/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: req,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveClientProfile = (id) =>
  loadAPI(`/client-profile/${id}`, {
    method: 'GET',
    secure: true,
  });

export const editEmployeeProfile = (id, req) =>
  loadAPI(`/emp-profile/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: req,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveEmployeeProfile = (id) =>
  loadAPI(`/emp-profile/${id}`, {
    method: 'GET',
    secure: true,
  });

export const createReceiverClient = ({name, city, address, emitter, pan, gst, active}) =>
  loadAPI('/create-receiverclient/', {
    method: 'POST',
    data: {name, city, address, emitter, pan, gst, active},
    secure: true,
  });

export const editReceiverClient = (id, {name, city, address, emitter, pan, gst, active}) =>
  // loadAPI(`/edit-receiverclient/${id}/`, {
  loadAPI(`/edit-receiverclient/${id}/`, {
    method: 'PATCH',
    data: {name, city, address, emitter, pan, gst, active},
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

export const retieveReceiverClientsClientSide = () =>
  loadAPI(`/client-reciever-client/`, {
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
  active,
}) =>
  loadAPI('/create-flow/', {
    method: 'POST',
    secure: true,
    data: {
      flow_name,
      flow_info,
      flow_type,
      flow_days,
      sender_client,
      receiver_client,
      kits,
      active,
    },
  });

export const editFlow = (
  id,
  {flow_name, flow_info, flow_type, flow_days, sender_client, receiver_client, kits, active},
) =>
  loadAPI(`/edit-flow/${id}/`, {
    method: 'PATCH',
    secure: true,
    data: {
      flow_name,
      flow_info,
      flow_type,
      flow_days,
      sender_client,
      receiver_client,
      kits,
      active,
    },
  });

export const retreiveFlow = (id) =>
  loadAPI(`/edit-flow/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retreiveFlows = () =>
  loadAPI(`/flows/`, {
    method: 'GET',
    secure: true,
  });

export const retreiveFlowsClient = () =>
  loadAPI(`/client-flows/`, {
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

export const createMr = ({delivery_required_on, flows, client_id}) =>
  loadAPI('/create-mrequets/', {
    method: 'POST',
    data: {delivery_required_on, flows, client_id},
    secure: true,
  });

export const editMr = (id, {delivery_required_on, flows}) =>
  loadAPI(`/edit-mrequets/${id}/`, {
    method: 'PATCH',
    data: {delivery_required_on, flows},
    secure: true,
  });

export const editAddMr = (id, {delivery_required_on, flows, client_id}) =>
  loadAPI(`/admin-mredit/${id}/`, {
    method: 'PATCH',
    data: {delivery_required_on, flows, client_id},
    secure: true,
  });

export const retrieveMr = (id) =>
  loadAPI(`/edit-mrequets/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveAddMr = (id) =>
  loadAPI(`/admin-mredit/${id}/`, {
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

export const deleteAddMr = (id) =>
  loadAPI(`/admin-mredit/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const createDm = ({delivery_month, demand_flows, client_id}) =>
  loadAPI('/create-demand/', {
    method: 'POST',
    data: {delivery_month, demand_flows, client_id},
    secure: true,
  });

export const editDm = (id, {delivery_month, demand_flows}) =>
  loadAPI(`/edit-demand/${id}/`, {
    method: 'PATCH',
    data: {delivery_month, demand_flows},
    secure: true,
  });

export const editAddDm = (id, {delivery_required_on, flows, client_id}) =>
  loadAPI(`/admin-mredit/${id}/`, {
    method: 'PATCH',
    data: {delivery_required_on, flows, client_id},
    secure: true,
  });

export const retrieveDm = (id) =>
  loadAPI(`/edit-demand/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveAddDm = (id) =>
  loadAPI(`/admin-mredit/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveDms = () =>
  loadAPI('/demands/', {
    method: 'GET',
    secure: true,
  });

export const retrieveDmsClient = () =>
  loadAPI('/client-demands/', {
    method: 'GET',
    secure: true,
  });

export const deleteDm = (id) =>
  loadAPI(`/edit-demand/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const deleteAddDm = (id) =>
  loadAPI(`/admin-mredit/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveEmployeeMrs = () =>
  loadAPI('/allmrequest/', {
    method: 'GET',
    secure: true,
  });

export const retrieveEmployeeMrsEfficient = () =>
  loadAPI('/allmrequest-table/', {
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

export const retrieveAllotments = (id) =>
  loadAPI('/allotments/', {
    method: 'GET',
    secure: true,
    params: {id},
  });

export const retrieveAllotmentsCalender = (tno) =>
  loadAPI(`/allotments-cal/?tno=${tno}`, {
    method: 'GET',
    secure: false,
  });

export const deleteAllotment = (id) =>
  loadAPI(`/edit-allotment/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const createGRN = (data) =>
  loadAPI('/create-grn/', {
    method: 'POST',
    secure: true,
    data,
    // headers: {
    //   'Content-Type': 'multipart/form-data  boundary=' + Math.random().toString().substr(2),
    // },
  });

export const editGRN = (id, data) =>
  loadAPI(`/edit-grn/${id}/`, {
    method: 'PATCH',
    secure: true,
    data,
    // headers: {
    //   'Content-Type': 'multipart/form-data  boundary=' + Math.random().toString().substr(2),
    // },
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

export const createRegGRN = (data) =>
  loadAPI('/create-regrn/', {
    method: 'POST',
    secure: true,
    data,
    // headers: {
    //   'Content-Type': 'multipart/form-data  boundary=' + Math.random().toString().substr(2),
    // },
  });

export const editRegGRN = (id, data) =>
  loadAPI(`/edit-regrn/${id}/`, {
    method: 'PATCH',
    secure: true,
    data,
    // headers: {
    //   'Content-Type': 'multipart/form-data  boundary=' + Math.random().toString().substr(2),
    // },
  });

export const retrieveRegGRN = (id) =>
  loadAPI(`/edit-regrn/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveRegGRNs = () =>
  loadAPI('/regrns/', {
    method: 'GET',
    secure: true,
  });

export const deleteRegGRN = (id) =>
  loadAPI(`/edit-regrn/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const createDelivered = (req) =>
  loadAPI('/create-delivered/', {
    method: 'POST',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });
export const editDelivered = (id, req) =>
  loadAPI(`/e-delivered/${id}/`, {
    method: 'PATCH',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveDelivered = (id) =>
  loadAPI(`/edit-delivered/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const createOutwardDeliveredDocket = (req) =>
  loadAPI('/create-inward/', {
    method: 'POST',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });
export const editOutwardDeliveredDocket = (id, req) =>
  loadAPI(`/e-inward/${id}/`, {
    method: 'PATCH',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveOutwardDeliveredDocket = (id) =>
  loadAPI(`/edit-inward/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const deleteOutwardDeliveredDocket = (id) =>
  loadAPI(`/edit-inward/${id}/`, {
    method: 'Delete',
    secure: true,
  });

export const leadFileUpload = (req) =>
  loadAPI('/upload-pfep/', {
    method: 'POST',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const tpFileUpload = (req) =>
  loadAPI('/upload-tp/', {
    method: 'POST',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const tpFileReUpload = (id, req) =>
  loadAPI(`/reupload-tp/${id}/`, {
    method: 'PATCH',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const createReturn = (data) =>
  loadAPI('/create-return/', {
    method: 'POST',
    data,
    secure: 'true',
  });

export const editReturn = (
  id,
  {
    transaction_no,
    transaction_date,
    transaction_type,
    flow,
    kits,
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
      kits,
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
//
// export const retrieveReturns = () =>
//   loadAPI('/return-table/', {
//     method: 'GET',
//     secure: true,
//   });

export const retrieveReturns = (id) =>
  loadAPI('/return-received/', {
    method: 'GET',
    secure: true,
    params: {id},
  });
//
// export const retrieveReturns = () =>
//   loadAPI('/return-table/', {
//     method: 'GET',
//     secure: true,
//   });

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

export const createReceived = (req) =>
  loadAPI('/create-received/', {
    method: 'POST',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const editReceived = (id, req) =>
  // loadAPI(`/edit-received/${id}/`, {
  loadAPI(`/e-received/${id}/`, {
    method: 'PATCH',
    data: req,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
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

export const allDelivered = () =>
  loadAPI('/delivered/', {
    method: 'GET',
    secure: true,
  });

export const allInward = () =>
  loadAPI('/inward/', {
    method: 'GET',
    secure: true,
  });

export const allReceived = () => loadAPI('/received/', {});

export const retrieveGRNBars = (id) =>
  loadAPI(`/grn-barcodes/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveGRNBarCodes = (id) =>
  loadAPI(`/print-barcodes/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const retrieveAllotmentReport = ({cname, to, from}) =>
  loadAPI(`/allotment-reports/`, {
    method: 'GET',
    secure: true,
    params: {
      cname,
      to,
      from,
    },
  });

export const retrieveStockingReport = ({to, from, cname}) =>
  loadAPI(`/floating-report/`, {
    method: 'GET',
    secure: true,
    params: {
      to,
      from,
      cname,
    },
  });

export const retrieveReturnReport = ({cname, to, from}) =>
  loadAPI(`/return-reports/`, {
    method: 'GET',
    secure: true,
    params: {
      cname,
      to,
      from,
    },
  });

export const retrieveAllotmentsDelivered = (id) =>
  loadAPI('/allotments-delivered/', {
    method: 'GET',
    secure: true,
    params: {id},
  });

export const retrieveDocketOutwardInward = (id) =>
  loadAPI('/outward-inward/', {
    method: 'GET',
    secure: true,
    params: {id},
  });

export const retrieveReturnDocket = (id) =>
  loadAPI('/return-docket/', {
    method: 'GET',
    secure: true,
    params: {
      id,
    },
  });

export const retrieveReturnDocketCaleder = (id) =>
  loadAPI(`/returns-cal/?tno=${id}`, {
    method: 'GET',
    secure: false,
  });

export const createLead = (data) =>
  loadAPI('/create-leads/', {
    method: 'POST',
    secure: true,
    data,
  });

export const retrieveLeads = () =>
  loadAPI('/leads/', {
    method: 'GET',
    secure: true,
  });

export const retrieveCP = () =>
  loadAPI('/cp/', {
    method: 'GET',
    secure: true,
  });

export const retrievePFEP = () =>
  loadAPI('/pfep/', {
    method: 'GET',
    secure: true,
  });

export const editLead = (id, data) =>
  loadAPI(`/edit-leads/${id}/`, {
    method: 'PATCH',
    secure: true,
    data,
  });

export const retrieveLead = (id) =>
  loadAPI(`/edit-leads/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const deleteLead = (id) =>
  loadAPI(`/edit-leads/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const postAltBarcodes = (data) => {
  return loadAPI('dispatch-allotment/', {
    method: 'POST',
    secure: true,
    data,
  });
};

export const patchAltBarcodes = (data, id) => {
  return loadAPI(`/dispatch-allotment-upd/${id}/`, {
    method: 'PATCH',
    secure: true,
    data,
  });
};

export const postReturnBarcodes = (data) => {
  return loadAPI('dispatch-return/', {
    method: 'POST',
    secure: true,
    data,
  });
};
export const createPFEP = (data) => {
  return loadAPI('create-pfep/', {
    method: 'POST',
    secure: true,
    data,
  });
};

export const deletePFEP = (id) =>
  loadAPI(`/edit-pfep/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const editPFEP = (id, data) =>
  loadAPI(`/edit-pfep/${id}/`, {
    method: 'PATCH',
    secure: true,
    data,
  });

export const createCP = (data) => {
  return loadAPI('create-cp/', {
    method: 'POST',
    secure: true,
    data,
  });
};

export const deleteCP = (id) =>
  loadAPI(`/edit-cp/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const editCP = (id, data) =>
  loadAPI(`/edit-cp/${id}/`, {
    method: 'PATCH',
    secure: true,
    data,
  });

export const retrieveTestInv = (data) => {
  return loadAPI('inv-items/', {
    method: 'GET',
    secure: true,
    data,
  });
};

export const createTestInv = (data) => {
  return loadAPI('create-inv/', {
    method: 'POST',
    secure: true,
    data,
  });
};

export const deleteTestInv = (id) =>
  loadAPI(`/edit-inv/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveSC2TestInvClientSide = (rp) => {
  return loadAPI(`sc-inv-items/?id=${rp.id}`, {
    method: 'GET',
    secure: true,
  });
};

export const retrieveSC2TestInv = (data) => {
  return loadAPI('sc-inv-items/', {
    method: 'GET',
    secure: true,
    data,
  });
};

export const createSC2TestInv = (data) => {
  return loadAPI('create-sc-inv/', {
    method: 'POST',
    secure: true,
    data,
  });
};

export const deleteSC2TestInv = (id) =>
  loadAPI(`/edit-sc-inv/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveRC2TestInv = (data) => {
  return loadAPI('rc-inv-items/', {
    method: 'GET',
    secure: true,
    data,
  });
};

export const createRC2TestInv = (data) => {
  return loadAPI('create-rc-inv/', {
    method: 'POST',
    secure: true,
    data,
  });
};

export const deleteRC2TestInv = (id) =>
  loadAPI(`/edit-rc-inv/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const createMRStatus = (data) => {
  return loadAPI('create-mrstatus/', {
    method: 'POST',
    secure: true,
    data,
  });
};

export const createExpense = (src) =>
  loadAPI('/create-expense/', {
    method: 'POST',
    data: src,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveExpenses = () =>
  loadAPI('/expenses/', {
    method: 'GET',
    secure: true,
  });

export const deleteExpense = (id) =>
  loadAPI(`/edit-expense/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveExpense = (id) =>
  loadAPI(`/edit-expense/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const editExpense = (id, src) =>
  loadAPI(`/edit-expense/${id}/`, {
    method: 'PATCH',
    data: src,
    secure: true,
  });

export const editExpenseTest = (id, src) =>
  loadAPI(`/ed-expense/${id}/`, {
    method: 'PATCH',
    data: src,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const createAdjustment = (src) =>
  loadAPI('/create-adjustments/', {
    method: 'POST',
    data: src,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveAdjustments = () =>
  loadAPI('/adjustments/', {
    method: 'GET',
    secure: true,
  });

export const retrieveAdjustmentClients = () =>
  loadAPI('/clientadjust/', {
    method: 'GET',
    secure: true,
  });

export const uploadAdjustmentDocument = (src) =>
  loadAPI('/upload-audit/', {
    method: 'POST',
    data: src,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const createClientAdjustment = (src) =>
  loadAPI('/create-clientadjust/', {
    method: 'POST',
    data: src,
    secure: true,
  });

export const createGroup = (src) =>
  loadAPI('/create-group/', {
    method: 'POST',
    data: src,
    secure: true,
  });

export const retrieveGroups = () =>
  loadAPI('/group/', {
    method: 'GET',
    secure: true,
  });

export const deleteGroup = (id) =>
  loadAPI(`/edit-group/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveGroup = (id) =>
  loadAPI(`/edit-group/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const editGroup = (id, src) =>
  loadAPI(`/edit-group/${id}/`, {
    method: 'PATCH',
    data: src,
    secure: true,
  });

export const createSCAdjustment = (src) =>
  loadAPI('/create-sc-adjustments/', {
    method: 'POST',
    data: src,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveSCAdjustments = () =>
  loadAPI('/sc-adjustments/', {
    method: 'GET',
    secure: true,
  });

export const createRCAdjustment = (src) =>
  loadAPI('/create-rc-adjustments/', {
    method: 'POST',
    data: src,
    secure: true,
    headers: {
      'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    },
  });

export const retrieveRCAdjustments = () =>
  loadAPI('/rc-adjustments/', {
    method: 'GET',
    secure: true,
  });

export const createRelocation = (src) =>
  loadAPI('/create-relocation/', {
    method: 'POST',
    data: src,
    secure: true,
    // headers: {
    //   'Content-Type': `multipart/form-data  boundary=${Math.random().toString().substr(2)}`,
    // },
  });

export const retrieveRelocations = () =>
  loadAPI('/relocations/', {
    method: 'GET',
    secure: true,
  });

export const deleteRelocation = (id) =>
  loadAPI(`/edit-relocation/${id}/`, {
    method: 'DELETE',
    secure: true,
  });

export const retrieveRelocation = (id) =>
  loadAPI(`/edit-relocation/${id}/`, {
    method: 'GET',
    secure: true,
  });

export const editRelocation = (id, src) =>
  loadAPI(`/edit-relocation/${id}/`, {
    method: 'PATCH',
    data: src,
    secure: true,
  });

export const retrieveRelocationDocketData = (tno) =>
  loadAPI(`/relocation-template/?tno=${tno}`, {
    method: 'GET',
    secure: false,
  });

export const forgotPassword = (src) =>
  loadAPI('/password-reset/', {
    method: 'POST',
    data: src,
    secure: false,
  });

export const confirmPassword = (src) =>
  loadAPI('/password-reset/confirm/', {
    method: 'POST',
    data: src,
    secure: false,
  });
