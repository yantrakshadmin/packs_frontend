import {getFullName} from 'common/columns/demandModule.column';

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

export const getUniqueObject = (ar, key) => {
  return ar.filter((e, i) => ar.findIndex((a) => a[key] === e[key]) === i);
};
