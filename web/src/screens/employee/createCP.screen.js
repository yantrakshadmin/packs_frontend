import React, { useState, useEffect } from 'react';
import { Popconfirm,  Button, Input, } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { deleteCP, retrieveCP } from 'common/api/auth';
import Delete from 'icons/Delete';
import {
  ADD_CREATE_CP_BASIC_DATA,
  CLEAN_PFEP_DATA,
} from 'common/actions';

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
// pfep:
//   average_dispatchlotsize: 120
// breadth: 127
// contact_no: "9876543210"
// contact_person: "anil"
// cp_approved: true
// cp_shared: false
// critical_area: "No"
// current_packaging: "Returnable"
// date: "2020-11-09T10:34:31.944000Z"
// designation: "sale"
// dispatch_frequency: "once per week"
// email: "anil@lumax.com"
// emitter_inv: 5
// esa_signed: false
// flow_started: true
// greasy_oily: false
// height: 370
// highest_mv: 2000
// id: 10
// inserts_pm: 0
// lead_no: 2007
// length: 256
// lowest_mv: 500
// matrix_details: "3x2"
// max_cycle_days: 22
// min_cycle_days: 20
// min_max_margin: null
// mul_parts_single_pocket: "Y"
// not_qualified: true
// np_ef: "New Part"
// on_hold: false
// other_spec: "NO"
// other_storage: 0
// owner: {id: 2, password: "pbkdf2_sha256$180000$T8KatsrlJbzL$jevLZA8OE4xmSYwpoeLWKkK66riY6JjyiYmu2ADm9S4=", last_login: null, is_superuser: false, username: "yantraksh", …}
// p2p_contact: "Y"
// packaging_breadth: 500
// packaging_height: 450
// packaging_length: 600
// packaging_type: "New Part"
// palletized_sol_details: "5 boxs / pallet"
// part_cad_data: "NA"
// part_name: "Shifter P405"
// part_number: "abc123"
// parts_orientation: "ANY"
// parts_per_layer: 0
// parts_per_pocket: 5
// parts_pm: 0
// pfep_dropped: false
// pfep_no: 2002
// pm_loaded_weight: 30
// pocket_breadth: 120
// pocket_breadth1: 0
// pocket_height: 440
// pocket_height1: 0
// pocket_length: 200
// pocket_length1: 0
// price_per_unit: 0
// receiver_inv: 5
// receivers: (2) [{…}, {…}]
// remarks: null
// remarks1: null
// remarks2: null
// sender_client: "Lumax"
// sender_location: "Manesar"
// solution_crate: false
// solution_flc: true
// solution_fsc: true
// solution_palletized_box: false
// solution_palletized_crate: false
// solution_pp: false
// solution_ppbox: false
// solution_stacking_nesting: false
// solution_wp: false
// special_measure: "NA"
// spesheet_pm: 0
// stacking_nesting: "Stacking 0f 5 parts"
// total_parts_per_pm: 30
// tp: [{…}]
// tp_approved: false
// tp_shared: true
// transit_time: 5
// transportation_mode: "PTL"
// trials_approved: false
// trials_done: false
// trips_per_pm: "box - single, pallet - multiple"
// volume_pm: 1500
// wastage_pm: "box-100%, pallet - reusable"
// weight: 1.5
// wh_emitter: 0
// wh_receiver: 5
// yantra_cycle: 30
// __proto__: Object
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
import { CreateCPColumns } from 'common/columns/createCP.column';
import { useNavigate } from '@reach/router';
import { deleteHOC } from '../../hocs/deleteHoc';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { MainCreateCPForm } from '../../forms/CreateCP/mainCreateCP.form';
import Document from '../../icons/Document';

const { Search } = Input;

const CreateCPScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [selectedCP, setSelectedCP] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { filteredData, loading, reload } = useTableSearch({
    searchVal,
    retrieve: retrieveCP,
  });
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
          {record.pfep.sender_client}
        </div>
      ),
    },{
      title: 'Emitter Location',
      key: 'emitter_location',
      render: (record) => (
        <div>
          {record.pfep.sender_location}
        </div>
      ),
    },
    {
      title: 'Receiver',
      key: 'receiver',
      render: (record) => (
        <div>
          {record.pfep.receivers.length>0?record.pfep.receivers[0].name:''}
        </div>
      ),
    },
    {
      title: 'Receiver Location',
      key: 'receiver_location',
      render: (record) => (
        <div>
          {record.pfep.receivers.length>0?record.pfep.receivers[0].location:''}
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
              navigate(`../print-cp/${record.id}`,{ state:record,receiverDetails:[{
                part_name:record.pfep.part_name,
                receiver_location: record.pfep.receivers.length>0?record.pfep.receivers[0].location:'',

              }] })
              e.stopPropagation();
            }}>
            <Document />
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              dispatch({ type: ADD_CREATE_CP_BASIC_DATA, data: {
                ...record,
                sender_client:record.pfep.sender_client?record.pfep.sender_client:'',
                sender_location:record.pfep.sender_location?record.pfep.sender_location:'',
                receiver: record.pfep.receivers[0]?record.pfep.receivers[0].name:'',
                receiver_location: record.pfep.receivers[0]?record.pfep.receivers[0].location:'',
                component_perkit: record.parts_pm,
                total_comp_weight_perkit: record.weight,
                pfep:record.id,
                solution_crate:record.pfep.solution_crate,
                solution_flc: record.pfep.solution_flc,
                solution_fsc: record.pfep.solution_fsc,
                solution_palletized_box:record.pfep.solution_palletized_box,
                solution_palletized_crate: record.pfep.solution_palletized_crate,
                solution_pp: record.pfep.solution_pp,
                solution_ppbox: record.pfep.solution_ppbox,
                solution_stacking_nesting: record.pfep.solution_stacking_nesting,
                solution_wp: record.pfep.solution_wp,
              } });
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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCP(selectedRows.map(item=>({ sender_client:item.pfep.sender_client })))
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    hideSelectAll:true,
    getCheckboxProps: record => ({
      disabled: selectedCP.length<=0?false:record.pfep.sender_client !== selectedCP[0].sender_client, // Column configuration not to be checked
    }),
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button className='mx-2' type='primary' disabled={selectedCP.length<=0}>Merge CP</Button>
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
        rowSelection={rowSelection}
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
        csvdata={csvData}
        csvname={`CP${searchVal}.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(CreateCPScreen);
