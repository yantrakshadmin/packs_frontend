import {getFullName} from 'common/columns/demandModule.column';
import moment from 'moment';

export const GetUniqueValue = (arr, key) => {
  const newArr = [...new Set(arr.map((item) => item[key]))];
  return newArr.map((item) => ({text: item, value: item}));
};

export const GetUniqueValueNested = (arr, key1, key2) => {
  const newArr = [...new Set(arr.map((item) => item[key1][key2]))];
  return newArr.map((item) => ({text: item, value: item}));
};

export const GetUniqueValueFullName = (arr, owner, first_name, last_name) => {
  const newArr = [
    ...new Set(arr.map((item) => getFullName(item[owner][first_name], item[owner][last_name]))),
  ];
  return newArr.map((item) => ({text: item, value: item}));
};

export const GetUniqueValueMonth = (arr, key1) => {
  const newArr = arr.map((item) => item[key1]);
  newArr.sort(function (a, b) {
    return moment(b).unix() - moment(a).unix();
  });
  const temp = [...new Set(newArr.map((item) => moment(item).format('MMMM YYYY')))];
  return temp.map((item) => ({text: item, value: item}));
};

export const getUniqueObject = (ar, key) => {
  return ar.filter((e, i) => ar.findIndex((a) => a[key] === e[key]) === i);
};
