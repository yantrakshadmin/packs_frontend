
export const useFilterPieChartData=(obj,filterKey)=>{
  const newArr = [];
  let sum = 0;
  let filteredData = [];
  Object.keys(obj).map((key)=>{
    if(filterKey){
      sum += obj[key];

    }
    return newArr.push({ name:key,value:obj[key] })
  })
  if(filterKey){
    filteredData = [{
      value:obj[filterKey],
      name:filterKey
    },{
      value:sum-obj[filterKey],
      name:'Others'
    }]
  }
  return { data : newArr, filteredData };
}
