export const mergeArray=(a,b)=>{
  return a.map((item) => ({ ...item, ...b.filter(i =>i.id ===item.id)[0] }));
}


