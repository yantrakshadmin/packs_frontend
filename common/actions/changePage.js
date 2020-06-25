import {CHANGE_PAGE} from './index';

export const changePage = (currentPage) => {
  return {
    type: CHANGE_PAGE,
    payload: currentPage,
  };
};
