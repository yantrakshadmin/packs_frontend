import {createFields} from 'common/formFields/createCP/solutionProposalCreateCP.formFields';

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
  'PP Box',
  'Palletized PP Box',
  'Plastic Pallet',
  'Wooden Pallet',
];

export const getSolutionProposal = (record) => {
  if (
    record.standard_assets === 'FLC' ||
    record.standard_assets === 'FSC' ||
    record.standard_assets === 'PP Box'
  ) {
    return {
      [record.standard_assets]: record.std_ast_quantity_perkit,
    };
  }
  if (
    record.standard_assets === 'CRT6412' ||
    record.standard_assets === 'CRT6418' ||
    record.standard_assets === 'CRT6423' ||
    record.standard_assets === 'CRT6435'
  ) {
    return {
      [record.standard_assets]: record.crate_lid_quantity_perkit,
    };
  }
  if (
    record.standard_assets === 'Palletized CRT6412' ||
    record.standard_assets === 'Palletized CRT6418' ||
    record.standard_assets === 'Palletized CRT6423' ||
    record.standard_assets === 'Palletized CRT6435' ||
    record.standard_assets === 'Palletized PP Box' ||
    record.standard_assets === 'Plastic Pallet' ||
    record.standard_assets === 'Wooden Pallet'
  ) {
    return {
      Lid: 1,
      Crate: 1,
      [record.standard_assets]: record.palletized_lid_quantity_perkit,
    };
  }

  return {};
};

export const insertTypeOptions = ['Insert', 'HDPE Tray'];

export const getLabels = (type, insertType) => {
  const specifications = {
    FLC:
      insertType === 'Insert'
        ? ['FLC', 'Insert Type 1', 'Insert Type 2', 'Separator Sheet']
        : ['FLC', 'Separator Sheet', 'Mould', 'HDPE'],
    FSC:
      insertType === 'Insert'
        ? ['FSC', 'Insert Type 1', 'Insert Type 2', 'Separator Sheet']
        : ['FSC', 'Separator Sheet', 'Mould', 'HDPE'],
    CRT6412:
      insertType === 'Insert'
        ? ['CRT6412', 'Crate Lid', 'Insert Type 1', 'Insert Type 2', 'Separator Sheet']
        : ['CRT6412', 'Crate Lid', 'Separator Sheet', 'Mould', 'HDPE'],
    CRT6418:
      insertType === 'Insert'
        ? ['CRT6418', 'Crate Lid', 'Insert Type 1', 'Insert Type 2', 'Separator Sheet']
        : ['CRT6418', 'Crate Lid', 'Separator Sheet', 'Mould', 'HDPE'],
    CRT6423:
      insertType === 'Insert'
        ? ['CRT6423', 'Crate Lid', 'Insert Type 1', 'Insert Type 2', 'Separator Sheet']
        : ['CRT6423', 'Crate Lid', 'Separator Sheet', 'Mould', 'HDPE'],
    CRT6435:
      insertType === 'Insert'
        ? ['CRT6435', 'Crate Lid', 'Insert Type 1', 'Insert Type 2', 'Separator Sheet']
        : ['CRT6435', 'Crate Lid', 'Separator Sheet', 'Mould', 'HDPE'],
    'Palletized CRT6412':
      insertType === 'Insert'
        ? [
            'Palletized CRT6412',
            'Palletized Lid',
            'Pallet',
            'Insert Type 1',
            'Insert Type 2',
            'Separator Sheet',
          ]
        : ['Palletized CRT6412', 'Palletized Lid', 'Pallet', 'Separator Sheet', 'Mould', 'HDPE'],
    'Palletized CRT6418':
      insertType === 'Insert'
        ? [
            'Palletized CRT6418',
            'Palletized Lid',
            'Pallet',
            'Insert Type 1',
            'Insert Type 2',
            'Separator Sheet',
          ]
        : ['Palletized CRT6418', 'Palletized Lid', 'Pallet', 'Separator Sheet', 'Mould', 'HDPE'],
    'Palletized CRT6423':
      insertType === 'Insert'
        ? [
            'Palletized CRT6423',
            'Palletized Lid',
            'Pallet',
            'Insert Type 1',
            'Insert Type 2',
            'Separator Sheet',
          ]
        : ['Palletized CRT6423', 'Palletized Lid', 'Pallet', 'Separator Sheet', 'Mould', 'HDPE'],
    'Palletized CRT6435':
      insertType === 'Insert'
        ? [
            'Palletized CRT6435',
            'Palletized Lid',
            'Pallet',
            'Insert Type 1',
            'Insert Type 2',
            'Separator Sheet',
          ]
        : ['Palletized CRT6435', 'Palletized Lid', 'Pallet', 'Separator Sheet', 'Mould', 'HDPE'],
    'PP Box': ['PP Box'],
    'Palletized PP Box': ['Palletized PP Box', 'Palletized Lid', 'Pallet'],
    'Plastic Pallet': ['Plastic Pallet', 'Palletized Lid'],
    'Wooden Pallet': ['Wooden Pallet', 'Palletized Lid'],
  };
  return specifications[type];
};

