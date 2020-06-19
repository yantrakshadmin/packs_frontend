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
