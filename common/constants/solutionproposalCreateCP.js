import { createFields } from 'common/formFields/createCP/solutionProposalCreateCP.formFields';

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

export const getLabels = (type,insertType)=>{
  const specifications = {
    'FLC':insertType==='Insert'?[
      'Standard Assets',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet',
    ]:[
      'Standard Assets',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'FSC':insertType==='Insert'?[
      'Standard Assets',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet',
    ]:[
      'Standard Assets',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'CRT6412':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet',
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'CRT6418':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet',
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'CRT6423':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet'
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'CRT6435':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet'
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'Palletized CRT6412':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet'
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'Palletized CRT6418':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet'
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'Palletized CRT6423':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet'
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Separator Sheet',
      'Mould',
      'HDPE',],
    'Palletized CRT6435':insertType==='Insert'?[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Insert Type 1',
      'Insert Type 2',
      'Separator Sheet'
    ]:[
      'Standard Assets',
      'Crate Lid',
      'Palletized Lid',
      'Pallet',
      'Separator Sheet',
      'Mould',
      'HDPE',
    ],
    'PP BOX':[
      'Standard Assets',
    ],
    'Palletized PP Box':[
      'Standard Assets',
      'Palletized Lid',
      'Pallet',
    ],
    'Plastic Pallet':[
      'Standard Assets',
      'Palletized Lid',
    ],
    'Wooden Pallet':[
      'Standard Assets',
      'Palletized Lid',]
  };
  return specifications[type];
}

export const getFields = (type,insertType) => {
  const specifications = {
    'FLC':insertType==='Insert'?createFields([
      'std_ast',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'FSC':insertType==='Insert'?createFields([
      'std_ast',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'CRT6412':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'CRT6418':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'CRT6423':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'CRT6435':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'Palletized CRT6412':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'Palletized CRT6418':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'Palletized CRT6423':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'Palletized CRT6435':insertType==='Insert'?createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'insert1',
      'insert2',
      'sep_sheet',
    ]):createFields([
      'std_ast',
      'crate_lid',
      'palletized_lid',
      'pallet',
      'sep_sheet',
      'mould',
      'hdpe',
    ]),
    'PP BOX':insertType==='Insert'?createFields([
      'std_ast',
    ]):createFields([
      'std_ast',
    ]),
    'Palletized PP Box':createFields([
      'std_ast',
      'palletized_lid',
      'pallet',
    ]),
    'Plastic Pallet':createFields([
      'std_ast',
      'palletized_lid',
    ]),
    'Wooden Pallet':createFields([
      'std_ast',
      'palletized_lid',
    ])
  };
  return specifications[type];
};


