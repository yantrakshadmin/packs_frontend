import {FETCH_PRODUCTS} from './index';
import {retrieveProducts} from '../api/auth';

export const fetchProducts = (data) => {
  return {
    type: FETCH_PRODUCTS,
    payload: data,
  };
};

export const fetchProductsAsync = () => async (dispatch) => {
  const {data} = await retrieveProducts();
  console.log('fetched products', data);

  dispatch(fetchProducts(data));
};
