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
    'FLC':covertArray(['FLC'].concat(FLCSpecification)),
    'FSC':covertArray(['FSC'].concat(FLCSpecification)),
    'CRT6412':covertArray(['CRT6412'].concat(crateSpecification)),
    'CRT6418':covertArray(['CRT6418'].concat(crateSpecification)),
    'CRT6423':covertArray(['CRT6423'].concat(crateSpecification)),
    'CRT6435':covertArray(['CRT6435'].concat(crateSpecification)),
    'Palletized CRT6412':covertArray(['Palletized CRT6412'].concat(palletSpecification)),
    'Palletized CRT6418':covertArray(['Palletized CRT6418'].concat(palletSpecification)),
    'Palletized CRT6423':covertArray(['Palletized CRT6423'].concat(palletSpecification)),
    'Palletized CRT6435':covertArray(['Palletized CRT6435'].concat(palletSpecification)),
    'PP BOX':covertArray(['PP BOX'].concat(pPBoxSpecifications)),
    'Palletized PP Box':covertArray(['Palletized PP Box'].concat(palletizedPPBoxSpecifications)),
    'Plastic Pallet':covertArray(['Plastic Pallet'].concat(plasticPalletSpecifications)),
    'Wooden Pallet':covertArray(['Wooden Pallet'].concat(plasticPalletSpecifications)),
  };
  return specifications[type];
};