export const getFields = (type, insertType) => {
  const specifications = {
    FLC:
      insertType === 'Insert'
        ? createFields(['std_ast', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'sep_sheet', 'mould', 'hdpe']),
    FSC:
      insertType === 'Insert'
        ? createFields(['std_ast', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'sep_sheet', 'mould', 'hdpe']),
    CRT6412:
      insertType === 'Insert'
        ? createFields(['std_ast', 'crate_lid', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'crate_lid', 'sep_sheet', 'mould', 'hdpe']),
    CRT6418:
      insertType === 'Insert'
        ? createFields(['std_ast', 'crate_lid', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'crate_lid', 'sep_sheet', 'mould', 'hdpe']),
    CRT6423:
      insertType === 'Insert'
        ? createFields(['std_ast', 'crate_lid', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'crate_lid', 'sep_sheet', 'mould', 'hdpe']),
    CRT6435:
      insertType === 'Insert'
        ? createFields(['std_ast', 'crate_lid', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'crate_lid', 'sep_sheet', 'mould', 'hdpe']),
    'Palletized CRT6412':
      insertType === 'Insert'
        ? createFields(['std_ast', 'palletized_lid', 'pallet', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'palletized_lid', 'pallet', 'sep_sheet', 'mould', 'hdpe']),
    'Palletized CRT6418':
      insertType === 'Insert'
        ? createFields(['std_ast', 'palletized_lid', 'pallet', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'palletized_lid', 'pallet', 'sep_sheet', 'mould', 'hdpe']),
    'Palletized CRT6423':
      insertType === 'Insert'
        ? createFields(['std_ast', 'palletized_lid', 'pallet', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'palletized_lid', 'pallet', 'sep_sheet', 'mould', 'hdpe']),
    'Palletized CRT6435':
      insertType === 'Insert'
        ? createFields(['std_ast', 'palletized_lid', 'pallet', 'insert1', 'insert2', 'sep_sheet'])
        : createFields(['std_ast', 'palletized_lid', 'pallet', 'sep_sheet', 'mould', 'hdpe']),
    'PP Box': insertType === 'Insert' ? createFields(['std_ast']) : createFields(['std_ast']),
    'Palletized PP Box': createFields(['std_ast', 'palletized_lid', 'pallet']),
    'Plastic Pallet': createFields(['std_ast', 'palletized_lid']),
    'Wooden Pallet': createFields(['std_ast', 'palletized_lid']),
  };
  return specifications[type];
};

export const formatStr = (str, typeStr) => {
  return `${str}_${typeStr}`;
};

export const getFieldsByColumn = (type, insertType, typeStr) => {
  const specifications = {
    FLC:
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    FSC:
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    CRT6412:
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    CRT6418:
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    CRT6423:
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    CRT6435:
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('crate_lid', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    'Palletized CRT6412':
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    'Palletized CRT6418':
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    'Palletized CRT6423':
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    'Palletized CRT6435':
      insertType === 'Insert'
        ? [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('insert1', typeStr),
            formatStr('insert2', typeStr),
            formatStr('sep_sheet', typeStr),
          ]
        : [
            formatStr('std_ast', typeStr),
            formatStr('palletized_lid', typeStr),
            formatStr('pallet', typeStr),
            formatStr('sep_sheet', typeStr),
            formatStr('mould', typeStr),
            formatStr('hdpe', typeStr),
          ],
    'PP Box':
      insertType === 'Insert' ? [formatStr('std_ast', typeStr)] : [formatStr('std_ast', typeStr)],
    'Palletized PP Box': [
      formatStr('std_ast', typeStr),
      formatStr('palletized_lid', typeStr),
      formatStr('pallet', typeStr),
    ],
    'Plastic Pallet': [formatStr('std_ast', typeStr), formatStr('palletized_lid', typeStr)],
    'Wooden Pallet': [formatStr('std_ast', typeStr), formatStr('palletized_lid', typeStr)],
  };
  return specifications[type];
};

export const getDefaultMonthValue = (type) => {
  switch (type) {
    case 'std_ast':
      return 18;
    case 'crate_lid':
      return 12;
    case 'palletized_lid':
      return 12;
    case 'insert1':
      return 12;
    case 'insert2':
      return 12;
    case 'sep_sheet':
      return 12;
    case 'mould':
      return 18;
    case 'hdpe':
      return 12;
    default:
      return 0;
  }
};
