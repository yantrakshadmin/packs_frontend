import _ from 'lodash';

export const mergeArray = (a, b) => {
  return a.map((item) => {
    const obj = _.find(b, (i) => i.mr === item.id);
    if (obj) {
      return {
        ...item,
        is_rejected: obj.is_rejected,
        reason: obj.reason,
        mr: obj.mr,
        remarks: obj.remarks,
      };
    }
    return item;
  });
};

export const statusCheck = (isAllocated, isRejected) => {
  let status = 'Allocated';
  if (!isAllocated && !isRejected) {
    status = 'Pending';
  } else if (isAllocated && !isRejected) {
    status = 'Allocated';
  } else if (!isAllocated && isRejected) {
    status = 'Rejected';
  }
  return status;
};

export const filterActive = (_, data) => {
  return _.filter(data, (el) => el.active);
};

export const ifNanReturnZero = (num) => {
  return parseInt(num) ? parseInt(num) : 0;
};

export const ifNanReturnZeroFloat = (num) => {
  return parseFloat(num) ? parseFloat(num) : 0;
};

export const ifNotStrReturnA = (s) => {
  return String(s) ? String(s) : 'a';
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
