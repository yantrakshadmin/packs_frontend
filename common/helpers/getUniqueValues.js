export const GetUniqueValue=(arr,key)=>{
  const newArr = [...new Set(arr.map(item => item[key]))]
  return newArr.map(item =>({ text:item,value:item }))
}

export const GetUniqueValueNested=(arr,key1,key2)=>{
  const newArr = [...new Set(arr.map(item => item[key1][key2]))]
  return newArr.map(item =>({ text:item,value:item }))
}
export const getUniqueObject=(ar,key)=>{
 return ar.filter((e, i) => ar.findIndex(a => a[key] === e[key]) === i);
}
