import React, { useState, useEffect } from 'react';
import { Popconfirm, Tag, Button, Input, Modal } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { deleteCP, retrieveCP } from 'common/api/auth';
import Delete from 'icons/Delete';
import { PFEPColumn } from 'common/columns/PFEP.column';
import { utcDateFormatter } from 'common/helpers/dateFomatter';
import {
  ADD_CREATE_CP_DATA,
  CLEAN_PFEP_DATA,
} from 'common/actions';
import { deleteHOC } from '../../hocs/deleteHoc';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { CreateCPColumns } from 'common/columns/createCP.column';
import { MainCreateCPForm } from '../../forms/CreateCP/mainCreateCP.form';

const { Search } = Input;
// agreed_margin: 0
// billing_price: 0
// buffer: 4
// component_perkit: 0
// contigency_margin: 0
// cost: 2000
// crate_lid_dep_cost: 0
// crate_lid_month: 0
// crate_lid_quantity: 0
// crate_lid_quantity_perkit: 0
// crate_lid_rate: 0
// crate_lid_total_cost: 0
// direct_cost: 0
// gross_margins: 2
// hdpe_dep_cost: 0
// hdpe_month: 0
// hdpe_quantity: 0
// hdpe_quantity_perkit: 0
// hdpe_rate: 0
// hdpe_total_cost: 0
// id: 1
// insert1_dep_cost: 0
// insert1_month: 0
// insert1_quantity: 0
// insert1_quantity_perkit: 0
// insert1_rate: 0
// insert1_total_cost: 0
// insert2_dep_cost: 0
// insert2_month: 0
// insert2_quantity: 0
// insert2_quantity_perkit: 0
// insert2_rate: 0
// insert2_total_cost: 0
// kit_based_on_usage_ratio: 4
// kit_pm: 4
// kit_usage_ratio: 4
// labor_cost_perton: 2
// min_cost_for_trip: 0
// min_warehouse: 2
// mould_dep_cost: 0
// mould_month: 0
// mould_quantity: 0
// mould_quantity_perkit: 0
// mould_rate: 0
// mould_total_cost: 0
// other_cost: 2
// pallet_dep_cost: 0
// pallet_month: 0
// pallet_quantity: 0
// pallet_quantity_perkit: 0
// pallet_rate: 0
// pallet_total_cost: 0
// palletized_lid_dep_cost: 0
// palletized_lid_month: 0
// palletized_lid_quantity: 0
// palletized_lid_quantity_perkit: 0
// palletized_lid_rate: 0
// palletized_lid_total_cost: 0
// perating_cost: 0
// pfep: 10
// remarks: null
// repair_reconditioning: 2
// sep_sheet_dep_cost: 0
// sep_sheet_month: 0
// sep_sheet_quantity: 0
// sep_sheet_quantity_perkit: 0
// sep_sheet_rate: 0
// sep_sheet_total_cost: 0
// total_comp_weight_perkit: 1.5
// total_cost: 2
// total_cost_supply_chain: 2
// transportation_c2_w2: 2
// transportation_w1_c1: 2
// transportation_w2_w1: 2
// trip_cost: 0

const CreateCPScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const dispatch = useDispatch();


  const { filteredData, loading, reload } = useTableSearch({
    searchVal,
    retrieve: retrieveCP,
  });
  console.log(filteredData,'ye wla')
  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      filteredData.forEach((d) => {
        delete d.owner;
        csvd.push(d);
      });
      setCsvData(csvd);
    }
  }, [filteredData]);

  const columns = [
    ...CreateCPColumns,
    {
      title: 'Emitter',
      key: 'emitter',
      render: (record) => (
        <div>
          {record.emitter_inv}
          {' - '}
          {
            record.wh_emitter
          }
        </div>
      ),
    },{
      title: 'Emitter Location',
      key: 'emitter_location',
      render: (record) => (
        <div>
          {record.emitter_inv}
        </div>
      ),
    },
    {
      title: 'Receiver',
      key: 'receiver',
      render: (record) => (
        <div>
          {record.receiver_inv}

        </div>
      ),
    },
    {
      title: 'Receiver Location',
      key: 'receiver_location',
      render: (record) => (
        <div>
          {record.receiver_inv}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      render: (text, record) => (
        <div className='row align-center justify-evenly'>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              dispatch({ type: ADD_CREATE_CP_DATA, data: record });
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <Popconfirm
            title='Confirm Delete'
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteCP,
              success: 'Deleted CP Successfully',
              failure: 'Error in deleting CP',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Delete />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'ALL PFEP',
      key: 'allPFEP',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => setEditingId(null);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder='Search' enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size='middle'
        title='CP'
        editingId={editingId}
        cancelEditing={() => {
          cancelEditing();
        }}
        onCancelButton={() => {
          dispatch({ type: CLEAN_PFEP_DATA });
        }}
        hideRightButton
        modalWidth={80}
        modalBody={MainCreateCPForm}
        // expandHandleKey='person'
        // ExpandBody={PersonTable}
        // expandParams={{ loading }}
        // scroll={{ x: 1200 }}
        csvdata={csvData}
        csvname={`PFEP${searchVal}.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(CreateCPScreen);
