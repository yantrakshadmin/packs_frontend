export const mergeArray=(a,b)=>{
  return a.map((item) => ({ ...item, ...b.filter(i =>i.mr ===item.id)[0] }));
}


