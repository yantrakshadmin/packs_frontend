export const solutionAssetOptions = [
  'FLC',
  'FSC',
  'CRT6412',
  'CRT6418',
  'CRT6423',
  'CRT6435',
  'Palletized CRT6412',
  'Palletized CRT6418',
  'Palletized CRT6423',
  'Palletized CRT6435',
  'PP BOX',
  'Palletized PP Box',
  'Plastic Pallet',
  'Wooden Pallet',
]

const FLCSpecification = [
  'Insert Type 1',
  'Insert Type 2',
  'Separator Sheet',
  'Mould Cost',
  'HDPE Trays'];

const crateSpecification = [
  'Crate LID',
  ...FLCSpecification
];
const palletSpecification = [
  'Palletized LID',
  'Pallet 1200x100',
  ...FLCSpecification
];

const pPBoxSpecifications = [

]

const palletizedPPBoxSpecifications = [
  'Palletized LID',
  'Pallet'
]

const plasticPalletSpecifications = [
  'Palletized LID',
]

const covertArray=(arr)=>{
  return arr.map(item=>({
    specification:item,
    quantity:0,
    quantity_per_kit:0,
    rate:'',
    total_cost:0,
    month:'',
    dep_cost:''
  }))
}

export const getSpecifications = (type) => {
  const specifications = {
    'FLC':covertArray(FLCSpecification),
    'FSC':covertArray(FLCSpecification),
    'CRT6412':covertArray(crateSpecification),
    'CRT6418':covertArray(crateSpecification),
    'CRT6423':covertArray(crateSpecification),
    'CRT6435':covertArray(crateSpecification),
    'Palletized CRT6412':covertArray(palletSpecification),
    'Palletized CRT6418':covertArray(palletSpecification),
    'Palletized CRT6423':covertArray(palletSpecification),
    'Palletized CRT6435':covertArray(palletSpecification),
    'PP BOX':covertArray(pPBoxSpecifications),
    'Palletized PP Box':covertArray(palletizedPPBoxSpecifications),
    'Plastic Pallet':covertArray(plasticPalletSpecifications),
    'Wooden Pallet':covertArray(plasticPalletSpecifications),
  };
  return specifications[type];
};
