export const getReformattedData=(obj={})=>(Object.keys(obj).map((key=>({
  short_code:key,
  quantity:obj[key][0],
  description:obj[key][1]
}))))

export const getReformattedAllotmentData = (obj={}) => (Object.keys(obj).map((key => ({
  short_code : key,
  quantity : obj[key][0],
  info : obj[key][1],
}))))

export const getReformattedReturnData = (obj={}) => (Object.keys(obj).map((key => ({
  	short_code : key,
  quantity : obj[key][0],
  info : obj[key][1],
}))))
