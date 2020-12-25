export const getReformattedData=(obj={})=>(Object.keys(obj).map((key=>({
  short_code:key,
  quantity:obj[key] }))))
