export const mergeArray=(a,b)=>{
  return a.map((item) => {
    const obj = b.filter(i => i.mr === item.id)[0];
    return  { ...item,
      is_rejected:obj.is_rejected,
      reason:obj.reason,
      mr:obj.mr,
      remark:obj.remark
    }
  });
}


